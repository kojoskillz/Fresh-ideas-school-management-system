import { User } from "./user";

export type StudentProfile = {
  _id: string;
  user: Partial<User>;
  class: {
    name: string;
    key: string;
  };
  admission_number: string;
  father: string;
  mother: string;
  father_phone: string;
  mother_phone: string;
};
