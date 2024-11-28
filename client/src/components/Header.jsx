import { useNavigate } from "react-router-dom";
import "../stylesheets/Header.css";

function Header({ currentUser, setCurrentUser }) {
    const navigate = useNavigate();

    function logOut() {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    }

    return (
        <div className="header">
            <h1>Header:</h1>
            <p>{currentUser && `Hello ${currentUser.username}`}</p>
            {!currentUser && <button onClick={() => navigate("/login")}>Log in!</button>}
            {currentUser && <button onClick={logOut}>Log out</button>}
        </div>
    );
}

export default Header;
