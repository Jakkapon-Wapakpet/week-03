-- Clear existing data to prevent duplication
TRUNCATE TABLE Ingredients RESTART IDENTITY CASCADE;

-- Mock Data for Ingredients
INSERT INTO Ingredients (ingredient_id, name, stock_level, unit, supplier_id) VALUES
(1, 'Beef Patty', 200, 'units', 1),
(2, 'Veggie Patty', 100, 'units', 1),
(3, 'Burger Bun', 300, 'units', 2),
(4, 'Lettuce', 20, 'heads', 3),
(5, 'Tomato', 50, 'units', 3),
(6, 'Cheese Slice', 400, 'slices', 1),
(7, 'Bacon', 150, 'strips', 1),
(8, 'Special Sauce', 10, 'liters', 3),
(9, 'Potatoes', 100, 'kg', 3),
(10, 'Onions', 25, 'kg', 3);
