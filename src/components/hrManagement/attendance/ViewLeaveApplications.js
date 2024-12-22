import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function ViewLeaveApplications() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  async function getLeaveApplications() {
    try {
      const [month, year] = date.split("-");
      const res = await axios.get(
        `${process.env.REACT_APP_API_STRING}/get-leave-applications/${year}-${month}`,
        { withCredentials: true }
      );

      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLeaveApproval = async (_id, status) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_STRING}/update-leave-status`,
        { _id, status },
        { withCredentials: true }
      );

      getLeaveApplications();
    } catch (err) {}
  };

  const columns = [
    {
      accessorKey: "username",
      header: "Username",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "from",
      header: "From",
      enableSorting: false,
      size: 120,
    },
    {
      accessorKey: "to",
      header: "To",
      enableSorting: false,
      size: 120,
    },
    {
      accessorKey: "reason",
      header: "Reason",
      enableSorting: false,
      size: 200,
    },
    {
      accessorKey: "sick_leave",
      header: "Sick Leave",
      enableSorting: false,
      size: 130,
    },
    {
      accessorKey: "medical_certificate",
      header: "Medical Certificate",
      enableSorting: false,
      size: 180,
    },
    {
      accessorKey: "status",
      header: "Status",
      enableSorting: false,
      size: 150,
    },
    {
      accessorKey: "approve",
      header: "Action",
      enableSorting: false,
      size: 220,
      Cell: ({ cell }) => {
        return (
          <>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() =>
                handleLeaveApproval(cell.row.original._id, "Approve")
              }
            >
              Approve&nbsp;|&nbsp;
            </span>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() =>
                handleLeaveApproval(cell.row.original._id, "Reject")
              }
            >
              Reject&nbsp;|&nbsp;
            </span>
            <span
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() =>
                handleLeaveApproval(cell.row.original._id, "Withdraw")
              }
            >
              Withdraw
            </span>
          </>
        );
      },
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
        <div>
          <TextField
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="month"
            size="small"
            sx={{ width: "200px", margin: 0, marginRight: "20px" }}
          />
        </div>
      </>
    ),
  });

  useEffect(() => {
    getLeaveApplications();
    // eslint-disable-next-line
  }, [date]);

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewLeaveApplications);