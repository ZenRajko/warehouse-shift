import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useState } from "react";
import { Page, Icon, Crate } from "./enums";
import { getRandom } from "./utils";
import Themes from "./themes";
import { useConfig } from "./config";
import "./App.css";

type BoardType = (string | null)[];

const width = 7;
const height = 11;
const size = width * height;
const end = size - 1;
const bottomRow = end - width;
const initialBoard: BoardType = Array(size).fill(null);

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Title);
  const [board, setBoard] = useState<BoardType>(initialBoard);
  const [left, setLeft] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>();
  const [requested, setRequested] = useState<number | null>();
  const [delivered, setDelivered] = useState<number | null>();
  const config = useConfig();
  const [theme, setTheme] = useState<string | undefined>();

  useEffect(() => {
    //restartGame();
    //setPage(Page.Game);
  }, []);

  useEffect(() => {
    if (config?.themes && config.theme && !theme) {
      setTheme(config.theme);
    }
  }, [config, theme]);

  useEffect(() => {
    const existingLink = document.getElementById("theme-style") as HTMLLinkElement;
    if (existingLink) document.head.removeChild(existingLink);
    if (theme && theme !== "Default") {
      const link = document.createElement("link");
      link.id = "theme-style";
      link.rel = "stylesheet";
      link.href = `/themes/${theme.toLowerCase()}.css`;
      document.head.appendChild(link);
    }
  }, [theme]);

  const nextRequestedCrate = useCallback(() => {
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
  }, [board, left]);

  useEffect(() => {
    if (page === Page.Game) {
      if (left > 0) {
        nextRequestedCrate();
        setDelivered(null);
      } else
        setPage(Page.Win);
    } else
      nextRequestedCrate();
  }, [left, page, nextRequestedCrate]);

  useEffect(() => {
    if (page === Page.Game && delivered) {
      setTimeout(() => {
        board[delivered] = null;
        setLeft(left => left - 1);
      }, 50);
    }
  }, [delivered, page, board]);

  const handleClick = (index: number): void => {
    const topCell = board[index] && ((index >= width && board[index - width] === null) || index < width);

    if (selected && index === selected) {
      setSelected(null);
      return;
    }

    if (topCell && index === requested) {
      setSelected(null);
      setDelivered(index);
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
    setSelected(null);
    setDelivered(null);
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
    <div className={`content ${page !== Page.Game ? "pointer" : ""}`}
      onClick={() => {
        if (page === Page.Title) {
          restartGame();
          setPage(Page.Intro);
        } else if (page === Page.Intro || page === Page.Info) {
          setPage(Page.Game);
        } else if (page === Page.Win || page === Page.Lose) {
          restartGame();
          setPage(Page.Game);
        }
      }}
    >

      <div className="background"></div>

      {page === Page.Title && (<div className="title-page fade-in">
        <div className="title">Warehouse<br></br>SHIFT</div>
        <div className="title-overlay">Warehouse<br></br>SHIFT</div>
        <div className="by">by</div>
        <div className="name">Damian Rajkowski</div>
        <div className="date">19 May 2025</div>
        <div className="tap-me">Tap anywhere<br></br>to start</div>
        <div className="theme-title">Or, choose a theme first:</div>
        <Themes onThemeChange={setTheme} />
      </div>)}

      {(page === Page.Intro || page === Page.Info) &&
        (<div className="title-page fade-in">
          <div className="title">Warehouse<br></br>SHIFT</div>
          <div className="instructions-title">Instructions</div>
          <div className="instructions">
            <p>
              You work in a warehouse.<br></br>
              Customers want their &nbsp;<p className="requested">crates</p>&nbsp;!<br></br>
              Move top crates from stack to stack<br></br>
              to reach customer crate!
            </p>
            <div className="instructions-metal">
              <span className="material-icons">{Icon.Metal}</span>
              <p>Metal crates can't be stacked on wooden crates.</p>
            </div>
            <div className="instructions-wood">
              <span className="material-icons">{Icon.Wood}</span>
              <p>Wooden crates can only stack three high.</p>
            </div>
          </div>
          <div className="tap-me">Tap anywhere<br></br>to {page === Page.Intro ? "Start" : "Return"}</div>
          <div className="theme-title">Or, change the theme:</div>
          <Themes onThemeChange={setTheme} />
        </div>)}

      {page === Page.Win && (<div className="win-page fade-in">
        <div className="title title-win">Well done!</div>
        <div className="instructions-win"><br></br>
          You delivered all the crates.<br></br><br></br>
          Go home, grab a beer<br></br>and call it a day,<br></br>
        </div>
        <div className="or-win">or..</div>
        <div className="tap-me">Tap anywhere for<br></br>another shift</div>
      </div>)}

      {page === Page.Lose && (<div className="win-page fade-in">
        <div className="title title-lose">You Failed!</div>
        <div className="instructions-lose"><br></br>
          You damaged the stock.<br></br><br></br>
          Get out of here and<br></br>look for a new job<br></br>
        </div>
        <div className="or-lose">or..</div>
        <div className="tap-me">Tap anywhere to<br></br>try another shift</div>
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
                ${!selected && board[index] && ((index >= width && board[index - width] === null) || index < width) ? "top" : ""}
                ${cell === Crate.Wood ? "wood" : (cell === Crate.Metal ? "metal" : "")}
                ${index === selected && !delivered ? "selected" : ""}
                ${index === requested ? "requested" : ""}
                ${index === delivered ? "spin-out" : ""}
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

        <div className="footer">
          <button title="Restart" onClick={() => restartGame()}>
            <FontAwesomeIcon icon={faRotate} className="social-icon" /></button>
          <button title="GitHub Page" onClick={() => {
            window.open("https://github.com/ZenRajko/warehouse-shift", "_blank");
          }
          }><FontAwesomeIcon icon={faGithub} className="social-icon" /></button>
          <button title="Info" onClick={() => {
            setPage(Page.Info);
          }
          }><FontAwesomeIcon icon={faInfoCircle} className="social-icon" /></button>
        </div>
      </div>)}

    </div>
  );
};

export default App;