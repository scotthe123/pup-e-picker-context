import React from "react";
import "./App.css";
import { PupEPicker } from "./Components/PupEPicker";
import "./fonts/RubikBubbles-Regular.ttf";
import { DogListProvider } from "./providers/DogListProvider";

function App() {
  return (
    <div className="App">
      <DogListProvider>
        <PupEPicker />
      </DogListProvider>
    </div>
  );
}

export default App;
