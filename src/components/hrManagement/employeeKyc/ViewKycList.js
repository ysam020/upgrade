import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useNavigate } from "react-router-dom";

function ViewKycList() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_STRING}/view-all-kycs`,
          {
            withCredentials: true,
          }
        );
        setData(res.data);
      } catch (error) {
        console.error("Error occurred while fetching KYC data:", error);
      }
    }

    getData();
  }, []);

  const columns = [
    {
      accessorKey: "first_name",
      header: "First Name",
      enableSorting: false,
      size: 180,
    },
    {
      accessorKey: "middle_name",
      header: "Middle Name",
      enableSorting: false,
      size: 180,
    },
    {
      accessorKey: "last_name",
      header: "Last Name",
      enableSorting: false,
      size: 180,
    },
    {
      accessorKey: "email",
      header: "Email",
      enableSorting: false,
      size: 200,
    },

    {
      accessorKey: "kyc_approval",
      header: "KYC Approval",
      enableSorting: false,
      size: 150,
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnResizing: true,
    enableColumnOrdering: true,
    enableDensityToggle: false, // Disable density toggle
    enablePagination: false,
    enableBottomToolbar: false,
    initialState: {
      density: "compact",
    }, // Set initial table density to compact
    enableColumnPinning: true, // Enable column pinning
    enableGrouping: true, // Enable row grouping
    enableColumnFilters: false, // Disable column filters
    enableColumnActions: false,
    enableStickyHeader: true, // Enable sticky header
    enablePinning: true, // Enable pinning for sticky columns
    muiTableContainerProps: {
      sx: { maxHeight: "570px", overflowY: "auto" },
    },
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => navigate(`/view-kyc/${row.original.username}`),
      style: { cursor: "pointer" },
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

export default React.memo(ViewKycList);
