import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { style } from "../utils/modalStyle";
import CustomTextField from "../components/customComponents/CustomTextField";
import CustomButton from "../components/customComponents/CustomButton";
import { useFormik } from "formik";
import axios from "axios";
import { validationSchema } from "../schemas/addEventSchema";

function AddEventModal(props) {
  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_STRING}/add-event`,
          values,
          { withCredentials: true }
        );
        props.handleClose();
        props.getEvents();
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableEscapeKeyDown
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit}>
            <h5>Add New Event</h5>
            <CustomTextField
              id="title"
              name="title"
              label="Title"
              formik={formik}
            />
            <CustomTextField
              id="date"
              name="date"
              label="Date"
              type="date"
              formik={formik}
            />
            <CustomTextField
              id="startTime"
              name="startTime"
              label="Start Time"
              type="time"
              formik={formik}
            />
            <CustomTextField
              id="endTime"
              name="endTime"
              label="End Time"
              type="time"
              formik={formik}
            />
            <CustomTextField
              id="description"
              name="description"
              label="Description"
              formik={formik}
            />
            <CustomButton name="Submit" isSubmitting={formik.isSubmitting} />
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(AddEventModal);
