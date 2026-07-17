-- 1. Create Suppliers Table
CREATE TABLE Suppliers (
     supplier_id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
         contact_person VARCHAR(255),
         phone_number VARCHAR(20)
     );
     
-- 2. Create Staff Table
CREATE TABLE Staff (
    staff_id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50)
);
    
-- 3. Create Ingredients Table
CREATE TABLE Ingredients (
    ingredient_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    stock_level DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    unit VARCHAR(50) NOT NULL,
    supplier_id INTEGER REFERENCES Suppliers(supplier_id)
);
    
-- 4. Create MenuItems Table
CREATE TABLE MenuItems (
    item_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50)
);
    
-- 5. Create RecipeItems (Join Table)
CREATE TABLE RecipeItems (
    recipe_item_id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES MenuItems(item_id),
    ingredient_id INTEGER NOT NULL REFERENCES Ingredients(ingredient_id),
    quantity_needed DECIMAL(10, 2) NOT NULL
);
    
-- 6. Create Orders Table
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    order_date TIMESTAMP NOT NULL DEFAULT NOW(),
    total_price DECIMAL(10, 2) NOT NULL,
    staff_id INTEGER REFERENCES Staff(staff_id)
);

-- 7. Create OrderItems (Join Table)
CREATE TABLE OrderItems (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES Orders(order_id),
    item_id INTEGER NOT NULL REFERENCES MenuItems(item_id),
    quantity INTEGER NOT NULL
);