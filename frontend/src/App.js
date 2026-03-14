import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SearchCardPage from "./pages/SearchCardsPage";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "20px", display: "flex", gap: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/search-card">Search card</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-card" element={<SearchCardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;