

import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import GetRequest from "../utilities/getRequest";

function ProfileToDos() {
    const { id } = useParams();
    const [todosarray, setTodosarray] = useState([]);
    const [error, setError] = useState(null);
    const getTodos = async (e) => {
        const url = `http://localhost:3000/users/${id}/todos`;
        const response = await GetRequest(url);
        if (response.status === 200) {
            setTodosarray(response.res);
        }
        console.log(todosarray)
    };
    
    useEffect(() => {
        getTodos();
    }, []);
    
    return "I am Profile ToDos";
}
export default ProfileToDos;