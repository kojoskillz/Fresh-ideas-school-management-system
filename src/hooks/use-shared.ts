import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import { QueryType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function useGetAllSubjects({ page, limit }: Partial<QueryType>) {
  return useQuery({
    queryKey: ["all-subject", page, limit],
    queryFn: async () => {
      return (
        await axios.get(apis.user.subjects, {
          params: { page, limit },
        })
      ).data.data;
    },
  });
}
