import React, { useContext } from "react";
import { useFormik } from "formik";
import CustomTextField from "../../customComponents/CustomTextField";
import CustomButton from "../../customComponents/CustomButton";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import useUserList from "../../../hooks/useUserList";
import axios from "axios";
import { AlertContext } from "../../../contexts/AlertContext";

function WarningMemoForm() {
  const userList = useUserList();
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      subject: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_STRING}/add-warning-memo`,
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
        id="subject"
        name="subject"
        label="Subject"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="description"
        name="description"
        label="Description"
        multiline
        rows={4}
        formik={formik}
        useSpeech={true}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(WarningMemoForm);
