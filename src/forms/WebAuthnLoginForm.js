import React, { useContext, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { UserContext } from "../contexts/UserContext";
import { checkCredentials } from "../utils/webAuthn/checkCredentials";
import { getLoginOptions } from "../utils/webAuthn/getLoginOptions";
import { formatLoginOptions } from "../utils/webAuthn/formatLoginOptions";
import { getCredential } from "../utils/webAuthn/getCredential";
import { serializeCredential } from "../utils/webAuthn/serializeCredential";
import { verifyCredential } from "../utils/webAuthn/verifyCredential";
import { login } from "../utils/webAuthn/login";
import CustomButton from "../components/customComponents/CustomButton";
import { useFormik } from "formik";
import { validationSchema } from "../schemas/auth/webAuthnLoginSchema";
import { AlertContext } from "../contexts/AlertContext";

function WebAuthnLoginForm(props) {
  const { setUser } = useContext(UserContext);
  const usernameRef = useRef(null);
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    // Focus on the username input when the component mounts
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: props.username,
    },
    validationSchema,
    onSubmit: async (values) => {
      props.setUsername(values.username);

      let credentialRes;

      try {
        credentialRes = await checkCredentials(values.username);

        if (!credentialRes) {
          setAlert({
            open: true,
            message: "User not found",
            severity: "error",
          });
          return;
        }

        if (!credentialRes.hasCredentials) {
          props.setUseWebAuthn(false);
          props.setIsTwoFactorEnabled(credentialRes.isTwoFactorEnabled);
          return;
        }

        const loginOptions = await getLoginOptions(values.username);
        if (!loginOptions) {
          props.setUseWebAuthn(false);
          return;
        }

        const formattedOptions = formatLoginOptions(loginOptions);

        const credential = await getCredential(formattedOptions);
        const serializedCredential = serializeCredential(credential);

        const isVerified = await verifyCredential(
          values.username,
          serializedCredential
        );
        if (isVerified) {
          await login(values.username, serializedCredential, setUser, setAlert);
        } else {
          props.setUseWebAuthn(false);
        }
      } catch (err) {
        console.error(err);
        if (err.name === "NotAllowedError") {
          console.log("User canceled the WebAuthn prompt.");
        } else {
          console.error(err);
        }

        if (credentialRes) {
          props.setIsTwoFactorEnabled(credentialRes.isTwoFactorEnabled);
        } else {
          console.warn("Could not determine 2FA status, setting to false.");
          props.setIsTwoFactorEnabled(false);
        }

        props.setUseWebAuthn(false);
      }
    },
  });

  return (
    <>
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <InputText
          ref={usernameRef}
          id="username"
          name="username"
          placeholder="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username && (
          <small className="p-error">{formik.errors.username}</small>
        )}
        <br />
        <CustomButton type="submit" variant="outlined" name={"Submit"} />
      </form>
    </>
  );
}

export default React.memo(WebAuthnLoginForm);
