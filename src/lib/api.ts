export const apis = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    user: "/auth/me",
  },
  user: {
    upload: "/users/profile-image",
    edit_profile: "/users/edit",
    delete_user: "/users",
    dashboard: "/users/dashboard",
    subjects: "/users/subjects",
  },
  admin: {
    add_teacher: "/admins/add-teacher",
    add_student: "/admins/add-student",
    add_subject: "/admins/add-subject",
  },
  teacher: {
    all_teachers: "/teachers",
  },
  student: {
    all_students: "/students",
  },
  result: {
    results: "/results",
    add_results: "/results/add-result",
    add_result_comment: "/results/add-comment",
    quick_results: "/results/quick",
  },
};
