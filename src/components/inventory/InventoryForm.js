import React, { useState, useEffect } from 'react';
import './InventoryForm.css';

const InventoryForm = ({ item = null, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    arrivalDate: new Date().toISOString().split('T')[0],
    quantity: 1,
    price: 0
  });

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        arrivalDate: item.arrivalDate.split('T')[0]
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="inventory-form-container">
      <h2 className="form-header">
        {item ? 'Edit Inventory Item' : 'Add New Inventory Item'}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3 className="section-title">Product Information</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="input-label">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            
            <div className="form-group">
              <label className="input-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label className="input-label">Arrival Date</label>
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            
            <div className="form-group">
              <label className="input-label">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                className="input-field"
              />
            </div>
            
            <div className="form-group">
              <label className="input-label">Price ($)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            {item ? 'Update' : 'Add'} Inventory
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;