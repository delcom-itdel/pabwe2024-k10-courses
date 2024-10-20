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
} from "./courses/reducer"; 

const store = configureStore({
  reducer: {
  
    isAuthRegister: isAuthRegisterReducer,
    authLogin: authLoginReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    
    isUserChangePhoto: isUserChangePhotoReducer,
    
    courses: coursesReducer, 
    isAddCourse: isAddCourseReducer, 
    isDeleteCourse: isDeleteCourseReducer,
    detailCourse: detailCourseReducer,
  },
});

export default store;
