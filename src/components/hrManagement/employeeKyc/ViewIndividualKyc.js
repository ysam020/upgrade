import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BasicInfo from "../../profile/BasicInfo";
import { AlertContext } from "../../../contexts/AlertContext";

function ViewIndividualKyc() {
  const { username } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    async function getUser() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/get-user-data/${username}`,
          {
            withCredentials: true,
          }
        );

        setData(res.data);
      } catch (error) {
        console.error("Error occurred while fetching user data:", error);
      }
    }

    getUser();
  }, [username]);

  const handleKycApproval = async (status) => {
    const kyc_approval = status === true ? "Approved" : "Rejected";

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_STRING}/kyc-approval`,
        { username, kyc_approval },
        {
          withCredentials: true,
        }
      );
      setAlert({
        open: true,
        message: res.data.message,
        severity: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.response.data.message,
        severity: "error",
      });
    }
  };

  return (
    <>
      {data && (
        <div style={{ padding: 20, backgroundColor: "#fff" }}>
          <BasicInfo user={data} />
          <br />
          <button className="btn" onClick={() => handleKycApproval(true)}>
            Approve
          </button>
          <button
            className="btn"
            style={{ marginLeft: "10px" }}
            onClick={() => handleKycApproval(false)}
          >
            Reject
          </button>
          <button
            className="btn"
            style={{ marginLeft: "10px" }}
            onClick={() => navigate(`/edit-kyc/${data.username}`)}
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
}

export default React.memo(ViewIndividualKyc);
