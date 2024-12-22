export const handlePincodeChange = (event, field, formik) => {
  const { value } = event.target;
  // Remove non-digit characters and limit length to 6
  const newValue = value.replace(/\D/g, "").slice(0, 6);
  // Update the formik values with the sanitized input
  formik.setFieldValue(field, newValue);
};
