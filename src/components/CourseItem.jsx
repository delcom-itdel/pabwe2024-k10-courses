import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { postedAt } from "../utils/tools";
import { FaClock, FaTrash, FaPen, FaUserPlus } from "react-icons/fa6";
import Swal from "sweetalert2";

const courseItemShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cover: PropTypes.string,
  description: PropTypes.string,
  created_at: PropTypes.string.isRequired,
};



function CourseItem({ course, onDeleteCourse }) {
  const navigate = useNavigate(); // Gunakan useNavigate untuk navigasi

  const handleAccessCourse = async () => {
    try {
      //const response = await api.postAddStudent({ id: course.id });
      navigate(`/courses/${course.id}/students`);
    } catch (error) {
      Swal.fire("Error", "Failed to access the course.", "error");
    }
  };


  const handleAddStudentClick = () => {
    navigate(`/courses/${course.id}/add-student`); // Navigasi ke halaman add student
  };

  return (
    <div className="col-md-3">
      {" "}
      {/* Gunakan grid system Bootstrap */}
      <div className="card mt-3 shadow-sm">
        <img
          src={course.cover || "https://via.placeholder.com/400x200"} // Fallback jika tidak ada cover
          alt={course.title}
          className="card-img-top"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h5 className="card-title">
            <Link to={`/courses/${course.id}`} className="text-primary">
              {course.title}
            </Link>
          </h5>
          <p className="card-text">{course.description}</p>
          <p className="text-muted">
            <FaClock /> Posted on: {postedAt(course.created_at)}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => {
              Swal.fire({
                title: "Hapus Course",
                text: `Apakah kamu yakin ingin mehapus course: ${course.title}?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Ya, Tetap Hapus",
              }).then((result) => {
                if (result.isConfirmed) {
                  onDeleteCourse(course.id);
                }
              });
            }}
          >
            <FaTrash /> Hapus
          </button>
          <button
            type="button"
            className="btn btn-sm btn-outline-primary"
            onClick={handleAddStudentClick}
          >
            <FaUserPlus /> Add Student
          </button>

          <button
            type="button"
            className="btn btn-sm btn-outline-success ms-2"
            onClick={handleAccessCourse}
          >
            <FaUserPlus /> Access
          </button>
        </div>
      </div>
    </div>
  );
}

CourseItem.propTypes = {
  course: PropTypes.shape(courseItemShape).isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
};

export { courseItemShape };
export default CourseItem;
