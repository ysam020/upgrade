import React, { useEffect } from "react";
import { TextField } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function ViewOwnWeekOffs(props) {
  useEffect(() => {
    props.getWeekOffs();
    // eslint-disable-next-line
  }, [props.date]);

  const columns = [
    {
      accessorKey: "date",
      header: "Date",
      enableSorting: false,
      size: 200,
      Cell: ({ cell }) => {
        return (
          <>
            {new Date(cell.row.original.date)
              .toLocaleDateString("en-GB")
              .replace(/\//g, "-")}
          </>
        );
      },
    },
  ];

  const table = useMaterialReactTable({
    columns,
    data: props.data,
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
            value={props.date}
            onChange={(e) => props.setDate(e.target.value)}
            type="month"
            size="small"
            sx={{ width: "200px", margin: 0, marginRight: "20px" }}
          />
        </div>
      </>
    ),
  });

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewOwnWeekOffs);
