import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { validationSchema } from "../../../schemas/hrManagement/jobOpening";
import CustomButton from "../../customComponents/CustomButton";
import CustomTextField from "../../customComponents/CustomTextField";
import Slider from "@mui/material/Slider";
import { AlertContext } from "../../../contexts/AlertContext";

function valuetext(value) {
  return `${value} LPA`;
}

const marks = [
  {
    value: 2,
    label: "2 LPA",
  },
  {
    value: 10,
    label: "10 LPA",
  },
];

function NewJobOpenings() {
  const { setAlert } = useContext(AlertContext);
  const formik = useFormik({
    initialValues: {
      jobTitle: "",
      numberOfVacancies: "",
      jobPostingDate: new Date().toISOString().split("T")[0],
      applicationDeadline: "",
      jobDescription: "",
      requiredSkills: "",
      experience: "",
      location: "",
      budget: [2, 10],
      hiringManager: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_STRING}/add-job-opening`,
          values,
          { withCredentials: true }
        );
        setAlert({
          open: true,
          message: res.data.message,
          severity: "success",
        });
      } catch (error) {
        setAlert({
          open: true,
          message: error.response.data.message,
          severity: "error",
        });
      }
    },
  });

  const handleSliderChange = (event, newValue) => {
    formik.setFieldValue("budget", newValue);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        id="jobTitle"
        name="jobTitle"
        label="Job Title"
        formik={formik}
        select
        options={[
          { value: "CENTER HEAD", label: "CENTER HEAD" },
          { value: "HOD", label: "HOD" },
          { value: "BACK OFFICE MANAGER ", label: "BACK OFFICE MANAGER " },
          { value: "OPERATION MANAGER", label: "OPERATION MANAGER" },
          { value: "MANAGER", label: "MANAGER" },
          { value: "ASSISTANT MANAGER", label: "ASSISTANT MANAGER" },
          { value: "HR MANAGER", label: "HR MANAGER" },
          { value: "HR ADMIN", label: "HR ADMIN" },
          {
            value: "HR-BACK OFFICE EXECUTIVE",
            label: "HR-BACK OFFICE EXECUTIVE",
          },
          {
            value: "HR-BACK OFFICE EXECUTIVE",
            label: "HR-BACK OFFICE EXECUTIVE",
          },
          { value: "HR EXECUTIVE", label: "HR EXECUTIVE" },
          { value: "HR & BACKEND", label: "HR & BACKEND" },
          { value: "FIELD EXECUTIVE", label: "FIELD EXECUTIVE" },
          { value: "TEAM LEADER", label: "TEAM LEADER" },
          { value: "ASSISTANT TEAM LEADER", label: "ASSISTANT TEAM LEADER" },
          { value: "MIS EXECUTIVE", label: "MIS EXECUTIVE" },
          { value: "Q.A.", label: "Q.A." },
          { value: "TRAINER", label: "TRAINER" },
          { value: "TELECALLER", label: "TELECALLER" },
          { value: "HOUSEKEEPING", label: "HOUSEKEEPING" },
          { value: "GUARD", label: "GUARD" },
        ]}
      />

      <CustomTextField
        id="numberOfVacancies"
        name="numberOfVacancies"
        label="Number of Vacancies"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="jobPostingDate"
        name="jobPostingDate"
        label="Job Posting Date"
        formik={formik}
        type="date"
      />

      <CustomTextField
        id="applicationDeadline"
        name="applicationDeadline"
        label="Application Deadline"
        formik={formik}
        type="date"
      />

      <CustomTextField
        id="jobDescription"
        name="jobDescription"
        label="Job Description"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="requiredSkills"
        name="requiredSkills"
        label="Required Skills"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="experience"
        name="experience"
        label="Experience (in years)"
        formik={formik}
        useSpeech={true}
      />

      <CustomTextField
        id="location"
        name="location"
        label="Location"
        formik={formik}
        useSpeech={true}
      />

      <br />
      <br />
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <span>Budget</span>
        <Slider
          getAriaLabel={() => "Salary range"}
          value={formik.values.budget}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          marks={marks}
          min={2}
          max={10}
          step={0.1}
        />
      </div>
      <br />
      <CustomTextField
        id="hiringManager"
        name="hiringManager"
        label="Hiring Manager"
        formik={formik}
        useSpeech={true}
      />

      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(NewJobOpenings);
