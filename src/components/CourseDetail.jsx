import PropTypes from "prop-types";
import { courseItemShape } from "./CourseItem"; // Mengimpor shape yang sesuai
import { postedAt } from "../utils/tools"; // Fungsi untuk menampilkan waktu
import { FaClock } from "react-icons/fa6"; // Ikon untuk jam

function CourseDetail({ course }) {
  let badgeStatus, badgeLabel;

  // Menentukan status badge berdasarkan apakah course selesai atau belum
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
            <h5>{course.title}</h5> {/* Menampilkan judul course */}
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>{" "}
              {/* Status course */}
            </div>
          </div>

          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock /> {/* Ikon jam */}
              <span className="ps-2">{postedAt(course.created_at)}</span>{" "}
              {/* Tanggal posting */}
            </div>
          </div>

          <div className="col-12">
            {/* Menampilkan gambar cover course */}
            <img
              src={course.cover} // Menggunakan gambar cover
              alt={course.title}
              className="img-fluid mt-3 mb-3" // Kelas untuk styling
            />
            <hr />
            <p>{course.description}</p> {/* Menampilkan deskripsi course */}
          </div>
        </div>
      </div>
    </div>
  );
}

CourseDetail.propTypes = {
  course: PropTypes.shape(courseItemShape).isRequired, // Memastikan shape course sesuai dengan courseItemShape
};

export default CourseDetail;
