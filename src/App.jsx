import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import FindPage from "./pages/FindPage/FindPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import "./App.scss";
import Search from "./components/Search/Search";

function App() {
    return (
        <div className="App" style={{ backgroundImage: `url('${process.env.REACT_APP_BE_URL}/public/background.jpg')` }}>
            <BrowserRouter>
                <Search />
                <Routes>
                    <Route path="/profile/:riotID" element={<ProfilePage />} />
                    <Route path="*" element={<FindPage />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </div>
    );
}

export default App;
