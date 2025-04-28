import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import SuccessPage from "./pages/SuccessPage";
import GameLobby from "./pages/GameLobby";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/lobby" element={<GameLobby />} />
      </Routes>
    </Router>
  );
}

export default App;
