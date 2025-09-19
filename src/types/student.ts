import { User } from "./user";

export type StudentProfile = {
  _id: string;
  user: User;
  class: {
    name: string;
  };
};
