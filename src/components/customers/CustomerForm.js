import React, { useState, useEffect } from 'react';
import { addCustomer, updateCustomer, getCustomers } from '../../services/customerService';

const CustomerForm = ({ customer = null, onSave }) => {
  const [registrationType, setRegistrationType] = useState(customer?.registrationType || 'Closed');
  const [installments, setInstallments] = useState(customer?.installments || []);
  const [installmentDate, setInstallmentDate] = useState('');
  const [installmentAmount, setInstallmentAmount] = useState('');
  
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    fatherName: customer?.fatherName || '',
    customerId: customer?.customerId || '',
    phone: customer?.phone || '',
    address: customer?.address || '',
    productName: customer?.productName || '',
    productDescription: customer?.productDescription || '',
    productPrice: customer?.productPrice || 0,
    quantity: customer?.quantity || 1,
    dateOfSell: customer?.dateOfSell || new Date().toISOString().split('T')[0],
    sellerName: customer?.sellerName || '',
    registrationType: registrationType,
    installments: installments,
    remainingAmount: customer?.remainingAmount || 0
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        ...customer,
        dateOfSell: customer.dateOfSell.split('T')[0]
      });
      setRegistrationType(customer.registrationType);
      setInstallments(customer.installments || []);
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = (type) => {
    setRegistrationType(type);
    setFormData({ ...formData, registrationType: type });
  };

  const addInstallment = () => {
    if (!installmentDate || !installmentAmount) return;
    
    const newInstallment = {
      date: installmentDate,
      amount: parseFloat(installmentAmount)
    };
    
    const updatedInstallments = [...installments, newInstallment];
    setInstallments(updatedInstallments);
    
    // Reset fields
    setInstallmentDate('');
    setInstallmentAmount('');
  };

  const removeInstallment = (index) => {
    const updated = installments.filter((_, i) => i !== index);
    setInstallments(updated);
  };

  const calculateRemaining = () => {
    const totalPaid = installments.reduce((sum, i) => sum + i.amount, 0);
    return formData.productPrice - totalPaid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const customerData = {
      ...formData,
      installments,
      remainingAmount: registrationType === 'Open' ? calculateRemaining() : 0
    };
    
    if (customer) {
      await updateCustomer(customer.id, customerData);
    } else {
      await addCustomer(customerData);
    }
    
    onSave();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Form fields implementation as previously described */}
      {/* ... */}
    </form>
  );
};

export default CustomerForm;