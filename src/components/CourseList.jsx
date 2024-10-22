import PropTypes from "prop-types";
import CourseItem, { courseItemShape } from "./CourseItem";

function CourseList({ courses, onDeleteCourse }) {
  return (
    <div className="container">
      <div className="row"> {/* Baris untuk grid system */}
        {courses.map((course) => (
          <CourseItem key={course.id} course={course} onDeleteCourse={onDeleteCourse} />
        ))}
      </div>
    </div>
  );
  
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape(courseItemShape)).isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
};

export default CourseList;