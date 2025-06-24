import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import InventoryList from './components/inventory/InventoryList';
import CustomerList from './components/customers/CustomerList';
import InventoryForm from './components/inventory/InventoryForm';
import CustomerForm from './components/customers/CustomerForm';
import DataManagement from './components/DataManagement';
import { getInventory, saveInventory, addInventoryItem, updateInventoryItem } from './services/inventoryService';
import { getCustomers, saveCustomers } from './services/customerService';
import './App.css';

// Initial data setup
const initializeData = () => {
  if (!localStorage.getItem('inventory')) {
    saveInventory([]);
  }
  
  if (!localStorage.getItem('customers')) {
    saveCustomers([]);
  }
};

function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <div className="nav-container">
            <Link to="/" className="nav-logo">Bookkeeper App</Link>
            <div className="nav-links">
              <Link to="/inventory" className="nav-link">Inventory</Link>
              <Link to="/customers" className="nav-link">Customers</Link>
              <Link to="/data" className="nav-link">Data Management</Link>
            </div>
          </div>
        </nav>
        
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryList />} />
            <Route path="/inventory/add" element={<InventoryFormWrapper />} />
            <Route path="/inventory/edit/:id" element={<InventoryFormWrapper />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/add" element={<CustomerForm />} />
            <Route path="/customers/edit/:id" element={<CustomerForm />} />
            <Route path="/data" element={<DataManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Wrapper component to handle form submission logic
function InventoryFormWrapper() {
  const navigate = useNavigate();
  
  const handleSave = (formData) => {
    if (formData.id) {
      // Update existing item
      updateInventoryItem(formData.id, formData);
    } else {
      // Add new item
      addInventoryItem(formData);
    }
    navigate('/inventory');
  };

  return <InventoryForm onSave={handleSave} />;
}

function Dashboard() {
  const inventory = getInventory();
  const customers = getCustomers();
  
  return (
    <div className="dashboard">
      <div className="dashboard-summary">
        <div className="summary-card">
          <h2 className="card-title">Inventory Summary</h2>
          <p><span>Total Products:</span> <span>{inventory.length}</span></p>
          <p><span>Total Stock:</span> <span>{inventory.reduce((sum, item) => sum + parseInt(item.quantity), 0)}</span></p>
          <p><span>Total Value:</span> <span>${inventory.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0).toFixed(2)}</span></p>
          <Link to="/inventory" className="card-link">
            Manage Inventory
          </Link>
        </div>
        
        <div className="summary-card">
          <h2 className="card-title">Customer Summary</h2>
          <p><span>Total Customers:</span> <span>{customers.length}</span></p>
          <p><span>Open Accounts:</span> <span>{customers.filter(c => c.registrationType === 'Open').length}</span></p>
          <p><span>Closed Accounts:</span> <span>{customers.filter(c => c.registrationType === 'Closed').length}</span></p>
          <Link to="/customers" className="card-link">
            Manage Customers
          </Link>
        </div>
      </div>
      
      <DataManagement />
    </div>
  );
}

export default App;