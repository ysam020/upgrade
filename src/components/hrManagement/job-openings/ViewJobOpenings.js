import React from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ViewJobOpenings() {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getData() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/view-job-openings`,
          {
            withCredentials: true,
          }
        );
        setData(res.data);
      } catch (error) {
        console.error("Error occurred while fetching job openings:", error);
      }
    }
    getData();
  }, []);

  const columns = [
    {
      accessorKey: "jobTitle",
      header: "Job Title",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "jobPostingDate",
      header: "Job Posting Date",
      enableSorting: false,
      size: 160,
      Cell: ({ cell }) => {
        return (
          <>
            {new Date(cell.row.original.jobPostingDate).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }
            )}
          </>
        );
      },
    },
    {
      accessorKey: "applicationDeadline",
      header: "Application Deadline",
      enableSorting: false,
      size: 200,
      Cell: ({ cell }) => {
        return (
          <>
            {new Date(cell.row.original.applicationDeadline).toLocaleDateString(
              "en-US",
              {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }
            )}
          </>
        );
      },
    },
    {
      accessorKey: "numberOfVacancies",
      header: "Number of Vacancies",
      enableSorting: false,
      size: 200,
    },
    {
      accessorKey: "candidatesHired",
      header: "Candidates Hired",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "location",
      header: "Location",
      enableSorting: false,
      size: 120,
    },
    {
      accessorKey: "budget",
      header: "Budget",
      enableSorting: false,
      size: 180,
      Cell: ({ cell }) => {
        return (
          <>
            {`${cell.row.original.budget[0]} LPA`} -
            {`${cell.row.original.budget[1]} LPA`}
          </>
        );
      },
    },
  ];

  const getTableRowsClassname = (params) => {
    const applicationDeadline = new Date(params.original.applicationDeadline);
    if (new Date() >= applicationDeadline) return "inactive-job-opening";
    return ""; // Default class name
  };

  const table = useMaterialReactTable({
    columns,
    data: data,
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
    muiTableBodyRowProps: ({ row }) => ({
      className: getTableRowsClassname(row),
      onClick: () => navigate(`/view-job-opening/${row.original._id}`),
      style: { cursor: "pointer" }, // Change cursor to pointer on hover
    }),
    muiTableHeadCellProps: {
      sx: {
        position: "sticky",
        top: 0,
        zIndex: 1,
      },
    },
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewJobOpenings);
