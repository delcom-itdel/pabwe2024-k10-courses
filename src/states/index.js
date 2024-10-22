import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authLoginReducer from "./authLogin/reducer";
import isPreloadReducer from "./isPreload/reducer";
import isAuthRegisterReducer from "./isAuthRegister/reducer";
import isUserChangePhotoReducer from "./isUserChangePhoto/reducer";
import {
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
} from "./courses/reducer";

const store = configureStore({
  reducer: {
    // Auth
    isAuthRegister: isAuthRegisterReducer,
    authLogin: authLoginReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,

    // Profile
    isUserChangePhoto: isUserChangePhotoReducer,

    // Course
    courses: coursesReducer,
    isAddCourse: isAddCourseReducer,
    isDeleteCourse: isDeleteCourseReducer,
    detailCourse: detailCourseReducer,

    // Student
    students: studentsReducer,
    isAddStudent: isAddStudentReducer,
    isDeleteStudent: isDeleteStudentReducer,

    // Content
    contents: contentsReducer,
    isAddContent: isAddContentReducer,
    isDeleteContent: isDeleteContentReducer,
    detailContent: detailContentReducer,
  },
});

export default store;