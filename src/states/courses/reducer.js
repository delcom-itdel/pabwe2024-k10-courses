import { ActionType } from "./action";

// Reducer untuk mengelola daftar kursus
function coursesReducer(courses = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_COURSES:
      return action.payload.courses;
    case ActionType.ADD_COURSE:
      if (action.payload.course) { // Menambahkan kursus baru hanya jika tersedia
        return [...courses, action.payload.course];
      }
      return courses;
    case ActionType.EDIT_COURSE:
      return courses.map(course =>
        course.id === action.payload.courseId
          ? { ...course, ...action.payload.updatedCourse }
          : course
      );
    default:
      return courses;
  }
}

// Reducer untuk mengelola status penambahan kursus
function isAddCourseReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.ADD_COURSE:
      return action.payload.success; // Menggunakan success flag dari payload
    default:
      return status;
  }
}

// Reducer untuk mengelola status penghapusan kursus
function isDeleteCourseReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_COURSE:
      return action.payload.status;
    default:
      return status;
  }
}

// Reducer untuk menangani detail kursus
function detailCourseReducer(course = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_COURSE:
      return action.payload.course;
    default:
      return course;
  }
}

// Reducer untuk mengelola status pengeditan kursus
function isEditCourseReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.EDIT_COURSE:
      return action.payload.status; // Menggunakan status dari payload
    default:
      return status;
  }
}

// Reducer untuk mengelola error
function errorReducer(error = null, action = {}) {
  switch (action.type) {
    case ActionType.SET_ERROR:
      return action.payload.error;
    case ActionType.CLEAR_ERROR:
      return null;
    default:
      return error;
  }
}

export {
  coursesReducer,
  isAddCourseReducer,
  isDeleteCourseReducer,
  detailCourseReducer,
  isEditCourseReducer,
  errorReducer 
};
