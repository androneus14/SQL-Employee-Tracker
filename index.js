// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

// Create the connection to the database
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employeeTracker_db",
    },
);

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    connectionSuccessful();
});

// Function to show welcome message and to initialise the first prompt
function connectionSuccessful() {
    console.log("***********************************")
    console.log("*                                 *")
    console.log("*            WELCOME!             *")
    console.log("*                                 *")
    console.log("***********************************")
    
    promptBusinessOwner();
};

// Initial Prompt for the business owner
function promptBusinessOwner() {
    inquirer
        .prompt({
            type: "list",
            name: "choices",
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
        }).then(userInput => {
            switch(userInput.choices) {
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    connection.end()
                    break;
            }
        });
};

// View All Departments Function => WHEN I choose to view all departments THEN I am presented with a formatted table showing department names and department ids
function viewAllDepartments() {
    connection.query(
        "SELECT * FROM department",
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
        "SELECT * FROM roles",
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
        "SELECT * FROM employee",
        function(err, res) {
            if (err) throw err;
            console.table(res);
            // Re-prompt the business owner
            promptBusinessOwner();
        }
    );
};

// Add Department Function => WHEN I choose to add a department THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
    inquirer
      .prompt({
        type: "input",
        message: "Enter the name of the new department",
        name: "addDepartment"
      })
      .then(function (res) {
        const newDept = res.addDepartment;
        const query = `INSERT INTO department (department_name) VALUES ("${newDept}")`;
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.table(res);
          promptBusinessOwner();
        });
      });
  }

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
        .then(function (res) {
            const query = `INSERT INTO roles (title, salary, department_id) VALUES (?)`;
            connection.query(query, [[res.roleTitle, res.roleSalary, res.departmentID]], function (err, res) {
                if (err) throw err;
                console.table(res);
                promptBusinessOwner();
            });
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
                name: "manager_id",
                message: "What is their manager's ID?",
            },
        ])
        .then(function(res) {
            const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`;
            connection.query(query, [[res.firstName, res.lastName, res.role, res.manager_id]], function (err, res) {
                if (err) throw err;
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
        .then(function(res) {
            const query = `UPDATE EMPLOYEE SET ? WHERE ?? = ?;`;
            connection.query(query, [
                {role_id: res. role.id},
                "id",
                res.id
            ], function(err, res) {
                if (err) throw err;
            })
        })
};