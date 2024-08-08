import { useQuery } from "@tanstack/react-query";
import React from "react";
import { sdk } from "../../../utils/sdk";

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
  const {
    data: { devices },
  } = data;

  return (
    <div>
      {devices.map(({ name, uuid }) => {
        return (
          <a key={uuid} href={"/devices/" + uuid}>
            {name}
          </a>
        );
      })}
    </div>
  );
};

export default DevicesList;
