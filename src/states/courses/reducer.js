import { ActionType } from "./action";

function coursesReducer(courses = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_COURSES:
      return action.payload.courses;

    case ActionType.UPDATE_COURSE:
      return courses.map((course) =>
        course.id === action.payload.course.id ? action.payload.course : course
      );

    case ActionType.DELETE_COURSE:
      return courses.filter((course) => course.id !== action.payload.id);

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

function studentsReducer(students = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_STUDENT:
      return [...students, action.payload.student];

    case ActionType.DELETE_STUDENT:
      return students.filter((student) => student.id !== action.payload.id);

    case ActionType.UPDATE_STUDENT:
      return students.map((student) =>
        student.id === action.payload.student.id
          ? action.payload.student
          : student
      );

    default:
      return students;
  }
}

function isAddStudentReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.ADD_STUDENT:
      return action.payload.status;
    default:
      return status;
  }
}

function isDeleteStudentReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_STUDENT:
      return action.payload.status;
    default:
      return status;
  }
}

function contentsReducer(contents = [], action = {}) {
  switch (action.type) {
    case ActionType.ADD_CONTENT:
      return [...contents, action.payload.content];

    case ActionType.DELETE_CONTENT:
      return contents.filter((content) => content.id !== action.payload.id);

    case ActionType.UPDATE_CONTENT:
      return contents.map((content) =>
        content.id === action.payload.content.id
          ? action.payload.content
          : content
      );

    default:
      return contents;
  }
}

function isAddContentReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.ADD_CONTENT:
      return action.payload.status;
    default:
      return status;
  }
}

function isDeleteContentReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_CONTENT:
      return action.payload.status;
    default:
      return status;
  }
}

function detailContentReducer(content = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_CONTENT:
      return action.payload.content;
    default:
      return content;
  }
}

export {
  coursesReducer,
  isAddCourseReducer,
  isDeleteCourseReducer,
  detailCourseReducer,
  studentsReducer,
  isAddStudentReducer,
  isDeleteStudentReducer,
  contentsReducer,
  isAddContentReducer,
  isDeleteContentReducer,
  detailContentReducer,
};