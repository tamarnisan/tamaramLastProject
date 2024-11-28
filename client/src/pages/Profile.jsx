import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import GetRequest from "../utilities/getRequest";

function Profile() {
  
   const { id } = useParams();
    const [info, setInfo] = useState([]);
    const [error, setError]=useState(null)
    const getInfo= async()=>{
      const url=`http://localhost:3000/users/${id}`;

     const response = await GetRequest(url);
     if(response.status===200)
     {
      setInfo(response.res)
      console.log('response.res: ', response.res);
     }
     else{
      setError(response.res.text)
     }
    }

    return (
        <>
          <button onClick={getInfo}>Show more info</button>
          {info.length>0&&<>
          <p>name: {info[0].name}</p>
          <p>email: {info[0].email}</p>
          <p>phone: {info[0].phone}</p></>}
            <Outlet />
        </>
    );
}

export default Profile;
