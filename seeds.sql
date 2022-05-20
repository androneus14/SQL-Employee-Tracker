/* Selecting the correct database */
USE employeeTracker_db;

/* Creating random employees */
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) 
VALUES
(1, 'Andy', 'Nguyen', '14', '1'),
(2, 'Mike', 'Trout', '27', '2'),
(3, 'Mookie', 'Betts', '50', '2'),
(4, 'Kevin', 'Durant', '7', '3'),
(5, 'Michael', 'Jordan', '23', '3'),
(6, 'Billy' 'Slater', '1', '4'),
(7, 'Tom', 'Brady', '12', '5');

/* Creating departments */
INSERT INTO department (department_id, role_id)
VALUES
('Sales', '1'),
('Accounting', '2'),
('Shipping', '3'),
('Warehouse', '4'),
('IT Specialists', '5');

/* Creating roles for the departments */
INSERT INTO roles (title, salary, department_id)
VALUES
('Sales Assistant', 30000, 1),
('Financial Accountant', 50000, 2),
('Delivery Driver', 25000, 3),
('System Assembler', 40000, 4),
('Technical Support', 45000, 5);