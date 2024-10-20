import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import CourseInput from '../components/CourseInput';
import { asyncAddCourse } from '../states/courses/action';

function CourseAddPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddCourse = async (formData) => {
    try {
      await dispatch(asyncAddCourse(formData));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Course successfully added!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/');  // Redirect ke homepage atau course list page setelah berhasil
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add the course.',
      });
    }
  };

  return (
    <section>
      <div className="container pt-1">
        <CourseInput onAddCourse={handleAddCourse} />
      </div>
    </section>
  );
}

export default CourseAddPage;