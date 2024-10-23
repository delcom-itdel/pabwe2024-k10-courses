import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Mendapatkan parameter id dari URL
import api from "../utils/api"; // Asumsikan ada API untuk mengambil detail konten
import Swal from 'sweetalert2';

function ContentDetail() {
  const { id } = useParams(); // Mendapatkan ID konten dari URL
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContentDetail() {
      try {
        const contentDetail = await api.getDetailContent(id);
        setContent(contentDetail);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch content details", error);
        Swal.fire("Error", error.message || "Failed to load content details", "error");
        setLoading(false);
      }
    }
    fetchContentDetail();
  }, [id]);

  if (loading) {
    return <p>Loading content details...</p>;
  }

  if (!content) {
    return <p>No content details available.</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{content.title}</h2> {/* Menampilkan judul konten */}
      <p>
        <a href={content.youtube} target="_blank" rel="noopener noreferrer">
          Watch on YouTube
        </a>
      </p> {/* Menampilkan link YouTube */}
    </div>
  );
}

export default ContentDetail;
