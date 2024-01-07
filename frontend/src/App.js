import Auth from "./pages/Auth";
import Chat from "./pages/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import { useContext } from "react";
import { userContext } from "./context/UserContext";
import { useCookies } from "react-cookie";

function App() {
  const [cookies] = useCookies(["user"]);
  const [user, setUser] = useContext(userContext)
  console.log('cookies', cookies.user)
  if(cookies.user){
    setUser(cookies.user);
    console.log('user', user)
  }
  return (
    <div className="App bg-[#222] text-white h-[100vh] w-[100%]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={user.token ? <Chat /> : <Auth />} />
            <Route path="/auth/" element={<Auth />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
