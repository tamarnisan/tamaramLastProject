

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import GetRequest from "../utilities/getRequest";
import ToDo from "./ToDo";

function ProfileToDos() {
    const { id } = useParams();
    const [todosarray, setTodosarray] = useState([]);
    const [error, setError] = useState(null);
    const getTodos = async (e) => {
        const url = `http://localhost:3000/users/${id}/todos`;
        const response = await GetRequest(url);
        console.log('response: ', response);
        if (response.status === 200) {
            setTodosarray(response.res);
            console.log("hiiu")
        }
    }
    
    useEffect(() => {
        getTodos();
    }, []);

    return todosarray && todosarray.map(todo => <ToDo todo={todo} />)
}

export default ProfileToDos;