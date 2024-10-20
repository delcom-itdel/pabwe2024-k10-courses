import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CourseList from "../components/CourseList";
import {
  asyncGetCourses,
  asyncDeleteCourse,
  deleteCourseActionCreator,
} from "../states/courses/action";

function HomePage() {
  const { courses = [], isDeleteCourse = false } = useSelector(
    (states) => states
  );
  const queryParams = new URLSearchParams(location.search);
  const is_finished = queryParams.get("is_finished") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteCourse) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Course berhasil dihapus!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(deleteCourseActionCreator(false));
    }
    dispatch(asyncGetCourses(is_finished));
  }, [dispatch, isDeleteCourse, is_finished]);

  const onDeleteCourse = (id) => {
    dispatch(asyncDeleteCourse(id));
  };

  return (
    <section>
      <div className="container pt-1">
        <CourseList
          courses={courses}
          onDeleteCourse={onDeleteCourse}
        ></CourseList>
      </div>
    </section>
  );
}
export default HomePage;
