import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { asyncDetailCourse, asyncEditCourse } from "../states/courses/action";
import CourseInput from "../components/CourseInput";

function CourseUpdatePage() {
  const { id } = useParams(); // Ambil ID dari URL
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Ambil state dari Redux store, pastikan nilai default diberikan
  const { detailCourse = {}, isLoading, error } = useSelector((state) => state.detailCourse || {}); 
  const { isEditSuccess } = useSelector((state) => state.courses || {}); 

  useEffect(() => {
    dispatch(asyncDetailCourse(id)); // Ambil detail kursus saat komponen dimuat
  }, [dispatch, id]);

  useEffect(() => {
    if (isEditSuccess) {
      navigate("/"); // Kembali ke halaman utama setelah berhasil mengedit
    }
  }, [isEditSuccess, navigate]); // Navigasi setelah sukses edit

  const onEditCourse = (formData) => {
    dispatch(asyncEditCourse({ id, ...formData })); // Memanggil fungsi edit course
  };

  if (isLoading) {
    return <div>Loading...</div>; // Tampilkan loading jika sedang memuat
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Tampilkan error jika ada
  }

  if (!detailCourse || Object.keys(detailCourse).length === 0) {
    return <div>404 Halaman Tidak Ditemukan</div>; // Tampilkan pesan jika kursus tidak ditemukan
  }

  return (
    <section>
      <div className="container pt-1">
        <h2>Update Course</h2> 
        <CourseInput onAddCourse={onEditCourse} existingCourse={detailCourse} /> {/* Menggunakan detail kursus */}
      </div>
    </section>
  );
}

export default CourseUpdatePage;
