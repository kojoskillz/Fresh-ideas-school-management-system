import { User } from "./user";

export type TeacherProfile = {
  _id: string;
  user: User;
  assigned_class: {
    name: string;
  };
  section: string;
};
