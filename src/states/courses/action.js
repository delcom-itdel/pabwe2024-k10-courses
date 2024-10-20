import { hideLoading, showLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import { showErrorDialog } from "../../utils/tools";

const ActionType = {
  GET_COURSES: "GET_COURSES",
  ADD_COURSE: "ADD_COURSE",
  DELETE_COURSE: "DELETE_COURSE",
  DETAIL_COURSE: "DETAIL_COURSE",
  EDIT_COURSE: "EDIT_COURSE",
  RESET_ADD_COURSE: "RESET_ADD_COURSE", // Menambahkan tipe aksi untuk reset
  SET_ERROR: "SET_ERROR"  // Menambahkan tipe aksi untuk error
};

// Aksi untuk mendapatkan semua kursus
function getCoursesActionCreator(courses) {
  return { type: ActionType.GET_COURSES, payload: { courses } };
}

// Aksi untuk menambahkan kursus baru
function addCourseActionCreator(success, course = null) {
  return { type: ActionType.ADD_COURSE, payload: { success, course } };
}

// Aksi untuk mereset status penambahan kursus
function resetAddCourse() {
  return { type: ActionType.RESET_ADD_COURSE };
}

// Aksi untuk menangani error
function setErrorActionCreator(error) {
  return { type: ActionType.SET_ERROR, payload: { error } };
}

// Aksi untuk menghapus kursus
function deleteCourseActionCreator(status) {
  return { type: ActionType.DELETE_COURSE, payload: { status } };
}

// Aksi untuk mendapatkan detail kursus
function detailCourseActionCreator(course) {
  return { type: ActionType.DETAIL_COURSE, payload: { course } };
}

// Aksi asinkron untuk mendapatkan semua kursus
function asyncGetCourses(is_finished) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const courses = await api.getAllCourses(is_finished);
      dispatch(getCoursesActionCreator(courses));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    }
    dispatch(hideLoading());
  };
}

// Aksi asinkron untuk menambahkan kursus baru
function asyncAddCourse(formData) {
  return async (dispatch) => {
    dispatch(showLoading());
    if (!formData.has('title') || !formData.get('title').trim()) {
      dispatch(setErrorActionCreator("Title is required and cannot be empty."));
      dispatch(hideLoading());
      return;
    }
    if (!formData.has('description') || !formData.get('description').trim()) {
      dispatch(setErrorActionCreator("Description is required and cannot be empty."));
      dispatch(hideLoading());
      return;
    }
    if (!formData.has('cover')) {
      dispatch(setErrorActionCreator("Cover image is required and cannot be empty."));
      dispatch(hideLoading());
      return;
    }

    try {
      const response = await api.postAddCourse(formData);
      const data = await response.json();
      if (data.success) {
        dispatch(addCourseActionCreator(true, data.course));
        Swal.fire("Success", "Course successfully added!", "success");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
      Swal.fire("Error", error.message, "error");
    } finally {
      dispatch(hideLoading());
    }
  };
}

// Aksi asinkron untuk menghapus kursus
function asyncDeleteCourse(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.deleteCourse(id);
      dispatch(deleteCourseActionCreator(true));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    }
    dispatch(hideLoading());
  };
}

// Aksi asinkron untuk mendapatkan detail kursus
function asyncDetailCourse(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const course = await api.getDetailCourse(id);
      dispatch(detailCourseActionCreator(course));
    } catch (error) {
      dispatch(setErrorActionCreator(error.message));
    }
    dispatch(hideLoading());
  };
}

// Aksi asinkron untuk mengedit kursus
export const asyncEditCourse = ({ id, title, description, cover }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const courseId = await api.putUpdateCourse({ id, title, description, cover });
    dispatch(editCourseActionCreator(courseId));
  } catch (error) {
    dispatch(setErrorActionCreator(error.message));
  }
  dispatch(hideLoading());
};

// Aksi untuk mengedit kursus
export const editCourseActionCreator = (courseId) => ({
  type: ActionType.EDIT_COURSE,
  payload: courseId,
});

// Mengekspor semua aksi yang dibutuhkan
export {
  ActionType,
  getCoursesActionCreator,
  asyncGetCourses,
  addCourseActionCreator,
  asyncAddCourse,
  resetAddCourse,  // Pastikan resetAddCourse diekspor
  deleteCourseActionCreator,
  asyncDeleteCourse,
  detailCourseActionCreator,
  asyncDetailCourse,
};
