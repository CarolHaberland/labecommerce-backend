-- Active: 1689293496329@@127.0.0.1@3306

-- CREATE TABLE USERS
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

-- CREATE TABLE PRODUCTS
CREATE TABLE products (
    product_id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- CREATE TABLE PERCHASES
CREATE TABLE purchases (
    id TEXT PRIMARY KEY NOT NULL,
    total_price REAL NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    buyer TEXT NOT NULL,
    FOREIGN KEY (buyer) REFERENCES users (id)
);

-- CREATE TABLE PERCHASES_PRODUCTS
CREATE TABLE purchases_products (
    purchases_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchases_id) REFERENCES purchases (id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
    FOREIGN KEY (product_id) REFERENCES products (product_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- DELETE TABLE USERS APENAS COMO EXEMPLO POR ENQUANTO
DROP TABLE purchases_products;

-- INSERIR USUARIOS NA TABELA USERS
INSERT INTO users (id, name, email, password)
VALUES 
('u001','adriana', 'adriana@email.com', '123456'),
('u002','anderson', 'anderson@email.com', '134679'),
('u003','bruno', 'bruno@email.com', '220033'),
('u004','luciana', 'luciana@email.com', '10923');


-- INSERIR PRODUTOS NA TABLE PRODUCTS
INSERT INTO products (product_id, name, price, description, image_url)
VALUES
('pro001','Logitech Mouse Gamer G502 Hero', 269.99, 'Mouse Logitech gamer de ultima geração','img'),
('pro002', 'Controle Sem Fio Xbox One Preto Microsoft', 58.05, 'Controle sem Fio para Xbox One','img'),
('pro003', 'Teclado Gamer Redragon Lakshmi', 248.34,'Teclado mecanico Lakshmi', 'img'),
('pro004', 'Headset Gamer Havit HV-H2232D Rgb', 154.99, 'Experimente a adrenalina de mergulhar na cena de outra maneira!', 'img' ),
('pro005', 'Controle Dual Shock Usb Pc Dazz', 74.90, 'Controle Dual Shock para pc com entrada USB 2.0', 'img');


INSERT INTO purchases (id, buyer, total_price)
VALUES
('pur003', 'u003', 754.99);

SELECT * FROM purchases;

INSERT INTO purchases_products ( product_id, purchases_id, quantity)
VALUES ('pro005', 'pur003', 2), ('pro001', 'pur003', 1);


SELECT * FROM purchases_products;


-- CONSULTAR OS DADODS QUE ESTAO NA CONDICAO
SELECT 
    purchases.id as "ID da Compra",
    purchases.buyer as "ID do Comprador",
    users.email as "E-mail",
    purchases.created_at as "Data da Compra",
    purchases.total_price
FROM purchases
    INNER JOIN users on purchases.buyer = users.id;

SELECT * FROM products
    LEFT JOIN purchases_products ON products.product_id = purchases_products.purchases_id
    LEFT JOIN purchases ON purchases.id = purchases_products.purchases_id;

-- CREATE NEW USER
INSERT INTO users (id, name, email, password)
VALUES ('u005','mariana', 'marianaa@email.com', '54321');

--CREATE NEW PRODUCTS
INSERT INTO products (id, name, price, description, image_url)
VALUES 
('p006','Cadeira Gamer SuperFrame Godzilla', 599.00, 'Cadeira Gamer SuperFrame Godzilla, Reclinável, Preto e Branco','img');


-- EDIT USERS BY ID
UPDATE users
SET name =  "Marcos"
WHERE id = 'u002';

-- EDIT PRODUCTS BY ID
UPDATE products
SET name = 'Teclado gamer RGB', price = 300, description = 'Teclado mecânico com RGB e numpad', image_url = 'https://picsum.photos/seed/Teclado%20gamer%20RGB/400'
WHERE product_id ='pr005';


-- DELETE USERS BY ID
DELETE FROM users
WHERE id = 'u004';

-- DELETE PRODUCTS BY ID
DELETE FROM products
WHERE id = 'pro006';

-- APAGA TODOS OS REGISTROS (PERIGO)
DELETE FROM perchases;

-- GET ALL USERS
SELECT * FROM users;

-- GET ALL PRODUCTS
SELECT * FROM products;

-- FAZER BUSCAS EM ESPECIFICO
SELECT name FROM users;

-- GET ALL PRODUCTS ESPECIFICO
SELECT * FROM products
WHERE name LIKE '%Gamer%';

-- FAZER BUSCAS COM WHERE
SELECT name, price FROM products WHERE price < 100;