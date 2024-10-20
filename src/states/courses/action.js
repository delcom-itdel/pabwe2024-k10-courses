import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_COURSES: "GET_COURSES",
  ADD_COURSE: "ADD_COURSE",
  DELETE_COURSE: "DELETE_COURSE",
  DETAIL_COURSE: "DETAIL_COURSE",
  EDIT_COURSE: "EDIT_COURSE", // Menambahkan tipe aksi untuk edit course
};

function getCoursesActionCreator(courses) {
  return { type: ActionType.GET_COURSES, payload: { courses } };
}

function addCourseActionCreator(status) {
  return { type: ActionType.ADD_COURSE, payload: { status } };
}

function deleteCourseActionCreator(status) {
  return { type: ActionType.DELETE_COURSE, payload: { status } };
}

function detailCourseActionCreator(course) {
  return { type: ActionType.DETAIL_COURSE, payload: { course } };
}

function asyncGetCourses(is_finished) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const courses = await api.getAllCourses(is_finished);
      dispatch(getCoursesActionCreator(courses));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddCourse({ title, description, cover }) { // Menambahkan cover ke parameter
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const courseId = await api.postAddCourse({ title, description, cover }); // Mengirim cover
      dispatch(addCourseActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteCourse(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteCourse(id);
      dispatch(deleteCourseActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDetailCourse(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const course = await api.getDetailCourse(id);
      dispatch(detailCourseActionCreator(course));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

// Fungsi untuk mengedit course
export const asyncEditCourse = ({ id, title, description, cover }) => async (dispatch) => {
  dispatch(showLoading()); // Tambahkan loading
  try {
    const courseId = await api.putUpdateCourse({ id, title, description, cover }); // Menyertakan cover
    dispatch(editCourseActionCreator(courseId)); // Buat action creator untuk mengedit course
  } catch (error) {
    console.error(error);
    showErrorDialog(error.message);
  }
  dispatch(hideLoading()); // Tambahkan hide loading
};

// Buat action creator untuk mengedit course
export const editCourseActionCreator = (courseId) => ({
  type: ActionType.EDIT_COURSE,
  payload: courseId,
});

export {
  ActionType,
  getCoursesActionCreator,
  asyncGetCourses,
  addCourseActionCreator,
  asyncAddCourse,
  deleteCourseActionCreator,
  asyncDeleteCourse,
  detailCourseActionCreator,
  asyncDetailCourse,
};
