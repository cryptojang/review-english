import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import Day from "./pages/day";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:day" element={<Day />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
