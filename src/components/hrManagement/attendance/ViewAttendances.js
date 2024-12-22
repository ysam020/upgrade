import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function ViewAttendances() {
  const [data, setData] = useState([]);

  const [date, setDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const columns = [
    {
      accessorKey: "username",
      header: "Username",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "presents",
      header: "Presents",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "halfDays",
      header: "Half Days",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "weekOffs",
      header: "Week Offs",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "leaves",
      header: "Total Leaves",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "paidLeaves",
      header: "Paid Leaves",
      enableSorting: false,
      size: 160,
      Cell: ({ cell }) => {
        const leaves = cell.row.original.leaves;
        return <>{Math.min(leaves, 1.5)}</>; // Capped at 1.5
      },
    },
    {
      accessorKey: "unpaidLeaves",
      header: "Unpaid Leaves",
      enableSorting: false,
      size: 160,
      Cell: ({ cell }) => {
        const leaves = cell.row.original.leaves;
        return <>{Math.max(0, leaves - 1.5)}</>; // Only the excess
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
    async function getAttendances() {
      try {
        const [month, year] = date.split("-");
        const res = await axios.get(
          `${process.env.REACT_APP_API_STRING}/get-all-attendances/${month}/${year}`,
          { withCredentials: true }
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    getAttendances();
  }, [date]);

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewAttendances);
