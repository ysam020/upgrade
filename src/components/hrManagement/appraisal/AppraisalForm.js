import React, { useContext } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Rating from "@mui/material/Rating";
import CustomButton from "../../customComponents/CustomButton";
import CustomTextField from "../../customComponents/CustomTextField";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { validationSchema } from "../../../schemas/hrManagement/appraisalSchema";
import useUserList from "../../../hooks/useUserList";
import { AlertContext } from "../../../contexts/AlertContext";

function AppraisalForm() {
  const userList = useUserList();
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      appraisalDate: "",
      performanceScore: null,
      strengths: "",
      areasOfImprovement: "",
      feedback: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_STRING}/add-appraisal`,
          values,
          {
            withCredentials: true,
          }
        );

        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } catch (err) {
        setAlert({
          open: true,
          message: err.response.data.message,
          severity: "error",
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        value={formik.values.username}
        onChange={(event, newValue) => {
          formik.setFieldValue("username", newValue); // Update Formik state
        }}
        options={userList}
        getOptionLabel={(option) => option || ""}
        sx={{ marginBottom: "10px" }}
        renderInput={(params) => (
          <TextField
            {...params}
            className="login-input"
            fullWidth
            variant="filled"
            size="small"
            label="Select User"
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
        )}
      />
      <CustomTextField
        id="appraisalDate"
        name="appraisalDate"
        label="Appraisal Date"
        type="date"
        formik={formik}
      />
      <br />
      <br />
      Performance Score
      <br />
      <Rating
        name="performanceScore"
        value={formik.values.performanceScore}
        onChange={(event, newValue) => {
          formik.setFieldValue("performanceScore", newValue);
        }}
      />
      {formik.touched.performanceScore && formik.errors.performanceScore && (
        <div style={{ color: "#d32f2f" }}>{formik.errors.performanceScore}</div>
      )}
      <CustomTextField
        id="strengths"
        name="strengths"
        label="Strengths"
        multiline
        rows={3}
        formik={formik}
        useSpeech={true}
      />
      <CustomTextField
        id="areasOfImprovement"
        name="areasOfImprovement"
        label="Areas of Improvement"
        multiline
        rows={3}
        formik={formik}
        useSpeech={true}
      />
      <CustomTextField
        id="feedback"
        name="feedback"
        label="Feedback"
        multiline
        rows={3}
        formik={formik}
        useSpeech={true}
      />
      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(AppraisalForm);
