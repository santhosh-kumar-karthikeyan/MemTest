import { Board } from "./components";
import { idToEmoji } from "./utilities";

// function generateIndices(): [number, number] {

//   return [-1, -1];
// }

export default function App() {
  return (
    <>
      <Board cards={idToEmoji } />
    </>
  );
}
