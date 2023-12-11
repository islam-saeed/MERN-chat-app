import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import { useContext } from "react";
import { userContext } from "./context/UserContext";

function App() {
  const [user, setUser] = useContext(userContext)
  return (
    <div className="App bg-[#222] text-white h-[100vh] w-[100%]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user.data.token ? <Chat /> : <Auth />} />
            <Route path="/auth/" element={<Auth />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
