import { Dispatch, SetStateAction } from "react";
import { StudentProfile } from "./student";
import { TeacherProfile } from "./teacher";
import { AdminProfile } from "./admin";

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export enum UserReligion {
  CHRISTIAN = "CHRISTIAN",
  MUSLIM = "MUSLIM",
  TRADITIONA = "TRADITION",
}

export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export type User = {
  _id: string;
  role: UserRole;
  name: string;
  email: string;
  date_of_birth: string;
  gender: string;
  religion: string;
  address: string;
  phone: string;
  profile: TeacherProfile | StudentProfile | AdminProfile;
};

export type QueryType = {
  page: number;
  limit: number;
  search: string;
  cls?: { name: string; key: string };
  term?: string;
  student?: Partial<StudentProfile>;
  teacher?: Partial<TeacherProfile>;
  session?: string;
  subject?: { name: string; _id: string };
};

export type ListMetaType = {
  total_pages: number;
  current_page: number;
  total_items: number;
  setQuery: Dispatch<SetStateAction<Partial<QueryType>>>;
  query: Partial<QueryType>;
};
