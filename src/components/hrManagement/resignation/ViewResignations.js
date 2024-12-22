import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import useTableConfig from "../../../hooks/useTableConfig";
import axios from "axios";

function ViewResignations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios(
          `${process.env.REACT_APP_API_STRING}/view-resignations`,
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
      accessorKey: "username",
      header: "Username",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "reason",
      header: "Reason",
      enableSorting: false,
      size: 160,
    },
    {
      accessorKey: "job_satisfaction",
      header: "Job Satisfaction",
      enableSorting: false,
      size: 180,
    },
    {
      accessorKey: "support_from_manager",
      header: "Support From Manager",
      enableSorting: false,
      size: 170,
    },
    {
      accessorKey: "overall_company_culture",
      header: "Overall Company Culture",
      enableSorting: false,
      size: 200,
    },
    {
      accessorKey: "training_and_development",
      header: "Training and Development",
      enableSorting: false,
      size: 200,
    },
    {
      accessorKey: "suggestions",
      header: "Suggestions",
      enableSorting: false,
      size: 220,
    },
  ];

  const table = useTableConfig(data, columns, "view-exit-feedback");

  return (
    <div>
      <MaterialReactTable table={table} />
    </div>
  );
}

export default React.memo(ViewResignations);
