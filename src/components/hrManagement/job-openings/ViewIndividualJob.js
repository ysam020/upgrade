import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import { Container, Row, Col } from "react-bootstrap";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import ScheduleInterviewModal from "./ScheduleInterviewModal";
import { AlertContext } from "../../../contexts/AlertContext";

function ViewIndividualJob() {
  const { _id } = useParams();
  const [data, setData] = useState();
  const [jobApplications, setJobApplications] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const { setAlert } = useContext(AlertContext);

  const [open, setOpen] = React.useState(false);
  const handleOpen = (name, email) => {
    setName(name);
    setEmail(email);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/view-job-opening/${_id}`,
          {
            withCredentials: true,
          }
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getData();
  }, [_id]);

  const hireCandidate = async (aadharNo, jobTitle) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_STRING}/hire-candidate`,
        { aadharNo, jobTitle },
        { withCredentials: true }
      );

      setAlert({
        open: true,
        message: res.data.message,
        severity: "success",
      });

      // Re-fetch job applications after rejection
      getJobApplications();
    } catch (err) {
      setAlert({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    }
  };

  const rejectApplication = async (aadharNo, jobTitle) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_STRING}/reject-application`,
        { aadharNo, jobTitle },
        { withCredentials: true }
      );

      setAlert({
        open: true,
        message: res.data.message,
        severity: "success",
      });

      // Re-fetch job applications after rejection
      getJobApplications();
    } catch (err) {
      setAlert({
        open: true,
        message: err.response.data.message,
        severity: "error",
      });
    }
  };

  const getJobApplications = async () => {
    try {
      const res = await axios(
        `${process.env.REACT_APP_API_STRING}/view-applications/${_id}`,
        {
          withCredentials: true,
        }
      );
      setJobApplications(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getJobApplications();
    // eslint-disable-next-line
  }, [data, _id]);

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      enableSorting: false,
      size: 180,
    },

    {
      accessorKey: "mobile",
      header: "Mobile",
      enableSorting: false,
      size: 120,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: false,
      size: 220,
    },
    {
      accessorKey: "resume",
      header: "Resume",
      enableSorting: false,
      size: 120,
      Cell: ({ cell }) => {
        const base64PDF = cell.row.original.resume;

        const handleDownload = () => {
          const link = document.createElement("a");
          link.href = `data:application/pdf;base64,${base64PDF}`;
          link.download = "Resume.pdf";
          link.click();
        };

        return (
          <div>
            {base64PDF && (
              <span onClick={handleDownload} className="link">
                Download
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "aadharNo",
      header: "Aadhar No.",
      enableSorting: false,
      size: 120,
    },
    {
      accessorKey: "interviewDate",
      header: "Interview Date",
      enableSorting: false,
      size: 150,
      Cell: ({ cell }) =>
        new Date(cell.row.original.interviewDate).toLocaleString() ===
        "Invalid Date"
          ? ""
          : new Date(cell.row.original.interviewDate).toLocaleString(),
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      size: 100,
    },
    {
      accessorKey: "scheduleInterviewDate",
      header: "Schedule Interview",
      enableSorting: false,
      size: 180,
      Cell: ({ cell }) => (
        <span
          className="link"
          onClick={() =>
            handleOpen(cell.row.original.name, cell.row.original.email)
          }
        >
          Schedule
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      enableSorting: false,
      size: 100,
      Cell: ({ cell }) => (
        <>
          <span
            className="link"
            onClick={() =>
              hireCandidate(cell.row.original.aadharNo, data.jobTitle)
            }
          >
            Hire&nbsp;|&nbsp;
          </span>
          <span
            className="link"
            onClick={() =>
              rejectApplication(cell.row.original.aadharNo, data.jobTitle)
            }
          >
            Reject
          </span>
        </>
      ),
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: jobApplications,
    enableColumnResizing: true,
    enableColumnOrdering: true,
    enableDensityToggle: false, // Disable density toggle
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: {
      density: "compact",
    }, // Set initial table density to compact
    enableGrouping: true, // Enable row grouping
    enableColumnFilters: false, // Disable column filters
    enableColumnActions: false,
    enableStickyHeader: true, // Enable sticky header
    muiTableContainerProps: {
      sx: { maxHeight: "650px", overflowY: "auto" },
    },
    muiTableHeadCellProps: {
      sx: {
        position: "sticky",
        top: 0,
        zIndex: 1,
      },
    },
  });

  return (
    <Container>
      <Row style={{ backgroundColor: "white" }}>
        <Col>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemText primary="Job Title" />
              <ListItemText secondary={data?.jobTitle} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Job Posting Date" />
              <ListItemText
                secondary={new Date(data?.jobPostingDate).toLocaleDateString()}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Application Deadline" />
              <ListItemText
                secondary={new Date(
                  data?.applicationDeadline
                ).toLocaleDateString()}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Job Description" />
              <ListItemText secondary={data?.jobDescription} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Required Skills" />
              <ListItemText secondary={data?.requiredSkills} />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText primary="Number of Vacancies" />
              <ListItemText secondary={data?.numberOfVacancies} />
            </ListItem>
          </List>
        </Col>
        <Col>
          <List>
            <ListItem alignItems="flex-start">
              <ListItemText primary="Candidates Hired" />
              <ListItemText secondary={data?.candidatesHired} />
            </ListItem>
            <ListItem alignItems="flex-start">
              <ListItemText primary="Required Experience" />
              <ListItemText secondary={data?.experience} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Location" />
              <ListItemText secondary={data?.location} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Budget" />
              <ListItemText
                secondary={`${data?.budget[0]} LPA - ${data?.budget[1]} LPA`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start">
              <ListItemText primary="Hiring Manager" />
              <ListItemText secondary={data?.hiringManager} />
            </ListItem>
          </List>
        </Col>
      </Row>
      <br />
      <Row>
        <h3>Applications</h3>
        <br />
        <MaterialReactTable table={table} />
      </Row>

      <ScheduleInterviewModal
        open={open}
        handleClose={handleClose}
        jobTitle={data?.jobTitle}
        name={name}
        email={email}
      />
    </Container>
  );
}

export default React.memo(ViewIndividualJob);
