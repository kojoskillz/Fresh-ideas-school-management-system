import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import { QueryType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./use-auth";

export function useGetAllTeachers(query: Partial<QueryType>) {
  const { page, cls, limit } = query;
  const { search } = useAuth();
  return useQuery({
    queryKey: ["admin-all-teachers", { page, search, cls, limit }],
    queryFn: async () => {
      return (
        await axios.get(apis.teacher.all_teachers, {
          params: { page, search, class_key: cls?.key, limit },
        })
      ).data.data;
    },
  });
}
