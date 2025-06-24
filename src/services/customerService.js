import { saveDataToStorage, loadDataFromStorage } from './storage';

const STORAGE_KEY = 'customers';

export const getCustomers = () => loadDataFromStorage(STORAGE_KEY);

export const saveCustomers = (customers) => saveDataToStorage(STORAGE_KEY, customers);

export const addCustomer = (customer) => {
  const customers = getCustomers();
  const newCustomer = { 
    ...customer, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  
  // Calculate remaining amount for installment customers
  if (newCustomer.registrationType === 'Open' && newCustomer.installments) {
    const totalPaid = newCustomer.installments.reduce((sum, i) => sum + i.amount, 0);
    newCustomer.remainingAmount = newCustomer.productPrice - totalPaid;
  }
  
  saveCustomers([...customers, newCustomer]);
  return newCustomer;
};

export const updateCustomer = (id, updatedCustomer) => {
  const customers = getCustomers();
  const updatedCustomers = customers.map(customer => 
    customer.id === id ? { ...updatedCustomer, id } : customer
  );
  
  // Recalculate remaining amount if installments changed
  if (updatedCustomer.registrationType === 'Open' && updatedCustomer.installments) {
    const totalPaid = updatedCustomer.installments.reduce((sum, i) => sum + i.amount, 0);
    updatedCustomer.remainingAmount = updatedCustomer.productPrice - totalPaid;
  }
  
  saveCustomers(updatedCustomers);
  return updatedCustomers;
};

export const deleteCustomer = (id) => {
  const customers = getCustomers();
  const updatedCustomers = customers.filter(customer => customer.id !== id);
  saveCustomers(updatedCustomers);
  return updatedCustomers;
};

export const addInstallment = (customerId, installment) => {
  const customers = getCustomers();
  const customer = customers.find(c => c.id === customerId);
  
  if (!customer || customer.registrationType !== 'Open') return;
  
  const newInstallment = { ...installment, id: Date.now().toString() };
  const updatedInstallments = [...(customer.installments || []), newInstallment];
  
  const totalPaid = updatedInstallments.reduce((sum, i) => sum + i.amount, 0);
  const remainingAmount = customer.productPrice - totalPaid;
  
  const updatedCustomer = {
    ...customer,
    installments: updatedInstallments,
    remainingAmount
  };
  
  return updateCustomer(customerId, updatedCustomer);
};