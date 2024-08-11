import { useQuery } from "@tanstack/react-query";
import React from "react";
import { sdk } from "../../../utils/sdk";
import DevicesTable from "./subcomponents/DevicesTable";
import { Card, CardContent, Typography } from "@mui/material";
const DevicesList = () => {
  const {
    deviceApi: { getList },
  } = sdk;
  const { data, error, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getList,
  });

  if (isLoading) return <>loading</>;
  if ((error && !isLoading) || !data) return <>VERY BAD</>;

  return (
    <Card
      sx={{
        minWidth: 275,
        alignItems: "center",
        display: "flex",
      }}
    >
      <CardContent>
        <Typography variant="h2">Pi Devices</Typography>
        <DevicesTable />
      </CardContent>
    </Card>
  );
};

export default DevicesList;
