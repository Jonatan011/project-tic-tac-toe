import "./App.css";
import Player from "./Components/Player/Player";
import "./Components/Player/Player.css"

function App() {
  return (
    <>
     <main>
        <div id="game-container">
          <ol id="playersContainer">
            <Player initialName="Sergio" playerSymbol="X"></Player>        
            <Player initialName="Patricia" playerSymbol="O"></Player>                
          </ol>
        </div>
      </main>
    </>
  );
}

export default App;
