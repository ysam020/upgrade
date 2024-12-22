import * as Yup from "yup";

export const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  appraisalDate: Yup.string()
    .required("Appraisal date is required")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "Appraisal date must be in the format YYYY-MM-DD"
    ),
  performanceScore: Yup.number()
    .required("Performance score is required")
    .min(1, "Minimum score is 1")
    .max(5, "Maximum score is 5"),
  strengths: Yup.string()
    .required("Strengths are required")
    .min(5, "Strengths must be at least 5 characters long"),
  areasOfImprovement: Yup.string()
    .required("Areas of improvement are required")
    .min(5, "Areas of improvement must be at least 5 characters long"),
  feedback: Yup.string()
    .required("Feedback is required")
    .min(5, "Feedback must be at least 5 characters long"),
});
