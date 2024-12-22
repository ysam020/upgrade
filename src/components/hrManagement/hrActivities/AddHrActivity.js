import React, { useContext } from "react";
import { useFormik } from "formik";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import { validationSchema } from "../../../schemas/hrManagement/hrActivitiesSchema";
import axios from "axios";
import { AlertContext } from "../../../contexts/AlertContext";

function AddHrActivity() {
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      date: "",
      time: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_STRING}/add-hr-activity`,
          values,
          { withCredentials: true }
        );
        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } catch (err) {
        setAlert({
          open: true,
          message: err.response?.data?.message || "An error occurred",
          severity: "error",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex-div">
        <CustomTextField
          id="title"
          name="title"
          label="Title"
          type="text"
          formik={formik}
          useSpeech={true}
        />
      </div>

      <CustomTextField
        id="description"
        name="description"
        label="Description"
        type="text"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="date"
        name="date"
        label="Date"
        type="date"
        formik={formik}
      />

      <CustomTextField
        id="time"
        name="time"
        label="Time"
        type="time"
        formik={formik}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(AddHrActivity);
