import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddCourse,
  addCourseActionCreator,
} from "../states/courses/action";
import CourseInput from "../components/CourseInput";
import { useNavigate } from "react-router-dom";

function CourseAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAddCourse = false } = useSelector((states) => states);

  useEffect(() => {
    if (isAddCourse) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        icon: "success",
        title: "Course successfully added!",
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/");
      dispatch(addCourseActionCreator(false));
    }
  }, [isAddCourse, navigate, dispatch]);

  const onAddCourse = ({ cover, title, description }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (cover) {
      formData.append("cover", cover); // Add the cover image
    }

    dispatch(asyncAddCourse(formData)); // Dispatch formData instead of the object
  };

  return (
    <section>
      <div className="container pt-1">
        <CourseInput onAddCourse={onAddCourse} />
      </div>
    </section>
  );
}

export default CourseAddPage;