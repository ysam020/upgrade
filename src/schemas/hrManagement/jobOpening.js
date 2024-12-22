import * as Yup from "yup";

export const validationSchema = Yup.object({
  jobTitle: Yup.string().required("Job title is required"),
  numberOfVacancies: Yup.number()
    .typeError("Number of vacancies must be a number")
    .required("Number of vacancies is required"),
  jobPostingDate: Yup.date().required("Job posting date is required"),
  applicationDeadline: Yup.date()
    .min(Yup.ref("jobPostingDate"), "Deadline cannot be before posting date")
    .required("Application deadline is required"),
  jobDescription: Yup.string().required("Job description is required"),
  requiredSkills: Yup.string().required("Required skills are required"),
  experience: Yup.number()
    .typeError("Experience must be a number")
    .required("Experience is required"),
  location: Yup.string().required("Location is required"),
  budget: Yup.array()
    .of(Yup.number().min(2).max(10))
    .required("Budget range is required"),
  hiringManager: Yup.string().required("Hiring manager is required"),
});
