import React, { useContext } from "react";
import { useFormik } from "formik";
import CustomButton from "../../customComponents/CustomButton";
import CustomTextField from "../../customComponents/CustomTextField";
import { Row, Col } from "react-bootstrap";
import Rating from "@mui/material/Rating";
import { AlertContext } from "../../../contexts/AlertContext";
import axios from "axios";

function ResignationForm() {
  const { setAlert } = useContext(AlertContext);
  const formik = useFormik({
    initialValues: {
      reason: "",
      overall_job_satisfaction: 0,
      clarity_of_job_duties: 0,
      opportunity_to_utilize_skills: 0,
      workload_and_stress_management: 0,
      resources_and_tools_provided: 0,
      quality_of_communication: "",
      support_from_manager: "",
      appreciation_for_work: "",
      collaboration_within_the_team: "",
      overall_company_culture: "",
      opportunities_for_professional_development: 0,
      effectiveness_of_training_programs_provided: 0,
      support_for_continuing_education: 0,
      suggestions: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_STRING}/add-resignation`,
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
    <form onSubmit={formik.handleSubmit}>
      <CustomTextField
        id="reason"
        name="reason"
        label="Reason for resigning"
        formik={formik}
        multiline
        rows={2}
        useSpeech={false}
      />
      <br /> <br />
      <h5>Job Role Satisfaction</h5>
      <Row>
        <Col>
          Overall job satisfaction
          <br />
          <Rating
            name="overall_job_satisfaction"
            value={formik.values.overall_job_satisfaction}
            onChange={(event, newValue) => {
              formik.setFieldValue("overall_job_satisfaction", newValue);
            }}
          />
        </Col>
        <Col>
          Clarity of job duties
          <br />
          <Rating
            name="clarity_of_job_duties"
            value={formik.values.clarity_of_job_duties}
            onChange={(event, newValue) => {
              formik.setFieldValue("clarity_of_job_duties", newValue);
            }}
          />
        </Col>
        <Col>
          Opportunity to utilize skills
          <br />
          <Rating
            name="opportunity_to_utilize_skills"
            value={formik.values.opportunity_to_utilize_skills}
            onChange={(event, newValue) => {
              formik.setFieldValue("opportunity_to_utilize_skills", newValue);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          Workload and stress management <br />
          <Rating
            name="workload_and_stress_management"
            value={formik.values.workload_and_stress_management}
            onChange={(event, newValue) => {
              formik.setFieldValue("workload_and_stress_management", newValue);
            }}
          />
        </Col>
        <Col>
          Resources and tools provided <br />
          <Rating
            name="resources_and_tools_provided"
            value={formik.values.resources_and_tools_provided}
            onChange={(event, newValue) => {
              formik.setFieldValue("resources_and_tools_provided", newValue);
            }}
          />
        </Col>
        <Col></Col>
      </Row>
      <br />
      <h5>Management & Team Environment</h5>
      <Row>
        <Col>
          <CustomTextField
            id="quality_of_communication"
            name="quality_of_communication"
            label="Quality of communication"
            formik={formik}
            useSpeech={true}
          />
        </Col>
        <Col>
          <CustomTextField
            id="support_from_manager"
            name="support_from_manager"
            label="Support from manager"
            formik={formik}
            useSpeech={true}
          />
        </Col>
        <Col>
          <CustomTextField
            id="appreciation_for_work"
            name="appreciation_for_work"
            label="Appreciation for work"
            formik={formik}
            useSpeech={true}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTextField
            id="collaboration_within_the_team"
            name="collaboration_within_the_team"
            label="Collaboration within the team"
            formik={formik}
            useSpeech={true}
          />
        </Col>
        <Col>
          <CustomTextField
            id="overall_company_culture"
            name="overall_company_culture"
            label="Overall company culture"
            formik={formik}
            useSpeech={true}
          />
        </Col>
        <Col></Col>
      </Row>
      <br />
      <h5>Training & Development</h5>
      <Row>
        <Col>
          Opportunities for professional development
          <br />
          <Rating
            name="opportunities_for_professional_development"
            value={formik.values.opportunities_for_professional_development}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "opportunities_for_professional_development",
                newValue
              );
            }}
          />
        </Col>
        <Col>
          Effectiveness of training programs provided
          <br />
          <Rating
            name="effectiveness_of_training_programs_provided"
            value={formik.values.effectiveness_of_training_programs_provided}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "effectiveness_of_training_programs_provided",
                newValue
              );
            }}
          />
        </Col>
        <Col>
          Support for continuing education
          <br />
          <Rating
            name="support_for_continuing_education"
            value={formik.values.support_for_continuing_education}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "support_for_continuing_education",
                newValue
              );
            }}
          />
        </Col>
      </Row>
      <CustomTextField
        id="suggestions"
        name="suggestions"
        label="Suggestions for improvement"
        formik={formik}
        multiline
        rows={2}
        useSpeech={true}
      />
      <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
    </form>
  );
}

export default React.memo(ResignationForm);
