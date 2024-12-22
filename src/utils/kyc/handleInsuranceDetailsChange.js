export const handleInsuranceDetailsChange = (event, formik) => {
  const member = event.target.name;
  const isChecked = event.target.checked;

  // Retrieve the current array of family members
  const currentMembers = formik.values.insurance_status;

  // Update the array based on the checkbox state
  let updatedMembers = [];
  if (isChecked) {
    updatedMembers = [...currentMembers, member];
  } else {
    updatedMembers = currentMembers.filter((m) => m !== member);
  }

  // Update formik values with the updated array of family members
  formik.setFieldValue("insurance_status", updatedMembers);
};
