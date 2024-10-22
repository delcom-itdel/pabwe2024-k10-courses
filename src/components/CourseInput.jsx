import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FaUpload } from "react-icons/fa6";
import Swal from 'sweetalert2';

function CourseInput({ onAddCourse, existingCourse }) {
  const [title, setTitle] = useState(existingCourse ? existingCourse.title : "");
  const [description, setDescription] = useState(existingCourse ? existingCourse.description : "");
  const [cover, setCover] = useState(null); // To store selected cover image
  const [previewCover, setPreviewCover] = useState(existingCourse ? existingCourse.cover : null); // To preview selected cover image

  const fileInputRef = useRef(null);

  function handleOnAddCourse(e) {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Judul dan deskripsi harus diisi.',
      });
      return;
    }

    // Pass the title, description, and cover directly to onAddCourse
    onAddCourse({
      title,
      description,
      cover,
    });
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (
      file &&
      (file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/jpg")
    ) {
      setCover(file); // Set the selected image file
      const previewURL = URL.createObjectURL(file); // Set preview URL for the image
      setPreviewCover(previewURL);
    } else {
      alert("Please select a valid image (jpeg, png, jpg).");
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  return (
    <div className="card" style={{ backgroundColor: '#295255', color: '#F0F5F7', margin:'50px'}}>
      <div className="card-body">
        <h3 className="ps-2">{existingCourse ? "Edit Course" : "Create New Course"}</h3>
        <form onSubmit={handleOnAddCourse}>
          {/* Input Judul */}
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">Judul</label>
            <input
              type="text"
              id="inputTitle"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="form-control"
              required
              style={{ backgroundColor: '#F0F5F7', borderColor: '#577877', color: '#162623' }}
            />
          </div>

          {/* Input Deskripsi */}
          <div className="mb-3">
            <label htmlFor="inputDescription" className="form-label">Deskripsi</label>
            <textarea
              rows="5"
              id="inputDescription"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              required
              style={{ backgroundColor: '#F0F5F7', borderColor: '#577877', color: '#162623' }}
            ></textarea>
          </div>

          {/* Input Gambar Cover */}
          <div className="mb-3">
            <label htmlFor="inputCover" className="form-label">Cover</label>
            <input
              type="file"
              id="inputCover"
              onChange={handleFileChange}
              className="form-control"
              accept="image/*"
              style={{ backgroundColor: '#F0F5F7', borderColor: '#577877', color: '#162623' }}
            />
            {previewCover && (
              <img src={previewCover} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
            )}
          </div>

          {/* Tombol Simpan */}
          <div className="text-end mt-3">
            <button type="submit" className="btn" style={{ backgroundColor: '#162623', color: 'white', padding:'10px'}}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

CourseInput.propTypes = {
  onAddCourse: PropTypes.func.isRequired,
  existingCourse: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string,
  }),
};

export default CourseInput;
