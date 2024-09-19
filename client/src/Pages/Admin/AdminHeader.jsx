import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Context/UserContext";
const AdminHeader = () => {

  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div>AdminHeader</div>
        <Link
          to="/login"
          onClick={() => {
            setUser(null);
            localStorage.removeItem("user");
            navigate("/login");
          }}
        >
          Logout
        </Link>
      </div>
    </>
  );
};

export default AdminHeader;
