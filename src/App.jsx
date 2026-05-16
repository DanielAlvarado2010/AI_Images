import { useState } from "react";
import Home from "./components/Home";
import Countries from "./components/Countries";
import TakePicture from "./components/TakePicture";
import GenerateAIImage from "./components/GenerateAIImage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
// import router from "./routes/routes";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="select-country" element={<Countries />} />
        <Route path="take-picture" element={<TakePicture />} />
        <Route path="generateAIimage" element={<GenerateAIImage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
