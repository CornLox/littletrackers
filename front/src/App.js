import { BrowserRouter, Routes, Route } from "react-router-dom";
// pages and components
import ScrollToHash from "./components/parts/ScrollToHash";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import What from "./pages/What";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToHash />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/what" element={<What />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;