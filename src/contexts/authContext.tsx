"use client";

import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/configs/axios";
import { apis } from "@/lib/api";
import { getCookie } from "cookies-next";
import { User } from "@/types/user";

interface State {
  user: User | undefined;
  isAuthenticated: boolean;
  setState: Dispatch<SetStateAction<State>>;
  isLoading: boolean;
}

export const AuthContext = createContext<State | null>(null);

const defaultValue: State = {
  user: undefined,
  setState: () => {},
  isAuthenticated: false,
  isLoading: false,
};

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultValue);
  const token = getCookie("access_token");

  const { data, isSuccess } = useQuery({
    queryKey: ["Authenticated User"],
    queryFn: async () => (await axios.get(apis.auth.user)).data,
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setState((prev) => ({ ...prev, user: data.data, isAuthenticated: true }));
    }
  }, [isSuccess, data]);

  return (
    <AuthContext.Provider value={{ ...state, setState }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
