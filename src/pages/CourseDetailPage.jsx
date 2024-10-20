import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { asyncDetailCourse } from "../states/courses/action"; 
import CourseDetail from "../components/CourseDetail"; 

function CourseDetailPage() {
  const { id } = useParams();
  const { detailCourse = null } = useSelector((states) => states.courses); 
  const dispatch = useDispatch();
  const [error, setError] = useState(null); // Menambahkan state untuk error

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        await dispatch(asyncDetailCourse(id)); 
      } catch (error) {
        setError(error.message); // Simpan pesan kesalahan
      }
    };

    if (id) {
      fetchCourseDetail();
    }
  }, [id, dispatch]);

  return (
    <section>
      <div className="container pt-1">
        {error ? (
          <div className="alert alert-danger">{error}</div> // Tampilkan pesan kesalahan
        ) : detailCourse ? ( 
          <CourseDetail course={detailCourse} /> 
        ) : (
          <div>Loading...</div> // Tampilkan loading jika detailCourse belum ada
        )}
      </div>
    </section>
  );
}

export default CourseDetailPage;
