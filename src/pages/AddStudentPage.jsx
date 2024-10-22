import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../utils/api";

function AddStudentPage() {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate(); // For navigation after adding the student
  const [studentEmail, setStudentEmail] = useState("");

  const handleAddStudent = async () => {
    try {
      await api.postAddStudent({ id, email: studentEmail }); // API call to add student
      Swal.fire("Success", "Student added successfully", "success");
      navigate(`/courses/${id}`); // Navigate back to the course detail page
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="container">
      <h1>Add Student to Course</h1>
      <div className="form-group">
        <label>Email Address of Student</label>
        <input
          type="email"
          className="form-control"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
          placeholder="Enter student's email"
        />
      </div>
      <button className="btn btn-primary mt-3" onClick={handleAddStudent}>
        Add Student
      </button>
    </div>
  );
}

export default AddStudentPage;
