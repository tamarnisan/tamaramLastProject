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
            <h1>Social:</h1>
            <div>{currentUser && <button onClick={() => navigate(`/profile/${currentUser.id}`)}>Hello 123</button>}</div>
            {!currentUser && <button onClick={() => navigate("/login")}>Log in!</button>}
            {currentUser && <button onClick={logOut}>Log out</button>}
        </div>
    );
}

export default Header;
