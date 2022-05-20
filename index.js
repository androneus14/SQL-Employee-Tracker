// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Create the connection to the database
const connection = mysql.createConnection(
    {
        host: "localhost",
        port: 4001,
        user: "root",
        password: "etdbpw1234",
        database: "employeeTracker_db",
    },
    console.log('Connected to the employeeTracker_db database.')
);

connection.connect((err) => {
    if (err) throw err;
    promptBusinessOwner();
});

// Initial Prompt for the business owner
function promptBusinessOwner() {
    inquirer
        .prompt({
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: 
                [   
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
                    "Exit",
                ],
        })
        .then(function(choice) {
            console.log(choice);

            if (choice.selection === "View All Departments") {
                viewAllDepartments();
            } else if (choice.selection === "View All Roles") {
                viewAllRoles();
            } else if (choice.selection === "View All Employees") {
                viewAllEmployees();
            } else if (choice.selection === "Add Department") {
                addDepartment();
            } else if (choice.selection === "Add Role") {
                addRole();
            } else if (choice.selection === "Add Employee") {
                addEmployee();
            } else if (choice.selection === "Update Employee Role") {
                updateEmployeeRole();
            } else {
                connection.end();
            }
        });
}

// View All Departments Function => WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
function viewAllDepartments() {
    connection.query(
        "SELECT department.id AS id, department.name AS department FROM departments",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            // Re-promt the business owner
            promptBusinessOwner();
        }
    );
};

// View All Roles Function => WHEN I choose to view all roles THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles() {
    connection.query(
        "SELECT role.title, role.id, role.department_id, department_id, department.name FROM role LEFT JOIN department on role.department_id = department.id, role.salary",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            // Re-prompt the business owner
            promptBusinessOwner();
        }
    );
};

// View All Employees Function => WHEN I choose to view all employees THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {
    connection.query(
        "SELECT employee.id, employee.first_name,  employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
        function(err, res) {
            if(err) throw err;
            console.table(res);
            // Re-prompt the business owner
            promptBusinessOwner();
        }
    );
};

// Add Department Function => WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment () {
    inquirer
        .prompt([
            {
                type: "input",
                name: "addDeptName",
                message: "What department would you like to add?",
            },
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO department (name) VALUES (?)", [answer.addDeptName],
                function(res) {
                    console.table(res);
                    promptBusinessOwner();
                },
            );
        });
};

// Add Role Function => WHEN I choose to add a role THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleTitle",
                message: "What is the title of the role?",
            },
            {
                type: "input",
                name: "roleSalary",
                message: "What is the salary for this role?",
            },
            {
                type: "input",
                name: "departmentID",
                message: "What is the department ID for this role?",
            },
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO role (title, salary, department_id VALUES (?, ?, ?)", [answer.roleTitle, answer.roleSalary, answer.departmentID], 
                function(res) {
                    console.table(res);
                    promptBusinessOwner();
                }
            );
        });
};

// Add Employee Function => WHEN I choose to add an employee THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter the employee's first name.",
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter the employee's last name.",
            },
            {
                type: "input",
                name: "role",
                message: "What is the employee's role?",
            },
            {
                type: "input",
                name: "managerChoice",
                message: "What is their manager's name?",
            },
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.role, answer.managerChoice],
                function(res) {
                    console.table(res);
                    promptBusinessOwner();
                }
            );
        });
};

// Update Employee Function => WHEN I choose to update an employee role THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "employeeUpdateSelect",
                message: "Which employee would you like to update?",
            },
            {
                type: "input",
                name: "employeeRoleUpdate",
                message: "What is the employee's new role?",
            },
        ])
        .then(function(answer) {
            connection.query(
                "UPDATE employee SET role_id=? WHERE first_name= ?", [answer.employeeRoleUpdate, answer.employeeUpdateSelect],
                function(res) {
                    console.table(res);
                    promptBusinessOwner();
                }
            );
        });
};