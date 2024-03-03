CREATE TABLE customers (
  sno SERIAL PRIMARY KEY,
  customer_name VARCHAR(255),
  age INT,
  phone VARCHAR(15),
  location VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 50 dummy records
-- (INSERT statements here)
