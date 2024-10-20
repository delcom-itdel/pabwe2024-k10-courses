import PropTypes from "prop-types";
import CourseItem, { courseItemShape } from "./CourseItem";

function CourseList({ courses, onDeleteCourse }) {
  return (
    <div>
      {courses.map((course) => (
        <CourseItem 
          key={course.id} 
          course={course} 
          onDeleteCourse={onDeleteCourse} 
        />
      ))}
    </div>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(PropTypes.shape(courseItemShape)).isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
};

export default CourseList;
