import React from "react";
import { useParams } from "react-router-dom";
import CompleteKYC from "./CompleteKYC";

function EditEmployeeKyc() {
  const { username } = useParams();

  return <CompleteKYC username={username} />;
}

export default React.memo(EditEmployeeKyc);
