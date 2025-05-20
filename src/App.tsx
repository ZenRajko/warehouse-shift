import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import "./App.css";

enum Page {
  Title = "TITLE",
  Game = "GAME",
  Win = "WIN"
}

enum Crate {
  Wood = '#',
  Metal = '@'
}

type BoardType = (string | null)[];

const width = 7;
const height = 11;
const initialBoard: BoardType = Array(width * height).fill(null);

function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Title);
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [left, setLeft] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>();

  const selectCrate = (): void => {
    let i = getRandom(0, left - 1);
    setSelected(null);
    for (let j = width * height - 1; j > 0; j--) {
      if (board[j]) {
        if (i === 0) {
          setSelected(j);
          return;
        }
        i--;
      }
    }
  }

  useEffect(() => {
    if (left > 0) selectCrate();
  }, [left]);

  const handleClick = (index: number): void => {
    if (index === selected) {
      board[index] = null;
      if (left === 1)
        setPage(Page.Win);
      else
        setLeft(left => left - 1);
    }
  };

  const restartGame = (): void => {
    initialBoard.fill(null);
    let end = width * height - 1;
    let crates = 0;
    for (let y = 0; y < 7; y++) {
      for (let x = 0; x < width; x++) {
        let tile = null;
        if (y === 0)
          tile = getRandom(1, 3) === 1 ? Crate.Wood : Crate.Metal;
        else {
          const below = initialBoard[end - x + width];
          if (below === Crate.Wood && getRandom(1, 10) < 8)
            tile = Crate.Wood;
          else if (below === Crate.Metal && getRandom(1, 10) < 8)
            tile = getRandom(1, 10) < 7 ? Crate.Metal : Crate.Wood;
        }
        if (tile) {
          initialBoard[end - x] = tile;
          crates++;
        }
      }
      end -= width;
    }
    setBoard([...initialBoard]);
    setLeft(crates);
  }

  return (
    <div className="main">
      {page === Page.Title && (<div className="title-page fade-in"
        onClick={() => {
          restartGame();
          setPage(Page.Game);
        }}>
        <div className="title">Warehouse<br></br>SHIFT</div>
        <div className="by">by<br></br>Damian Rajkowski</div>
        <div className="date">19 May 2025</div>
        <div className="tap-me">Tap anywhere<br></br>to start</div>
      </div>)}
      {page === Page.Win && (<div className="win-page fade-in"
        onClick={() => {
          restartGame();
          setPage(Page.Game);
        }}>
        <div className="title">You've done it!</div>
        <div className="tap-me">Tap anywhere<br></br>to play again</div>
      </div>)}
      {page === Page.Game && (<div className="game-page fade-in">
        <div className="title">Warehouse Shift</div>
        <div className="count">Crates left: {left}</div>
        <div className="board">
          {board.map((cell, index) => (
            <button key={index} onClick={() => handleClick(index)}
              className={`cell ${cell === Crate.Wood ? "wood" : (cell === Crate.Metal ? "metal" : "")} ${index === selected ? "selected": ""}`}
                ><span className="material-icons"
                  >{cell === Crate.Wood ? "border_all" : (cell === Crate.Metal ? "margin" : "")}</span>.
            </button>
          ))}
        </div>
        <div className="footer">
          <button title="Restart" onClick={() => restartGame()}>
            <FontAwesomeIcon icon={faRotate} /></button>
          <button title="GitHub Page" onClick={() => {
            window.open("https://github.com/ZenRajko/warehouse-shift", "_blank");
          }
          }><FontAwesomeIcon icon={faGithub} /></button>
          <button title="Info" onClick={() => {

          }
          }><FontAwesomeIcon icon={faInfoCircle} /></button>
        </div>
      </div>)}
    </div>
  );
};

export default App;