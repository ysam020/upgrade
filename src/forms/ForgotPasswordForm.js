import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { InputOtp } from "primereact/inputotp";
import { Password } from "primereact/password";
import { validationSchema } from "../schemas/auth/updatePasswordSchema";
import CustomButton from "../components/customComponents/CustomButton";
import { AlertContext } from "../contexts/AlertContext";

function ForgotPasswordForm(props) {
  const { setAlert } = useContext(AlertContext);
  useEffect(() => {
    async function sendOtp() {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_STRING}/send-forgot-password-otp`,
          { username: props.username },
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
          message: err.response.data.message,
          severity: "error",
        });
      }
    }

    sendOtp();
    // eslint-disable-next-line
  }, [props.username]);

  const formik = useFormik({
    initialValues: {
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_STRING}/update-password`,
          {
            username: props.username,
            otp: values.otp,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        );

        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
        if (res.data.message === "Password has been successfully reset") {
          props.setForgotPassword(false);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setAlert({
            open: true,
            message: error.response.data.message,
            severity: "error",
          });
        } else {
          setAlert({
            open: true,
            message: "An unexpected error occurred. Please try again later.",
            severity: "error",
          });
        }
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <span style={{ color: "#0060ae", fontWeight: 800, fontSize: "14px" }}>
          Enter OTP
        </span>
        <InputOtp
          placeholder="Enter OTP"
          value={formik.values.otp}
          onChange={(e) => formik.setFieldValue("otp", e.value)} // Handle value directly
          mask
          integerOnly
          length={6}
        />

        {formik.touched.otp && formik.errors.otp && (
          <small className="p-error">{formik.errors.otp}</small>
        )}

        <Password
          toggleMask
          id="password"
          name="password"
          placeholder="New Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          className={
            formik.touched.password && formik.errors.password ? "p-invalid" : ""
          }
          feedback={false}
        />

        {formik.touched.password && formik.errors.password && (
          <small className="p-error">{formik.errors.password}</small>
        )}

        <Password
          toggleMask
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          className={
            formik.touched.confirmPassword && formik.errors.confirmPassword
              ? "p-invalid"
              : ""
          }
          feedback={false}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <small className="p-error">{formik.errors.confirmPassword}</small>
        )}
        <br />
        <CustomButton isSubmitting={formik.isSubmitting} name={"Confirm"} />
      </form>
    </>
  );
}

export default React.memo(ForgotPasswordForm);
