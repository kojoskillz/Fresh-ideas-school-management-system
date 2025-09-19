export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
}

export type User = {
  role: UserRole;
  name: string;
  email: string;
};
