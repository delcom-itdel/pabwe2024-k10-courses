import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function CourseInput({ onAddCourse, existingCourse }) {
  const [title, setTitle] = useState(
    existingCourse ? existingCourse.title : ""
  );
  const [description, setDescription] = useState(
    existingCourse ? existingCourse.description : ""
  );
  const [cover, setCover] = useState(null); // State untuk file cover

  // Memuat ulang data course saat komponen dimount atau existingCourse berubah
  useEffect(() => {
    if (existingCourse) {
      setTitle(existingCourse.title);
      setDescription(existingCourse.description);
      setCover(null); // Reset cover hanya ketika ada existingCourse 
    }
  }, [existingCourse]);

  // Fungsi untuk menangani pengiriman form
  function handleOnAddCourse(e) {
    e.preventDefault();

    // Validasi input title, description, dan cover
    if (title.trim() && description.trim() && cover) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("cover", cover); // Sertakan file cover dalam formData

      onAddCourse(formData); // Mengirim formData termasuk file cover
    } else {
      alert("Semua field (judul, deskripsi, cover) wajib diisi."); // Validasi input
    }
  }

  // Fungsi untuk menangani perubahan file cover
  function handleFileChange(e) {
    const file = e.target.files[0];

    if (file) {
      // Validasi tipe file
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        alert(
          "Tipe file tidak valid. Hanya mendukung file gambar (JPEG, PNG, GIF)."
        );
        return;
      }

      setCover(file); // Set file cover yang dipilih jika valid
    }
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">
          {existingCourse ? "Edit Course" : "Buat Course"}
        </h3>
        <hr />
        <form onSubmit={handleOnAddCourse}>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">
              Judul
            </label>
            <input
              type="text"
              id="inputTitle"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputBody" className="form-label">
              Deskripsi
            </label>
            <textarea
              rows="5"
              id="inputBody"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="inputCover" className="form-label">
              Cover
            </label>
            <input
              type="file"
              id="inputCover"
              onChange={handleFileChange}
              className="form-control"
              accept="image/*" // Hanya file gambar yang diperbolehkan
              required // Wajib mengunggah cover
            />
          </div>
          <div className="mb-4 text-end mt-3">
            <button type="submit" className="btn btn-primary">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CourseInput.propTypes = {
  onAddCourse: PropTypes.func.isRequired, // Fungsi onAddCourse wajib ada
  existingCourse: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }), // existingCourse opsional tapi jika ada harus memiliki title dan description
};

export default CourseInput;
