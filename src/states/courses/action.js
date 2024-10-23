import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_COURSES: "GET_COURSES",
  ADD_COURSE: "ADD_COURSE",
  DETAIL_COURSE: "DETAIL_COURSE",
  UPDATE_COURSE: "UPDATE_COURSE",
  DELETE_COURSE: "DELETE_COURSE",
  ADD_STUDENT: "ADD_STUDENT",
  DELETE_STUDENT: "DELETE_STUDENT",
  UPDATE_STUDENT: "UPDATE_STUDENT",
  ADD_CONTENT: "ADD_CONTENT",
  DETAIL_CONTENT: "DETAIL_CONTENT",
  UPDATE_CONTENT: "UPDATE_CONTENT",
  DELETE_CONTENT: "DELETE_CONTENT",
};

// Action Creator Functions
function getCoursesActionCreator(courses) {
  return {
    type: ActionType.GET_COURSES,
    payload: {
      courses,
    },
  };
}

function addCourseActionCreator(status) {
  return {
    type: ActionType.ADD_COURSE,
    payload: {
      status,
    },
  };
}

function detailCourseActionCreator(course) {
  return {
    type: ActionType.DETAIL_COURSE,
    payload: {
      course,
    },
  };
}

function updateCourseActionCreator(course) {
  return {
    type: ActionType.UPDATE_COURSE,
    payload: {
      course,
    },
  };
}

function deleteCourseActionCreator(status) {
  return {
    type: ActionType.DELETE_COURSE,
    payload: {
      status,
    },
  };
}

function changeCoverCourseActionCreator(course) {
  return {
    type: ActionType.DETAIL_COURSE,
    payload: {
      course,
    },
  };
}

function addStudentActionCreator(status) {
  return {
    type: ActionType.ADD_STUDENT,
    payload: {
      status,
    },
  };
}

function deleteStudentActionCreator(status) {
  return {
    type: ActionType.DELETE_STUDENT,
    payload: {
      status,
    },
  };
}

function changeStudentRatingsActionCreator(student) {
  return {
    type: ActionType.UPDATE_STUDENT,
    payload: {
      student,
    },
  };
}

function addContentActionCreator(status) {
  return {
    type: ActionType.ADD_CONTENT,
    payload: {
      status,
    },
  };
}

function detailContentActionCreator(content) {
  return {
    type: ActionType.DETAIL_CONTENT,
    payload: {
      content,
    },
  };
}

function updateContentActionCreator(status) {
  return {
    type: ActionType.UPDATE_CONTENT,
    payload: {
      status,
    },
  };
}

function deleteContentActionCreator(status) {
  return {
    type: ActionType.DELETE_CONTENT,
    payload: {
      status,
    },
  };
}

function changeContentStatusActionCreator(content) {
  return {
    type: ActionType.DETAIL_CONTENT,
    payload: {
      content,
    },
  };
}

// Async Functions
function asyncGetCourses(is_me) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const courses = await api.getAllCourses();//is_me untuk milik sendiri
      dispatch(getCoursesActionCreator(courses));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddCourse(formData) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.postAddCourse(formData); // Ensure formData contains the cover
      dispatch(addCourseActionCreator(true)); // Handle success
    } catch (error) {
      console.error("Failed to add course:", error.message); // Handle error
    } finally {
      dispatch(hideLoading());
    }
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

function asyncUpdateCourse({ id, title, description }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const response = await api.updateCourse({ id, title, description });
      dispatch(detailCourseActionCreator(response.data));
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

function asyncChangeCoverCourse({ id, cover }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedCourse = await api.postChangeCoverCourse({ id, cover });
      dispatch(changeCoverCourseActionCreator(updatedCourse));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddStudent(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postAddStudent(id);
      dispatch(addStudentActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteStudent(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteStudent(id);
      dispatch(deleteStudentActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncChangeStudentRatings({ id, ratings, comment }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedStudent = await api.putChangeStudentRatings({
        id,
        ratings,
        comment,
      });
      dispatch(changeStudentRatingsActionCreator(updatedStudent));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddContent({ id, title, youtube }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.postAddContent({ id, title, youtube });
      dispatch(addContentActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDetailContent(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const content = await api.getDetailContent(id);
      dispatch(detailContentActionCreator(content));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpdateContent({ id, title, youtube }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.putUpdateContent({ id, title, youtube });
      dispatch(updateContentActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncDeleteContent(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteContent(id);
      dispatch(deleteContentActionCreator(true));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncChangeContentStatus({ id, status }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const updatedContent = await api.postChangeContentStatus({ id, status });
      dispatch(changeContentStatusActionCreator(updatedContent));
    } catch (error) {
      showErrorDialog(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  getCoursesActionCreator,
  addCourseActionCreator,
  detailCourseActionCreator,
  updateCourseActionCreator,
  deleteCourseActionCreator,
  changeCoverCourseActionCreator,
  addStudentActionCreator,
  deleteStudentActionCreator,
  changeStudentRatingsActionCreator,
  addContentActionCreator,
  detailContentActionCreator,
  updateContentActionCreator,
  deleteContentActionCreator,
  changeContentStatusActionCreator,
  asyncGetCourses,
  asyncAddCourse,
  asyncDetailCourse,
  asyncUpdateCourse,
  asyncDeleteCourse,
  asyncChangeCoverCourse,
  asyncAddStudent,
  asyncDeleteStudent,
  asyncChangeStudentRatings,
  asyncAddContent,
  asyncUpdateContent,
  asyncDetailContent,
  asyncDeleteContent,
  asyncChangeContentStatus,
};