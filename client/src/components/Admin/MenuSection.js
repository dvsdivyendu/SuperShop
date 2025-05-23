import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './MenuSection.module.css'; // Import CSS module
import {
  fetchMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../../slices/menuSlice';

const MenuSection = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.menu);
  const [formData, setFormData] = useState({ name: '', details: '', price: '', type: '', image: null });
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [prevImage, setPrevImage] = useState(null); // Store previous image URL

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If in edit mode, only update the image if a new one is uploaded
    const updatedFormData = {
      ...formData,
      id: currentId,
      image: formData.image ? formData.image : prevImage // Use new image if provided, else retain previous image
    };

    if (editMode) {
      dispatch(updateMenuItem(updatedFormData));
      setEditMode(false);
    } else {
      dispatch(addMenuItem(formData));
    }

    // Clear the form data after submission
    setFormData({ name: '', details: '', price: '', type: '', image: null });
    setPrevImage(null); // Reset previous image
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      details: item.details,
      price: item.price,
      type: item.type,
      image: null
    });
    setPrevImage(item.image); // Set the previous image URL
    setCurrentId(item._id);
    setEditMode(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteMenuItem(id));
  };

  return (
    <div className={styles.menuSectionContainer}>
      <h2>Menu Items</h2>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="details"
          value={formData.details}
          onChange={handleChange}
          placeholder="Details"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="beer">Electronics</option>
          <option value="cocktail">Food</option>
          <option value="snack">Cloths</option>
        </select>
        
        {/* Show previous image if editing */}
        {editMode && prevImage && (
          <div className={styles.imagePreview}>
            <p>Previous Image:</p>
            <img src={prevImage} alt="Previous" className={styles.prevImage} />
          </div>
        )}

        <input type="file" name="image" onChange={handleFileChange} />
        <button type="submit">{editMode ? 'Update Item' : 'Add Item'}</button>
      </form>

      <ul className={styles.itemList}>
        {items.map(item => (
          <li key={item._id} className={styles.item}>
            <div>
              <strong>{item.name}</strong> - {item.details} - ₹{item.price}
            </div>
            <div>
              <button onClick={() => handleEdit(item)} className={styles.editButton}>Edit</button>
              <button onClick={() => handleDelete(item._id)} className={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuSection;
