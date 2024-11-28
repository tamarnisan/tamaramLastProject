import { useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import GetRequest from "../utilities/getRequest";

function Profile({ currentUser }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [info, setInfo] = useState([]);
    const [error, setError] = useState(null);
    const getInfo = async () => {
        const url = `http://localhost:3000/users/${id}`;

        const response = await GetRequest(url);
        if (response.status === 200) {
            setInfo(response.res);
            console.log("response.res: ", response.res);
        } else {
            setError(response.res.text);
        }
    };

    return (
        <>
            <nav>
                <Link to={`/profile/${id}`}>Posts</Link>
                <Link to={`/profile/${id}/todos`}>Todos</Link>
            </nav>
            <button onClick={getInfo}>About Me</button>
            {info.length > 0 && (
                <>
                    <p>Name: {info[0].name}</p>
                    <p>Email: {info[0].email}</p>
                    <p>Phone: {info[0].phone}</p>
                </>
            )}
            <Outlet />
        </>
    );
}

export default Profile;
