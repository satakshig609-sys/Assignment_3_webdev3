// Run: npm run seed  -> inserts 12 sample products (clears existing ones)
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const data = [
  { name: 'Study Table', sku: 'FURN-TB-812', category: 'Furniture', price: 3999, quantity: 2, reorderLevel: 4, supplier: 'IKEA India' },
  { name: 'Office Chair', sku: 'FURN-CH-204', category: 'Furniture', price: 5499, quantity: 15, reorderLevel: 5, supplier: 'Godrej Interio' },
  { name: 'Laptop 15 inch', sku: 'ELEC-LP-101', category: 'Electronics', price: 54999, quantity: 3, reorderLevel: 5, supplier: 'Dell India' },
  { name: 'Wireless Mouse', sku: 'ELEC-MS-102', category: 'Electronics', price: 799, quantity: 40, reorderLevel: 10, supplier: 'Logitech' },
  { name: 'Bluetooth Headphones', sku: 'ELEC-HP-103', category: 'Electronics', price: 2499, quantity: 50, reorderLevel: 15, supplier: 'boAt' },
  { name: 'Smartphone', sku: 'ELEC-SP-104', category: 'Electronics', price: 18999, quantity: 3, reorderLevel: 5, supplier: 'Samsung India' },
  { name: 'Cotton T-Shirt', sku: 'APRL-TS-301', category: 'Apparel', price: 499, quantity: 60, reorderLevel: 20, supplier: 'Allen Solly' },
  { name: 'Denim Jeans', sku: 'APRL-JN-302', category: 'Apparel', price: 2299, quantity: 18, reorderLevel: 10, supplier: "Levi's" },
  { name: 'Notebook A4 (Pack of 5)', sku: 'STNY-NB-701', category: 'Stationery', price: 250, quantity: 8, reorderLevel: 15, supplier: 'Classmate' },
  { name: 'Gel Pen Pack of 15', sku: 'STNY-PN-713', category: 'Stationery', price: 120, quantity: 40, reorderLevel: 20, supplier: 'Cello Pens' },
  { name: 'Rice 5kg', sku: 'GROC-RC-901', category: 'Grocery', price: 450, quantity: 30, reorderLevel: 10, supplier: 'India Gate' },
  { name: 'Olive Oil 1L', sku: 'GROC-OL-902', category: 'Grocery', price: 899, quantity: 6, reorderLevel: 8, supplier: 'Figaro' },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(data);
    console.log(`Seeded ${data.length} products`);
  } catch (e) {
    console.error(e.message);
  } finally {
    await mongoose.disconnect();
  }
})();
