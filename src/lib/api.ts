export const apis = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    user: "/auth/me",
  },
  user: {
    upload: "/users/profile-image",
    edit_profile: "/users/edit",
  },
  admin: {
    add_teacher: "/admin/add-teacher",
    add_student: "/admin/add-student",
    add_results: "/admin/add-result",
    add_result_comment: "/admin/add-comment",
    add_subject: "/admin/add-subject",
    all_teachers: "/admin/teachers",
    all_students: "/admin/students",
    student_result: "admin/student-results",
    subjects: "/admin/subjects",
    quick_results: "/admin/students-quick-results",
  },
};