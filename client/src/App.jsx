import { useState } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Profile from "./pages/Profile";
import ProfilePosts from "./components/ProfilePosts";
import ProfileToDos from "./components/ProfileToDos";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null);

    return (
        <>
            <BrowserRouter>
                <Header currentUser={currentUser} setCurrentUser={setCurrentUser} />
                <Routes>
                    <Route path="/login" element={<LogIn currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:id" element={<Profile currentUser={currentUser} />}>
                        <Route index element={<ProfilePosts />} />
                        <Route path="todos" element={<ProfileToDos />} />
                    </Route>
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
