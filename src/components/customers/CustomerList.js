import React, { useState, useEffect } from 'react';
import CustomerItem from './CustomerItem';
import { getCustomers, deleteCustomer } from '../../services/customerService';
import { Link } from 'react-router-dom';
import './CustomerList.css'; // Import the CSS file

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    setCustomers(getCustomers());
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      deleteCustomer(id);
      setCustomers(getCustomers());
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.productName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = 
      filterType === 'all' || 
      (filterType === 'installment' && customer.registrationType === 'Open') ||
      (filterType === 'full' && customer.registrationType === 'Closed');
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="customer-list-container">
      <div className="list-header">
        <h1 className="list-title">Customer Records</h1>
        <Link to="/customers/add" className="add-customer-btn">
          + Add New Customer
        </Link>
      </div>
      
      <div className="controls-section">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filter-container">
          <label className="filter-label">Filter by:</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Customers</option>
            <option value="installment">Installment Customers</option>
            <option value="full">Full Payment Customers</option>
          </select>
        </div>
      </div>
      
      {filteredCustomers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📋</div>
          <h3 className="empty-title">No customer records found</h3>
          <p className="empty-message">
            {searchTerm 
              ? "No customers match your search criteria" 
              : "You haven't added any customers yet"}
          </p>
          <Link to="/customers/add" className="empty-action-btn">
            Add Your First Customer
          </Link>
        </div>
      ) : (
        <div className="customers-grid">
          {filteredCustomers.map(customer => (
            <CustomerItem 
              key={customer.id} 
              customer={customer} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
      
      <div className="list-summary">
        Showing {filteredCustomers.length} of {customers.length} customers
      </div>
    </div>
  );
};

export default CustomerList;