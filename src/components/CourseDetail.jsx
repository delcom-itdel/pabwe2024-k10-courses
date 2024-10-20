import PropTypes from "prop-types";
import { courseItemShape } from "./CourseItem"; 
import { postedAt } from "../utils/tools";
import { FaClock } from "react-icons/fa6";

function CourseDetail({ course }) {
  let badgeStatus, badgeLabel;

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
          <div className="col-12 d-flex align-items-center">
            <h5>{course.title}</h5>
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>

          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(course.created_at)}</span>
            </div>
          </div>

          <div className="col-12">
            
            <img
              src={course.cover} // Menggunakan gambar cover
              alt={course.title}
              className="img-fluid mt-3 mb-3" // Kelas untuk styling
            />
            <hr />
            <p>{course.description}</p>{" "}
            
          </div>
        </div>
      </div>
    </div>
  );
}

CourseDetail.propTypes = {
  course: PropTypes.shape(courseItemShape).isRequired, // Memastikan shape course
};

export default CourseDetail;
