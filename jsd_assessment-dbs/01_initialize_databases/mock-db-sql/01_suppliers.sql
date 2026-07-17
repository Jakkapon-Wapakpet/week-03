-- Clear existing data to prevent duplication
TRUNCATE TABLE Suppliers RESTART IDENTITY CASCADE;

-- Mock Data for Suppliers
INSERT INTO Suppliers (supplier_id, name, contact_person, phone_number) VALUES
(1, 'Patty''s Premium Meats', 'Patty Smith', '555-0101'),
(2, 'The Bun Barn', 'Brad Breadson', '555-0102'),
(3, 'Freshest Farm Produce', 'Frank Farmer', '555-0103');
