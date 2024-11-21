import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Quiz from "./components/Quiz";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
