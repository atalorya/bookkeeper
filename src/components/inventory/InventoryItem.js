import React from 'react';
import { Link } from 'react-router-dom';
import './InventoryItem.css';

const InventoryItem = ({ item, onDelete }) => {
  return (
    <div className="inventory-card">
      <div className="inventory-header">
        <div className="product-name">{item.name}</div>
        <div className="product-id">ID: {item.id.slice(-6)}</div>
      </div>
      
      <div className="product-description">{item.description}</div>
      
      <div className="inventory-details">
        <div className="detail-group">
          <span className="detail-label">Arrival Date:</span>
          <span className="detail-value">
            {new Date(item.arrivalDate).toLocaleDateString()}
          </span>
        </div>
        
        <div className="detail-group">
          <span className="detail-label">Quantity:</span>
          <span className={`detail-value ${parseInt(item.quantity) < 10 ? 'low-stock' : ''}`}>
            {item.quantity}
          </span>
        </div>
        
        <div className="detail-group">
          <span className="detail-label">Price:</span>
          <span className="detail-value">${parseFloat(item.price).toFixed(2)}</span>
        </div>
      </div>
      
      <div className="inventory-actions">
        <Link 
          to={`/inventory/edit/${item.id}`} 
          className="action-btn edit"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(item.id)}
          className="action-btn delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default InventoryItem;