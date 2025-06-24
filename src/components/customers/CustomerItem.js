import React from 'react';
import { Link } from 'react-router-dom';
import './CustomerItem.css'; // Import the CSS file

const CustomerItem = ({ customer, onDelete }) => {
  const isInstallmentCustomer = customer.registrationType === 'Open';
  const totalPaid = isInstallmentCustomer 
    ? customer.installments.reduce((sum, i) => sum + i.amount, 0)
    : customer.productPrice;
  
  return (
    <div className="customer-card">
      <div className="customer-header">
        <div className="customer-name">
          {customer.name}
          {isInstallmentCustomer && (
            <span className="payment-badge installment">Installment</span>
          )}
          {!isInstallmentCustomer && (
            <span className="payment-badge full">Full Payment</span>
          )}
        </div>
        <div className="customer-id">ID: {customer.customerId}</div>
      </div>
      
      <div className="customer-details">
        <div className="detail-group">
          <span className="detail-label">Product:</span>
          <span className="detail-value">{customer.productName}</span>
        </div>
        
        <div className="detail-group">
          <span className="detail-label">Price:</span>
          <span className="detail-value">${parseFloat(customer.productPrice).toFixed(2)}</span>
        </div>
        
        <div className="detail-group">
          <span className="detail-label">Date:</span>
          <span className="detail-value">
            {new Date(customer.dateOfSell).toLocaleDateString()}
          </span>
        </div>
        
        {isInstallmentCustomer && (
          <>
            <div className="detail-group">
              <span className="detail-label">Paid:</span>
              <span className="detail-value">${totalPaid.toFixed(2)}</span>
            </div>
            
            <div className="detail-group">
              <span className="detail-label">Remaining:</span>
              <span className="detail-value highlight">
                ${customer.remainingAmount.toFixed(2)}
              </span>
            </div>
            
            <div className="detail-group">
              <span className="detail-label">Installments:</span>
              <span className="detail-value">
                {customer.installments.length} payments
              </span>
            </div>
          </>
        )}
      </div>
      
      <div className="customer-actions">
        <Link 
          to={`/customers/edit/${customer.id}`} 
          className="action-btn edit"
        >
          Edit
        </Link>
        
        {isInstallmentCustomer && (
          <Link 
            to={`/customers/${customer.id}/installments`} 
            className="action-btn installment"
          >
            Add Payment
          </Link>
        )}
        
        <button
          onClick={() => onDelete(customer.id)}
          className="action-btn delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default CustomerItem;