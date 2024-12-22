import "./GameOver.css";

interface GameOverProps {
  onChangedRestarGame: () => void;
  title: string;
}

function GameOver({ onChangedRestarGame, title }: GameOverProps) {
  return (
    <div id="gameOver">
      <p>
        <button onClick={onChangedRestarGame}> -- !{title}! -- </button>
      </p>
    </div>
  );
}

export default GameOver;
