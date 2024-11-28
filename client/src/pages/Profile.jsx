import { Outlet } from "react-router-dom";

function Profile() {
  return (
    <>
      <p>Profile Page</p>
      <Outlet />
    </>
  );
}

export default Profile;
