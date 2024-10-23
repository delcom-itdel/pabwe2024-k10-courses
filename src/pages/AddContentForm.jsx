import React, { useState } from 'react';
import api from '../utils/api';
import Swal from 'sweetalert2';

function AddContentForm({ courseId, onContentAdded }) {
  const [title, setTitle] = useState('');
  const [youtube, setYoutube] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contentId = await api.postAddContent({ id: courseId, title, youtube });
      Swal.fire('Success', 'Content added successfully', 'success');
      onContentAdded(title, youtube, contentId); // Callback to update parent component
      setTitle('');
      setYoutube('');
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-content-form">
      <div className="form-group">
        <label htmlFor="title">Ti tle</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="youtube">YouTube URL</label>
        <input
          type="url"
          className="form-control"
          id="youtube"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Content</button>
    </form>
  );
}

export default AddContentForm;
