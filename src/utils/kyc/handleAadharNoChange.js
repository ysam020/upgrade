export const handleAadharNoChange = (event, formik) => {
  const { value } = event.target;
  const newValue = value.replace(/\D/g, "").slice(0, 12);
  formik.setFieldValue("aadhar_no", newValue);
};
