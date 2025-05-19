import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInfoCircle, faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./App.css";

enum Page {
  Title = "TITLE",
  Game = "GAME"
}

type BoardType = (string | null)[];

const width = 7;
const height = 11;
const initialBoard: BoardType = Array(width * height).fill(null);

const App: React.FC = () => {
  const [page, setPage] = useState<Page>(Page.Title);
  const [board, setBoard] = useState<BoardType>(initialBoard);

  const handleClick = (index: number) => {
  };

  const restartGame = () => {
    setBoard(initialBoard);
  }

  return (
    <div className="main">
      {page === Page.Title && (<div className="title-page fade-in"
        onClick={() => setPage(Page.Game)}>
        <div className="title">Warehouse<br></br>SHIFT</div>
        <div className="by">by<br></br>Damian Rajkowski</div>
        <div className="date">19 May 2025</div>
        <div className="tap-me">Tap anywhere<br></br>to start</div>
      </div>)}
      {page === Page.Game && (<div className="game-page fade-in">
        <div className="title">Warehouse Shift</div>
        <div className="board">
          {board.map((cell, index) => (
            <button key={index} onClick={() => handleClick(index)}
              className="cell">
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