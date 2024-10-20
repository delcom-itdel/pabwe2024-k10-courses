import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { postedAt } from "../utils/tools";
import { FaClock, FaTrash, FaPen } from "react-icons/fa6"; 
import Swal from 'sweetalert2'; 

function CourseItem({ course, onDeleteCourse }) {
  let badgeStatus, badgeLabel;
  const navigate = useNavigate(); 

  if (course.is_finished) {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Selesai";
  } else {
    badgeStatus = "badge bg-warning text-dark ms-3";
    badgeLabel = "Belum Selesai";
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-8 d-flex">
            {/* Menampilkan gambar cover course */}
            <img
              src={course.cover} // Gambar cover
              alt={course.title}
              className="img-fluid me-3"
              style={{ width: "100px", height: "auto", objectFit: "cover" }} // Gaya untuk gambar
            />
            <h5>
              <Link to={`/courses/${course.id}`} className="text-primary">
                {course.title}
              </Link>
            </h5>
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>

          <div className="col-4 text-end">
            {/* Tombol Edit */}
            <button
              type="button"
              className="btn btn-sm btn-outline-primary me-2"
              onClick={() => navigate(`/courses/${course.id}/edit`)} // Menavigasi ke halaman edit
            >
              <FaPen /> Edit
            </button>

            {/* Tombol Hapus */}
            <button
              type="button"
              onClick={() => {
                Swal.fire({
                  title: "Hapus Course",
                  text: `Apakah kamu yakin ingin mehapus course: ${course.title}?`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonText: "Ya, Tetap Hapus",
                  customClass: {
                    confirmButton: "btn btn-danger me-3 mb-4",
                    cancelButton: "btn btn-secondary me-3 mb-4",
                  },
                  buttonsStyling: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    onDeleteCourse(course.id);
                  }
                });
              }}
              className="btn btn-sm btn-outline-danger"
            >
              <FaTrash /> Hapus
            </button>
          </div>

          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(course.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const courseItemShape = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  is_finished: PropTypes.number.isRequired,
  cover: PropTypes.string, // Menambahkan properti cover
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
};

CourseItem.propTypes = {
  course: PropTypes.shape(courseItemShape).isRequired,
  onDeleteCourse: PropTypes.func.isRequired,
};

export { courseItemShape };
export default CourseItem;
