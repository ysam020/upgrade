import React, { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { UserContext } from "../contexts/UserContext";
import { validationSchema } from "../schemas/auth/loginSchema";
import { InputOtp } from "primereact/inputotp";
import { Password } from "primereact/password";
import { getGeolocation } from "../utils/auth/getGeolocation";
import CustomButton from "../components/customComponents/CustomButton";
import { AlertContext } from "../contexts/AlertContext";

function LoginForm(props) {
  const { setUser } = useContext(UserContext);
  const [useBackupCode, setUseBackupCode] = useState(false);
  const passwordRef = useRef(null);
  const { setAlert } = useContext(AlertContext);

  const formik = useFormik({
    initialValues: {
      username: props.username,
      password: "",
      twoFAToken: "",
      backupCode: "",
    },
    validationSchema: validationSchema(props.isTwoFactorEnabled, useBackupCode),
    onSubmit: async (values) => {
      const geoLocation = await getGeolocation(setAlert);
      if (!geoLocation) {
        return;
      }

      try {
        const loginRes = await axios.post(
          `${process.env.REACT_APP_API_STRING}/login`,
          {
            username: values.username,
            password: values.password,
            twoFAToken: useBackupCode ? "" : values.twoFAToken,
            backupCode: useBackupCode ? values.backupCode : "",
            userAgent: navigator.userAgent,
            geolocation: geoLocation,
            isTwoFactorEnabled: props.isTwoFactorEnabled,
            useBackupCode: useBackupCode,
          },
          {
            withCredentials: true,
          }
        );

        if (loginRes.data.message === "Login successful") {
          setUser(loginRes.data.user);
        } else {
          setAlert({
            open: true,
            message: loginRes.data.message,
            severity: "error",
          });
          formik.setFieldValue("twoFAToken", "");
          formik.setFieldValue("backupCode", "");
        }
      } catch (error) {
        setAlert({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    },
  });

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  return (
    <>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        {!useBackupCode && (
          <>
            <Password
              ref={passwordRef}
              toggleMask
              id="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              feedback={false}
              className={
                formik.touched.password && formik.errors.password
                  ? "p-invalid"
                  : ""
              }
            />
            {formik.touched.password && formik.errors.password && (
              <small className="p-error">{formik.errors.password}</small>
            )}
          </>
        )}

        {props.isTwoFactorEnabled && (
          <div>
            {!useBackupCode ? (
              <span>Enter Google Authenticator token</span>
            ) : (
              <span>Enter Backup Code</span>
            )}
            {!useBackupCode && (
              <>
                <InputOtp
                  placeholder="Enter 6-digit code"
                  value={formik.values.twoFAToken}
                  onChange={(e) => formik.setFieldValue("twoFAToken", e.value)}
                  mask
                  integerOnly
                  length={6}
                />
                {formik.touched.twoFAToken && formik.errors.twoFAToken && (
                  <small className="p-error">{formik.errors.twoFAToken}</small>
                )}
              </>
            )}

            {useBackupCode && (
              <>
                <InputOtp
                  placeholder="Enter Backup Code"
                  value={formik.values.backupCode}
                  onChange={(e) => formik.setFieldValue("backupCode", e.value)}
                  mask
                  length={8}
                />
                {formik.touched.backupCode && formik.errors.backupCode && (
                  <small className="p-error">{formik.errors.backupCode}</small>
                )}
              </>
            )}

            <span
              onClick={() => setUseBackupCode(!useBackupCode)}
              style={{
                cursor: "pointer",
                color: "#0060ae",
                fontWeight: "bold",
                marginTop: "16px",
              }}
            >
              {useBackupCode ? "Use Google Authenticator" : "Use Backup Code"}
            </span>
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <CustomButton isSubmitting={formik.isSubmitting} name={"Login"} />
        </div>
      </form>
    </>
  );
}

export default React.memo(LoginForm);
