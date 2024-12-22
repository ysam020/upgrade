import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import { validationSchema } from "../../../schemas/hrManagement/attendanceAndLeaves/weekOffSchema";
import ViewOwnWeekOffs from "./ViewOwnWeekOffs";
import { AlertContext } from "../../../contexts/AlertContext";

function WeekOffForm() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });
  const { setAlert } = useContext(AlertContext);

  async function getWeekOffs() {
    try {
      const [month, year] = date.split("-");
      const res = await axios.get(
        `${process.env.REACT_APP_API_STRING}/get-own-week-offs/${year}-${month}`,
        { withCredentials: true }
      );

      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      date: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(
          `${process.env.REACT_APP_API_STRING}/add-week-off`,
          values,
          { withCredentials: true }
        );
        getWeekOffs();
      } catch (error) {
        setAlert({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        id="date"
        name="date"
        label="Date"
        type="date"
        formik={formik}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
      <br />
      <br />
      <h4>My Week Offs</h4>
      <ViewOwnWeekOffs
        getWeekOffs={getWeekOffs}
        date={date}
        setDate={setDate}
        data={data}
      />
    </form>
  );
}

export default React.memo(WeekOffForm);
