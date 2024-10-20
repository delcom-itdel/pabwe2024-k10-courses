import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncAddCourse,
  addCourseActionCreator,
} from "../states/courses/action";
import CourseInput from "../components/CourseInput";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 

function CourseAddPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAddCourse = false } = useSelector((states) => states.courses); 

  useEffect(() => {
    if (isAddCourse) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Course berhasil ditambahkan!", // Ubah pesan untuk course
        showConfirmButton: false,
        timer: 700,
      });
      navigate("/"); 
      dispatch(addCourseActionCreator(false)); 
    }
  }, [isAddCourse, navigate, dispatch]);

  const onAddCourse = ({ title, description, cover }) => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("cover", cover);
    dispatch(asyncAddCourse(formData));
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
