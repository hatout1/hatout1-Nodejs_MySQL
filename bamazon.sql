Drop DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
use bamazon_db;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price NUMERIC(6,2) NOT NULL,
stock_quantity INTEGER NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Appel','food',2.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Orange','food',4, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('tea','drink',1.99, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('cup','product', 6.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('laptop','cumputers', 764.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('cellphone','phones', 499.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('cat_food','pets', 10.99, 175);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('mouse','computer', 29.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('lego','toys', 24.99, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('headphones','phones', 15.99, 150);

select * from products;