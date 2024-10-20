import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

function CourseInput({ onAddCourse, existingCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null); // Untuk preview image

  useEffect(() => {
    if (existingCourse) {
      setTitle(existingCourse.title);
      setDescription(existingCourse.description);
      setPreview(existingCourse.cover); // Tampilkan cover yang ada
    } else {
      setTitle('');
      setDescription('');
      setCover(null);
      setPreview(null);
    }
  }, [existingCourse]);

  const handleOnAddCourse = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Title and description are required.',
      });
      return;
    }
    if (!existingCourse && !cover) { // Jika ini kursus baru, cover diperlukan
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cover is required for new courses.',
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (cover) {
      formData.append('cover', cover); // Tambahkan cover hanya jika ada
    }
  
    onAddCourse(formData);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCover(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0])); // Set preview of new cover
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="ps-2">
          {existingCourse ? "Edit Course" : "Create New Course"}
        </h3>
        <hr />
        <form onSubmit={handleOnAddCourse}>
          <div className="mb-3">
            <label htmlFor="inputTitle" className="form-label">Judul</label>
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
            <label htmlFor="inputDescription" className="form-label">Deskripsi</label>
            <textarea
              rows="5"
              id="inputDescription"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="inputCover" className="form-label">Cover</label>
            <input
              type="file"
              id="inputCover"
              onChange={handleFileChange}
              className="form-control"
              accept="image/*"
              required={!existingCourse}
            />
            {preview && (
              <img src={preview} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
            )}
          </div>
          <div className="text-end mt-3">
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
  onAddCourse: PropTypes.func.isRequired,
  existingCourse: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    cover: PropTypes.string
  }),
};

export default CourseInput;