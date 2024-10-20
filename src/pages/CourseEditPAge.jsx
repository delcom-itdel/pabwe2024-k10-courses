import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncEditCourse, asyncDetailCourse } from "../states/courses/action"; 
import CourseInput from "../components/CourseInput"; 
import { useParams, useNavigate } from "react-router-dom";

function EditCoursePage() { 
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailCourse = null } = useSelector((states) => states.courses); 
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncDetailCourse(id)); // Mengambil detail course saat komponen dimuat
  }, [dispatch, id]);

  const onEditCourse = ({ title, description }) => { 
    dispatch(asyncEditCourse({ id, title, description })); 
    navigate("/"); // Navigasi kembali setelah mengedit
  };

  return (
    <section>
      <div className="container pt-1">
        <h2>Edit Course</h2> 
        <CourseInput onAddCourse={onEditCourse} existingCourse={detailCourse} /> 
      </div>
    </section>
  );
}

export default EditCoursePage;
