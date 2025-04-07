// components/Admin/GallerySection.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addGalleryImage, deleteGalleryImage, updateGalleryImage } from '../../slices/gallerySlice';

const GallerySection = () => {
  const [newImageUrl, setNewImageUrl] = useState('');
  const [updateImageId, setUpdateImageId] = useState('');
  const gallery = useSelector((state) => state.gallery.images);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (newImageUrl) {
      dispatch(addGalleryImage(newImageUrl));
      setNewImageUrl('');
    }
  };

  const handleUpdate = (id) => {
    if (updateImageId) {
      dispatch(updateGalleryImage({ id, url: updateImageId }));
      setUpdateImageId('');
    }
  };

  return (
    <div>
      <h2>Gallery</h2>
      <ul>
        {gallery.map((image) => (
          <li key={image.id}>
            <img src={image.url} alt={image.alt} style={{ width: '100px', height: '100px' }} />
            <button onClick={() => dispatch(deleteGalleryImage(image.id))}>Delete</button>
            <input
              type="text"
              placeholder="New Image URL"
              value={updateImageId}
              onChange={(e) => setUpdateImageId(e.target.value)}
            />
            <button onClick={() => handleUpdate(image.id)}>Update</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newImageUrl}
          onChange={(e) => setNewImageUrl(e.target.value)}
          placeholder="New Image URL"
        />
        <button onClick={handleAdd}>Add Image</button>
      </div>
    </div>
  );
};

export default GallerySection;
