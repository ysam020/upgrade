import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import Autocomplete from "@mui/material/Autocomplete";

function ViewAppraisals() {
  const [data, setData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/get-all-users`,
          {
            withCredentials: true,
          }
        );
        setUserList(res.data.map((user) => user.username));
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    }

    getUsers();
  }, []);

  useEffect(() => {
    async function getData() {
      if (selectedUser) {
        try {
          const res = await axios(
            `${process.env.REACT_APP_API_STRING}/view-appraisals/${selectedUser}`,
            {
              withCredentials: true,
            }
          );
          setData(res.data);
        } catch (error) {
          console.error("Error occurred while fetching appraisals:", error);
        }
      }
    }

    getData();
  }, [selectedUser]);

  const columns = [
    {
      accessorKey: "appraisalDate",
      header: "Appraisal Date",
      enableSorting: false,
      size: 150,
    },
    {
      accessorKey: "areasOfImprovement",
      header: "Areas of Improvement",
      enableSorting: false,
      size: 320,
    },
    {
      accessorKey: "feedback",
      header: "Feedback",
      enableSorting: false,
      size: 300,
    },
    {
      accessorKey: "performanceScore",
      header: "Performance Score",
      enableSorting: false,
      size: 180,
    },
    {
      accessorKey: "strengths",
      header: "Strengths",
      enableSorting: false,
      size: 320,
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableColumnOrdering: true,
    enablePagination: false,
    enableBottomToolbar: false,
    enableDensityToggle: false, // Disable density toggle
    initialState: { density: "compact" }, // Set initial table density to compact
    enableGrouping: true, // Enable row grouping
    enableColumnFilters: false, // Disable column filters
    enableColumnActions: false,
    enableStickyHeader: true, // Enable sticky header
    muiTableContainerProps: {
      sx: { maxHeight: "590px", overflowY: "auto" },
    },
    muiTableHeadCellProps: {
      sx: {
        position: "sticky",
        top: 0,
        zIndex: 1,
      },
    },

    renderTopToolbarCustomActions: () => (
      <>
        <Autocomplete
          value={selectedUser}
          onChange={(event, newValue) => {
            setSelectedUser(newValue);
          }}
          sx={{ width: "200px" }}
          options={userList}
          getOptionLabel={(option) => option || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="Select User" />
          )}
        />
      </>
    ),
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewAppraisals);
