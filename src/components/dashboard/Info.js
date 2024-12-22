import React from "react";
import { useNavigate } from "react-router-dom";

function Info(props) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/profile")}
      style={{ cursor: "pointer" }}
      id="dashboard-personal"
      className="dashboard-container"
    >
      <p>Welcome back,</p>
      <br />
      <h1>{props.user.fullName}</h1>
    </div>
  );
}

export default React.memo(Info);
