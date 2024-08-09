import { useQueryClient } from "@tanstack/react-query";

export const useGetFetchQuery = <T,>(name: string[]) => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData<{
    data: { devices: T[] };
  }>(name);
};
