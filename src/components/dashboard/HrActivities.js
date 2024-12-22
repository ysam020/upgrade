import React, { useState, useEffect } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";

function HrActivities() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/get-hr-activities`,
          { withCredentials: true }
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  const columns = [
    {
      accessorKey: "title",
      header: "Title",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "description",
      header: "Description",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "date",
      header: "Date",
      enableSorting: false,
      size: 160,
      Cell: ({ cell }) => {
        const date = cell.getValue();

        // Convert the date to dd-mm-yyyy format
        const formatDate = (dateString) => {
          const [year, month, day] = dateString.split("-");
          return `${day}-${month}-${year}`;
        };

        return date ? formatDate(date) : "";
      },
    },
    {
      accessorKey: "time",
      header: "Time",
      enableSorting: false,
      size: 160,
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    enableBottomToolbar: false,
    enableTopToolbar: false,
    enableStickyHeader: true,
    muiTableContainerProps: {
      sx: { maxHeight: "250px", overflowY: "auto" },
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
    <div className="dashboard-container">
      <h5>
        <strong>HR Activities</strong>
        <br />
        <br />
        <MaterialReactTable table={table} />
      </h5>
    </div>
  );
}

export default React.memo(HrActivities);
