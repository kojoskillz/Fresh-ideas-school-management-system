export const apis = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    user: "/auth/me",
  },
  user: {
    upload: "/users/profile-image",
  },
  admin: {
    add_teacher: "/admin/add-teacher",
    add_student: "/admin/add-student",
    all_teachers: "/admin/teachers",
    all_students: "/admin/students",
    add_results: "/admin/add-result",
    student_result: "admin/student-results",
    subjects: "/admin/subjects",
    add_result_comment: "/admin/add-comment",
    quick_results: "/admin/students-quick-results",
  },
};
