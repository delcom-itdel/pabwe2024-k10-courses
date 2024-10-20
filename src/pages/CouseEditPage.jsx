import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncEditCourse, asyncDetailCourse } from "../states/courses/action"; // Ganti asyncEditTodo dan asyncDetailTodo
import CourseInput from "../components/CourseInput"; // Ganti TodoInput menjadi CourseInput
import { useParams, useNavigate } from "react-router-dom";

function EditCoursePage() {
  // Ganti nama fungsi menjadi EditCoursePage
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailCourse = null } = useSelector((states) => states.courses); // Ganti detailTodo menjadi detailCourse
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncDetailCourse(id)); // Mengambil detail course saat komponen dimuat
  }, [dispatch, id]);

  const onEditCourse = ({ title, description }) => {
    // Ganti onEditTodo menjadi onEditCourse
    dispatch(asyncEditCourse({ id, title, description })); // Ganti asyncEditTodo menjadi asyncEditCourse
    navigate("/"); // Navigasi kembali setelah mengedit
  };

  return (
    <section>
      <div className="container pt-1">
        <h2>Edit Course</h2> {/* Ganti Edit Todo menjadi Edit Course */}
        <CourseInput
          onAddCourse={onEditCourse}
          existingCourse={detailCourse}
        />{" "}
        {/* Ganti onAddTodo dan existingTodo */}
      </div>
    </section>
  );
}

export default EditCoursePage;
