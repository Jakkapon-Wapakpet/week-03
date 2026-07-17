-- Clear existing data to prevent duplication
TRUNCATE TABLE OrderItems RESTART IDENTITY CASCADE;

-- Mock Data for OrderItems
-- Order 1 (total: 34.00)
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES
(1, 2, 1), -- 1 Bacon Cheeseburger (14.00)
(1, 1, 1), -- 1 All-American (12.50)
(1, 5, 1), -- 1 Classic Fries (5.00)
(1, 7, 1); -- 1 Soda (2.50)

-- Order 2 (total: 19.50)
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES
(2, 3, 1), -- 1 Aloha Burger (13.50)
(2, 6, 1); -- 1 Onion Rings (6.00)

-- Order 3 (total: 25.00)
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES
(3, 1, 2); -- 2 All-American (2 * 12.50 = 25.00)

-- Order 4 (total: 9.50)
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES
(4, 5, 1), -- 1 Classic Fries (5.00)
(4, 7, 1), -- 1 Soda (2.50)
(4, 8, 1); -- 1 Bottled Water (2.00)

-- Order 5
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (5, 4, 1), (5, 8, 1);
-- Order 6
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (6, 2, 2), (6, 5, 2);
-- Order 7
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (7, 3, 1), (7, 6, 1);
-- Order 8
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (8, 1, 4), (8, 5, 4), (8, 7, 4);
-- Order 9
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (9, 2, 1);
-- Order 10
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (10, 4, 1), (10, 6, 1);
-- Order 11
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (11, 1, 2);
-- Order 12
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (12, 3, 1), (12, 5, 1), (12, 7, 1);
-- Order 13
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (13, 2, 3), (13, 5, 3);
-- Order 14
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (14, 1, 1), (14, 8, 1);
-- Order 15
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (15, 4, 2), (15, 6, 2), (15, 7, 2);
-- Order 16
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (16, 2, 1), (16, 5, 1);
-- Order 17
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (17, 1, 1);
-- Order 18
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (18, 3, 1), (18, 7, 1);
-- Order 19
INSERT INTO OrderItems (order_id, item_id, quantity) VALUES (19, 5, 2);
