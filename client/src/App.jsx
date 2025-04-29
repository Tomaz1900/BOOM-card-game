import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import SuccessPage from "./pages/SuccessPage";
import GameLobby from "./pages/GameLobby";
import WaitingRoom from "./pages/WaitingRoom";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/lobby" element={<GameLobby />} />
        <Route path="/waiting" element={<WaitingRoom />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
