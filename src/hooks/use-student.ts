import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import { QueryType } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

import { useAuth } from "./use-auth";

export function useGetAllStudents(query: Partial<QueryType>) {
  const { page, cls, limit } = query;
  const { search } = useAuth();

  return useQuery({
    queryKey: ["all-students", { page, search, cls, limit }],
    queryFn: async () => {
      return (
        await axios.get(apis.student.all_students, {
          params: { page, limit, search, class_key: cls?.key },
        })
      ).data.data;
    },
  });
}
