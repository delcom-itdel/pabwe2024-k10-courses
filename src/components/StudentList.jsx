import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi
import api from "../utils/api";
import Swal from "sweetalert2";

function StudentList() {
  const { id } = useParams(); // Mendapatkan ID kursus dari URL
  const navigate = useNavigate(); // Untuk navigasi ke halaman lain
  const [course, setCourse] = useState(null);
  const [ratings, setRatings] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [title, setTitle] = useState("");
  const [youtube, setYoutube] = useState("");
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const courseDetails = await api.getDetailCourse(id);
        setCourse(courseDetails);
        setCommentsList(courseDetails.comments || []);
        setContents(courseDetails.contents || []);
        setAverageRating(courseDetails.averageRating || 0);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch course details", error);
        setLoading(false);
      }
    }
    fetchCourseDetails();
  }, [id]);

  const handleSubmitRating = async (e) => {
    e.preventDefault();
    try {
      await api.putChangeStudentRatings({ id, ratings, comment });
      Swal.fire(
        "Success",
        "Rating and comment submitted successfully",
        "success"
      );
      setCommentsList([
        ...commentsList,
        { ratings, comment, date: new Date().toLocaleDateString() },
      ]);
      setComment("");
      setRatings(0);
    } catch (error) {
      Swal.fire("Error", "Failed to submit rating", "error");
    }
  };

  const handleSubmitContent = async (e) => {
    e.preventDefault();
    try {
      await api.postAddContent({ id, title, youtube });
      Swal.fire("Success", "Content added successfully", "success");
      setContents([...contents, { title, youtube }]);
      setTitle("");
      setYoutube("");
    } catch (error) {
      Swal.fire("Error", "Failed to add content", "error");
    }
  };

  // Fungsi untuk navigasi ke halaman detail konten
  const handleContentClick = (id) => {
    navigate(`/courses/-/contents${id}`); // Navigasi ke halaman detail konten
  };

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (!course) {
    return <p>No course details available.</p>;
  }

  return (
    <div className="container mt-4 course-page">
      <div
        className="course-container"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div
          className="course-details"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f9f9f9",
            marginRight: "20px",
          }}
        >
          <h3>{course.title}</h3>
          <p>{course.description}</p>

          <div className="contents-list mt-5">
            <h4>Course Contents</h4>
            {contents.length === 0 ? (
              <p>No contents available.</p>
            ) : (
              contents.map((content, index) => (
                <div
                  key={index}
                  className="content-item card mt-2 p-2"
                  onClick={() => handleContentClick(content.id)}
                >
                  <h5 style={{ cursor: "pointer" }}>{content.title}</h5>{" "}
                  {/* Klik judul untuk navigasi */}
                  <a
                    href={content.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch on YouTube
                  </a>
                </div>
              ))
            )}
            <form onSubmit={handleSubmitContent} className="mt-4">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter content title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>YouTube URL</label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="Enter YouTube URL"
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mt-3">
                Add New Content
              </button>
            </form>
          </div>
        </div>

        <div
          className="course-rating"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
          }}
        >
          <p>{commentsList.length} Ulasan</p>
          <form onSubmit={handleSubmitRating} className="mt-4">
            <div className="form-group">
              <label>Rating</label>
              <select
                className="form-control"
                value={ratings}
                onChange={(e) => setRatings(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-3">
              <label>Comment</label>
              <textarea
                className="form-control"
                placeholder="Input your comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>

          <div className="comments-list mt-5">
            {commentsList.length === 0 ? (
              <p>Belum ada ulasan.</p>
            ) : (
              commentsList.map((commentItem, index) => (
                <div
                  key={index}
                  className="comment-item"
                  style={{
                    marginBottom: "20px",
                    padding: "10px",
                    borderBottom: "1px solid #e0e0e0",
                  }}
                >
                  <p>
                    <strong>{commentItem.date}</strong>
                  </p>
                  <p>{commentItem.comment}</p>
                  <div
                    className="rating-stars"
                    style={{ fontSize: "18px", color: "gold" }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < commentItem.ratings ? "star filled" : "star"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentList;
