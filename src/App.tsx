import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import Default from "./pages/default";
import { Paper } from "./pages/paper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invitation/:slug" element={<Default />} />
        <Route path="/paper/:slug" element={<Paper />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
