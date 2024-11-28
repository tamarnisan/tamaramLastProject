import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";

function Profile() {
    const { id } = useParams();
    const [user, setUser] = useState(getUser());
    async function getUser() {
        const res = await fetch(`http://localhost:3000/users/${id}`);
        const data = await res.json();
        console.log("data[0]: ", data[0]);
        return data[0];
    }
    console.log(user);
    return (
        <>
            <p>{user && `${user}`}</p>
            <Outlet />
        </>
    );
}

export default Profile;
