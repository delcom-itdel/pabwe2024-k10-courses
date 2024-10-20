import PropTypes from "prop-types";
import CourseItem, { courseItemShape } from "./CourseItem"; // Impor CourseItem dan bentuk datanya

function CourseList({ courses, onDeleteCourse }) {
  return (
    <div>
      {courses.map((course) => (
        <CourseItem
          key={course.id} // Set key untuk setiap item agar React dapat membedakan
          course={course} // Berikan objek course sebagai properti ke CourseItem
          onDeleteCourse={onDeleteCourse} // Callback untuk hapus course
        />
      ))}
    </div>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape(courseItemShape)).isRequired, // Bentuk data courses menggunakan courseItemShape
  onDeleteCourse: PropTypes.func.isRequired, // onDeleteCourse wajib ada dan merupakan fungsi
};

export default CourseList;
