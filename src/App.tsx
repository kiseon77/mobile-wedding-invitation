import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NotFound from "./components/NotFound";
import Default from "./pages/default";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/invitation/:slug" element={<Default />} />
        <Route path="*" element={<NotFound />} />
        <Route path="*" element={<Default />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
