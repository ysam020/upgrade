import { useMaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";

function useTableConfig(rows, columns, url) {
  const navigate = useNavigate();

  const table = useMaterialReactTable({
    columns,
    data: rows,
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
      onClick: () => navigate(`/${url}/${row.original._id}`),
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

  return table;
}

export default useTableConfig;
