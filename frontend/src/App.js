import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchCardPage from "./pages/SearchCardsPage";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-card" element={<SearchCardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;