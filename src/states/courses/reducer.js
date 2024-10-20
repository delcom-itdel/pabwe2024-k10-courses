import { ActionType } from "./action";

function coursesReducer(courses = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_COURSES:
      return action.payload.courses;
    case ActionType.ADD_COURSE:
      return [...courses, action.payload.course]; // Menambahkan kursus baru
    case ActionType.EDIT_COURSE:
      return courses.map(course =>
        course.id === action.payload.courseId
          ? { ...course, ...action.payload.updatedCourse } // Mengupdate kursus yang diedit
          : course
      );
    default:
      return courses;
  }
}

function isAddCourseReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.ADD_COURSE:
      return action.payload.status;
    default:
      return status;
  }
}

function isDeleteCourseReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_COURSE:
      return action.payload.status;
    default:
      return status;
  }
}

function detailCourseReducer(course = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_COURSE:
      return action.payload.course;
    default:
      return course;
  }
}

// Menambahkan reducer untuk mengelola status pengeditan
function isEditCourseReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.EDIT_COURSE:
      return action.payload.status;
    default:
      return status;
  }
}

export {
  coursesReducer,
  isAddCourseReducer,
  isDeleteCourseReducer,
  detailCourseReducer,
  isEditCourseReducer, // Mengeksport reducer edit
};