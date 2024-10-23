import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Mendapatkan parameter id dari URL dan navigasi setelah hapus
import api from "../utils/api"; // Asumsikan ada API untuk mengambil detail dan menghapus konten
import Swal from 'sweetalert2';

function ContentDetail() {
  const { id } = useParams(); // Mendapatkan ID konten dari URL
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Untuk navigasi setelah konten dihapus

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

  const handleDeleteContent = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.deleteContent(id); // Panggil API untuk menghapus konten
          Swal.fire('Deleted!', 'Your content has been deleted.', 'success');
          navigate('/contents'); // Navigasi kembali ke halaman daftar konten setelah dihapus
        } catch (error) {
          Swal.fire('Error', error.message || "Failed to delete content", 'error');
        }
      }
    });
  };

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

      {/* Tombol untuk menghapus konten */}
      <button className="btn btn-danger" onClick={handleDeleteContent}>
        Delete Content
      </button>
    </div>
  );
}

export default ContentDetail;
