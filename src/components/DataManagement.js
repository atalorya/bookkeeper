import React from 'react';
import { exportAsJSON, importFromJSON } from '../services/storage';
import { getInventory, saveInventory } from '../services/inventoryService';
import { getCustomers, saveCustomers } from '../services/customerService';
import './DataManagement.css'; // Import the CSS file

const DataManagement = () => {
  const handleExport = () => {
    exportAsJSON(getInventory(), 'inventory.json');
    exportAsJSON(getCustomers(), 'customers.json');
    alert('Data exported successfully!');
  };

  const handleImportInventory = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromJSON(file, (data) => {
        saveInventory(data);
        alert('Inventory imported successfully!');
        window.location.reload();
      });
    }
  };

  const handleImportCustomers = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromJSON(file, (data) => {
        saveCustomers(data);
        alert('Customers imported successfully!');
        window.location.reload();
      });
    }
  };

  return (
    <div className="data-management-container">
      <h2 className="data-header">Data Management</h2>
      
      <div className="data-actions">
        <div className="export-section">
          <button
            onClick={handleExport}
            className="export-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Export All Data
          </button>
        </div>
        
        <div className="import-section">
          <div className="import-group">
            <label className="import-label">Import Inventory Data</label>
            <div className="import-file">
              <label className="file-input">
                <span className="file-name">Select inventory.json file</span>
                <span className="file-button">Choose File</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportInventory}
                  className="hidden-input"
                />
              </label>
            </div>
          </div>
          
          <div className="import-group">
            <label className="import-label">Import Customers Data</label>
            <div className="import-file">
              <label className="file-input">
                <span className="file-name">Select customers.json file</span>
                <span className="file-button">Choose File</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportCustomers}
                  className="hidden-input"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;