import React from "react";
import { useGetFetchQuery } from "../../../../hooks/useGetFetchQuery";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Device } from "../../../../utils/sdk";

const DevicesTable = () => {
  const data = useGetFetchQuery<Device>(["todos"]);
  const navigate = useNavigate();
  if (!data) return;
  const {
    data: { devices },
  } = data;

  const columns: GridColDef[] = [
    { field: "uuid", headerName: "ID", width: 300 },
    { field: "name", headerName: "Pi Name", width: 70 },
    { field: "status", headerName: "Pi Status", width: 70 },
    {
      field: "ip_address",
      headerName: "IpAddress",
      type: "number",
      width: 90,
    },
  ];
  return (
    <DataGrid
      getRowId={(row) => row?.uuid}
      rows={devices}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      onRowClick={({ id }) => navigate("/devices/" + id)}
    />
  );
};

export default DevicesTable;
