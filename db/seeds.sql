/* Creating department names */
INSERT INTO department (department_name)
VALUES
('Sales'),
('Accounting & Finance'),
('Shipping & Receiving'),
('IT Specialists'),
('Customer Support');

/* Creating roles for the departments */
INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Assistant', 30000, 1),
('Accountant', 60000, 2),
('Warehouse Officer', 50000, 3),
('Technical Support', 45000, 4),
('Online Customer Support', 40000, 5);

/* Creating employees */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Andy', 'Nguyen', 1, 1),
('Mike', 'Trout', 2, 2),
('Mookie', 'Betts', 3, 3),
('Kevin', 'Durant', 4, 4),
('Michael', 'Jordan', 5, 5);