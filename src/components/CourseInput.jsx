import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function CourseInput({ onAddCourse, existingCourse }) {
  const [title, setTitle] = useState(
    existingCourse ? existingCourse.title : ""
  );
  const [description, setDescription] = useState(
    existingCourse ? existingCourse.description : ""
  );
  const [cover, setCover] = useState(null); 

  useEffect(() => {
    if (existingCourse) {
      setTitle(existingCourse.title);
      setDescription(existingCourse.description);
      setCover(null); 
    }
  }, [existingCourse]);

  function handleOnAddCourse(e) {
    e.preventDefault();
    if (title.trim() && description.trim() && cover) {
   
      onAddCourse({
        title,
        description,
        cover,
      });
    } else {
      alert("All fields (title, description, cover) are required."); 
    }
  }

  function handleFileChange(e) {
    setCover(e.target.files[0]); 
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
              accept="image/*" 
              required 
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
  onAddCourse: PropTypes.func.isRequired,
  existingCourse: PropTypes.object,
};

export default CourseInput;
