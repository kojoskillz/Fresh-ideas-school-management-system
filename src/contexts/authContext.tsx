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
  showSearch: boolean;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<State | null>(null);

const defaultValue: State = {
  user: undefined,
  setState: () => {},
  isAuthenticated: false,
  isLoading: false,
  showSearch: false,
  setShowSearch: () => {},
  search: "",
  setSearch: () => {},
};

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultValue);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const token = getCookie("access_token");

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["Authenticated User"],
    queryFn: async () => (await axios.get(apis.auth.user)).data,
    enabled: !!token,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setState((prev) => ({
        ...prev,
        user: data.data,
        isAuthenticated: true,
      }));
    }
  }, [isSuccess, data]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setState,
        showSearch,
        setShowSearch,
        search,
        setSearch,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
