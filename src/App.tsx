import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./App.css";

enum Page {
  Title = "TITLE",
  Intro = "INTRO",
  Info = "INFO",
  Game = "GAME",
  Win = "WIN",
  Lose = "LOSE"
}

enum Crate {
  Wood = '#',
  Metal = '@'
}

enum Icon {
  Wood = "border_all",
  Metal = "margin",
  Target = "indeterminate_question_box"
}

type BoardType = (string | null)[];

const width = 7;
const height = 11;
const size = width * height;
const end = size - 1;
const bottomRow = end - width;
const initialBoard: BoardType = Array(size).fill(null);

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Title);
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [left, setLeft] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>();
  const [requested, setRequested] = useState<number | null>();

  const nextRequestedCrate = (): void => {
    let i = getRandom(0, left - 1);
    setRequested(null);
    for (let j = end; j > 0; j--) {
      if (board[j]) {
        if (i === 0) {
          if (j > width && j < bottomRow && board[j - width] === null) j += width;
          setRequested(j);
          return;
        }
        i--;
      }
    }
  }

  useEffect(() => {
    if (left > 0) nextRequestedCrate();
  }, [left]);

  const handleClick = (index: number): void => {
    const topCell = index > width && board[index] && board[index - width] === null

    if (selected && index === selected) {
      setSelected(null);
      return;
    }

    if (topCell && index === requested) {
      setSelected(null);
      board[index] = null;
      if (left === 1)
        setPage(Page.Win);
      else {
        setLeft(left => left - 1);
        const e = document.getElementsByClassName("caption")[0] as HTMLElement
        e.style.opacity = "1";
      }
      return;
    }

    if (topCell) {
      setSelected(index);
      return;
    }

    const _selected = selected;
    setSelected(null);

    if (_selected && board[index] === null &&
      (index >= bottomRow ||
        (index < bottomRow && board[index + width] !== null)
      )
    ) {
      if (index < bottomRow && board[_selected] === Crate.Metal && board[index + width] === Crate.Wood) {
        setPage(Page.Lose);
        return;
      }
      if (index < bottomRow - width * 2
        && board[index + width] === Crate.Wood
        && board[index + width * 2] === Crate.Wood
        && board[index + width * 3] === Crate.Wood) {
        setPage(Page.Lose);
        return;
      }
      board[index] = board[selected];
      board[_selected] = null
    }
  };

  const restartGame = (): void => {
    initialBoard.fill(null);
    let i = end;
    let crates = 0;
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < width; x++) {
        let tile = null;
        if (y === 0)
          tile = getRandom(1, 3) === 1 ? Crate.Wood : Crate.Metal;
        else {
          const below = initialBoard[i - x + width];
          if (below === Crate.Wood && getRandom(1, 10) < 8)
            tile = Crate.Wood;
          else if (below === Crate.Metal && getRandom(1, 10) < 10)
            tile = getRandom(1, 10) < 8 ? Crate.Metal : Crate.Wood;
        }
        if (tile) {
          initialBoard[i - x] = tile;
          crates++;
        }
      }
      i -= width;
    }
    for (let x = 0; x < width; x++) {
      let y = x;
      while (y <= end && initialBoard[y] === null) {
        y += width;
      }
      if (y > end) continue;
      if (initialBoard[y] === Crate.Metal) continue;
      let check = 0;
      while (y <= end) {
        if (initialBoard[y] === Crate.Wood && check < 3)
          check++;
        else
          initialBoard[y] = Crate.Metal;
        y += width;
      }
    }
    setBoard([...initialBoard]);
    setLeft(crates);
  }

  return (
    <div className="main">

      {page === Page.Title && (<div className="title-page fade-in"
        onClick={() => {
          restartGame();
          setPage(Page.Intro);
        }}>
        <div className="title">Warehouse<br></br>SHIFT</div>
        <div className="by">by<br></br>Damian Rajkowski</div>
        <div className="date">19 May 2025</div>
        <div className="tap-me">Tap anywhere<br></br>to start</div>
      </div>)}

      {(page === Page.Intro || page === Page.Info) &&
        (<div className="title-page fade-in"
          onClick={() => {
            setPage(Page.Game);
          }}>
          <div className="title">Warehouse<br></br>SHIFT</div>
          <div className="by">Instructions</div>
          <div className="date">You run a warehouse, stacked with crates.<br></br>
            Customers come in, demanding their crates.<br></br>
            These are highlighted in red.<br></br>
            You have to reach the highlighted crate by moving the crates<br></br>
            on top of it to other stacks.<br></br>
            <br></br>
            Metal crates can only be stacked on metal crates,<br></br>
            cause they're heavy.<br></br>
            Wooden crates can be stacked anywhere.
            <br></br>
            Your job is to get rid of all the crates.
          </div>
          <div className="tap-me">Tap anywhere<br></br>to {page === Page.Intro ? "Start" : "Return"}</div>
        </div>)}

      {page === Page.Win && (<div className="win-page fade-in"
        onClick={() => {
          restartGame();
          setPage(Page.Game);
        }}>
        <div className="title">Well done!</div>
        <div className="by">You've delivered all the crates and<br></br>
          another work day is over.<br></br>
          <br></br>
          Go home, rest up.<br></br>
          Tomorrow is another day.
        </div>
        <div className="date"></div>
        <div className="tap-me">Tap anywhere to<br></br>do another shift</div>
      </div>)}

      {page === Page.Lose && (<div className="win-page fade-in"
        onClick={() => {
          restartGame();
          setPage(Page.Game);
        }}>
        <div className="title">You're Failed</div>
        <div className="by">You've damaged one or more crates.</div>
        <div className="date"></div>
        <div className="tap-me">Tap anywhere to<br></br>do another shift</div>
      </div>)}

      {page === Page.Game && (<div className="game-page fade-in">
        <div className="title">Warehouse Shift</div>
        <div className="count">Crates left: {left}</div>
        <div className="board">
          {board.map((cell, index) => (
            <button key={index} onClick={() => handleClick(index)}
              className={`cell cell-${index}-
                ${selected && board[index] === null && index !== selected - width &&
                    (index >= bottomRow ||
                      (index < bottomRow && board[index + width] !== null)
                    ) ? "target" : ""
                }
                ${!selected && index > width && board[index] && board[index - width] === null ? "top" : ""}
                ${cell === Crate.Wood ? "wood" : (cell === Crate.Metal ? "metal" : "")}
                ${index === selected ? "selected" : ""}
                ${index === requested ? "requested" : ""}
              `}
            ><span className="material-icons">
              {cell === Crate.Wood ? Icon.Wood :
                (cell === Crate.Metal ? Icon.Metal :
                  (selected && board[index] === null && index !== selected - width &&
                    (index >= bottomRow ||
                      (index < bottomRow && board[index + width] !== null)
                    )
                  ) ? Icon.Metal : ""
                )
              }</span>
            </button>
          ))}
        </div>

        <div className="caption">Delivered</div>

        <div className="footer">
          <button title="Restart" onClick={() => restartGame()}>
            <FontAwesomeIcon icon={faRotate} /></button>
          <button title="GitHub Page" onClick={() => {
            window.open("https://github.com/ZenRajko/warehouse-shift", "_blank");
          }
          }><FontAwesomeIcon icon={faGithub} /></button>
          <button title="Info" onClick={() => {
            setPage(Page.Info);
          }
          }><FontAwesomeIcon icon={faInfoCircle} /></button>
        </div>
      </div>)}

    </div>
  );
};

export default App;