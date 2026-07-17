-- Clear existing data to prevent duplication
TRUNCATE TABLE MenuItems RESTART IDENTITY CASCADE;

-- Mock Data for MenuItems
INSERT INTO MenuItems (item_id, name, description, price, category) VALUES
(1, 'The All-American', 'A classic beef burger with lettuce, tomato, and our special sauce.', 12.50, 'Burger'),
(2, 'Bacon Cheeseburger', 'Our classic burger topped with crispy bacon and melted cheese.', 14.00, 'Burger'),
(3, 'The Aloha Burger', 'A beef burger with a tropical twist, featuring grilled pineapple.', 13.50, 'Burger'),
(4, 'Veggie Burger', 'A delicious plant-based patty with all the fixings.', 11.50, 'Burger'),
(5, 'Classic Fries', 'Golden and crispy french fries.', 5.00, 'Side'),
(6, 'Onion Rings', 'Battered and fried to perfection.', 6.00, 'Side'),
(7, 'Soda', 'Choose from a variety of classic sodas.', 2.50, 'Drink'),
(8, 'Bottled Water', 'Pure and simple.', 2.00, 'Drink');
