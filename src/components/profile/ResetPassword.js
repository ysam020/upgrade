import React, { useContext } from "react";
import { useFormik } from "formik";
import { TextField } from "@mui/material";
import { validationSchema } from "../../schemas/auth/resetPasswordSchema";
import axios from "axios";
import CustomButton from "../../components/customComponents/CustomButton";
import { AlertContext } from "../../contexts/AlertContext";

function ResetPassword() {
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_STRING}/reset-password`,
          values,
          { withCredentials: true }
        );

        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        resetForm();
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
    <form
      onSubmit={formik.handleSubmit}
      style={{ backgroundColor: "#fff", padding: "20px" }}
    >
      <TextField
        size="small"
        type="password"
        fullWidth
        margin="dense"
        variant="filled"
        id="password"
        name="password"
        label="Current password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <TextField
        size="small"
        type="password"
        fullWidth
        margin="dense"
        variant="filled"
        id="new_password"
        name="new_password"
        label="New password"
        value={formik.values.new_password}
        onChange={formik.handleChange}
        error={
          formik.touched.new_password && Boolean(formik.errors.new_password)
        }
        helperText={formik.touched.new_password && formik.errors.new_password}
      />

      <TextField
        size="small"
        type="password"
        fullWidth
        margin="dense"
        variant="filled"
        id="confirm_password"
        name="confirm_password"
        label="Confirm password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        error={
          formik.touched.confirm_password &&
          Boolean(formik.errors.confirm_password)
        }
        helperText={
          formik.touched.confirm_password && formik.errors.confirm_password
        }
      />
      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(ResetPassword);
