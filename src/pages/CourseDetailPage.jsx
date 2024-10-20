import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseDetail from "../components/CourseDetail"; // Mengimpor komponen CourseDetail
import api from "../utils/api"; // Mengimpor API module

function CourseDetailPage() {
  const { id } = useParams();
  const [detailCourse, setDetailCourse] = useState(null); // State untuk menyimpan detail course
  const [error, setError] = useState(null); // State untuk error
  const [loading, setLoading] = useState(true); // State untuk loading indicator

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true); // Mulai loading
        // Memanggil API untuk mendapatkan detail course
        const course = await api.getDetailCourse(id);
        setDetailCourse(course); // Set detail course jika berhasil
      } catch (error) {
        setError(error.message); // Set pesan kesalahan jika gagal
      } finally {
        setLoading(false); // Selesai loading
      }
    };

    if (id) {
      fetchCourseDetail();
    }
  }, [id]);

  return (
    <section>
      <div className="container pt-1">
        {loading ? (
          <div>Loading...</div> // Tampilkan loading jika masih proses
        ) : error ? (
          <div className="alert alert-danger">{error}</div> // Tampilkan pesan kesalahan
        ) : (
          detailCourse && <CourseDetail course={detailCourse} /> // Tampilkan detail course jika data ada
        )}
      </div>
    </section>
  );
}

export default CourseDetailPage;
