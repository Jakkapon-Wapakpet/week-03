-- Clear existing data to prevent duplication
TRUNCATE TABLE RecipeItems RESTART IDENTITY CASCADE;

-- Mock Data for RecipeItems
-- Recipe for The All-American (item_id 1)
INSERT INTO RecipeItems (item_id, ingredient_id, quantity_needed) VALUES
(1, 1, 1), -- 1 Beef Patty
(1, 3, 1), -- 1 Burger Bun
(1, 4, 0.1), -- 0.1 head of Lettuce (approx)
(1, 5, 0.5), -- 0.5 Tomato
(1, 8, 0.05); -- 0.05 liters of Special Sauce

-- Recipe for Bacon Cheeseburger (item_id 2)
INSERT INTO RecipeItems (item_id, ingredient_id, quantity_needed) VALUES
(2, 1, 1), -- 1 Beef Patty
(2, 3, 1), -- 1 Burger Bun
(2, 6, 2), -- 2 Cheese Slices
(2, 7, 3); -- 3 strips of Bacon

-- Recipe for Veggie Burger (item_id 4)
INSERT INTO RecipeItems (item_id, ingredient_id, quantity_needed) VALUES
(4, 2, 1), -- 1 Veggie Patty
(4, 3, 1), -- 1 Burger Bun
(4, 4, 0.1),
(4, 5, 0.5);
