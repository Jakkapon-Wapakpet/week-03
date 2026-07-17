-- Clear existing data to prevent duplication
TRUNCATE TABLE Staff RESTART IDENTITY CASCADE;

-- Mock Data for Staff
INSERT INTO Staff (staff_id, first_name, last_name, role) VALUES
(1, 'Jane', 'Doe', 'Cashier'),
(2, 'John', 'Smith', 'Cook'),
(3, 'Emily', 'Jones', 'Cashier'),
(4, 'Chris', 'Williams', 'Cook');
