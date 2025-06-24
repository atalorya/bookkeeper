import React, { useState, useEffect } from 'react';
import InventoryItem from './InventoryItem';
import { getInventory, deleteInventoryItem } from '../../services/inventoryService';
import { Link } from 'react-router-dom';
import './InventoryList.css';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setInventory(getInventory());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      deleteInventoryItem(id);
      setInventory(getInventory());
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inventory-list-container">
      <div className="list-header">
        <h1 className="list-title">Inventory Management</h1>
        <Link to="/inventory/add" className="add-inventory-btn">
          + Add New Item
        </Link>
      </div>
      
      <div className="controls-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
      </div>
      
      {filteredInventory.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📦</div>
          <h3 className="empty-title">No inventory items found</h3>
          <p className="empty-message">
            {searchTerm 
              ? "No items match your search criteria" 
              : "You haven't added any inventory items yet"}
          </p>
          <Link to="/inventory/add" className="empty-action-btn">
            Add Your First Item
          </Link>
        </div>
      ) : (
        <div className="inventory-grid">
          {filteredInventory.map(item => (
            <InventoryItem 
              key={item.id} 
              item={item} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
      
      <div className="list-summary">
        Showing {filteredInventory.length} of {inventory.length} items
        {inventory.length > 0 && (
          <span className="total-value">
            Total Inventory Value: $
            {inventory.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0).toFixed(2)}
          </span>
        )}
      </div>
    </div>
  );
};

export default InventoryList;