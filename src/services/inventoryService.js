import { saveDataToStorage, loadDataFromStorage } from './storage';

const STORAGE_KEY = 'inventory';

export const getInventory = () => loadDataFromStorage(STORAGE_KEY);

export const saveInventory = (inventory) => saveDataToStorage(STORAGE_KEY, inventory);

export const addInventoryItem = (item) => {
  const inventory = getInventory();
  const newItem = { ...item, id: Date.now().toString() };
  saveInventory([...inventory, newItem]);
  return newItem;
};

export const updateInventoryItem = (id, updatedItem) => {
  const inventory = getInventory();
  const updatedInventory = inventory.map(item => 
    item.id === id ? { ...updatedItem, id } : item
  );
  saveInventory(updatedInventory);
  return updatedInventory;
};

export const deleteInventoryItem = (id) => {
  const inventory = getInventory();
  const updatedInventory = inventory.filter(item => item.id !== id);
  saveInventory(updatedInventory);
  return updatedInventory;
};