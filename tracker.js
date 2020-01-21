//set up require/connections
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var util = require('util');
var dept = [];
var managers = [];
var roleIds = [];

var connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 3306,
    // username
    user: "root",
    // your password
    password: "yourRootPassword",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");
    start();
});

// set up prompt, run desired function
connection.query = util.promisify(connection.query)
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["Add Department", "Add Roles", "Add Employee", "View Departments", "View Roles", "View Employees",  "Exit"]
        })
        .then(function (answer) {
            if (answer.action === "Add Department") {
                addDepartment();
            }
            else if (answer.action === "Add Roles") {
                addRoles();
            }
            else if (answer.action === "Add Employee") {
                addEmployee();
            }
            else if (answer.action === "View Departments") {
                viewDepartment();
            }
            else if (answer.action === "View Roles") {
                viewRoles();
            }
            else if (answer.action === "View Employees") {
                viewEmployees();
            }
            else {
                connection.end();
            }
        });
}
// add department to DB
function addDepartment() {
    inquirer
        .prompt([
            {
                name: "addingdept",
                type: "input",
                message: "What department would like to add?"
            }

        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO departments SET ?",
                {
                    dept_name: answer.addingdept
                },
                function (err) {
                    if (err) throw err;
                    console.log("Department added");
                    start();
                }
            );
        });
}
// add roles to DB
function deptList() {
    return connection.query("SELECT id, dept_name FROM departments");
}
async function addRoles() {
    const dep = await deptList();
    const depChoices = dep.map(({ id, dept_name }) => ({
        name: dept_name,
        value: id
    }))


    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the role you're adding?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for the role you're adding?"
            },
            {
                name: "department",
                type: "list",
                message: "what department is this role in",
                choices: depChoices
            }
        ])
        .then(function (answer) {
            connection.query(

                "INSERT INTO roles SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("Role added");
                    start();
                }
            );
        });
}
// add employee to DB
function roleList() {
    return connection.query("SELECT id, title FROM roles");
}
function mgrList() {
    return connection.query("SELECT id, first_name, last_name FROM employees");
}

async function addEmployee() {
    const rol = await roleList();
    const roleChoices = rol.map(({ id, title }) => ({
        name: title,
        value: id
    }));
    const mgr = await mgrList();
    const mgrChoices = mgr.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }))
    inquirer
        .prompt([
            {
                name: "firstname",
                type: "input",
                message: "What is the employee's first name?"
            },
            {
                name: "lastname",
                type: "input",
                message: "What is the employee's last name?"
            },
            {
               
                name: "roleid",
                type: "list",
                message: "What is their role?",
                choices: roleChoices
            },
            {
                name: "managerid",
                type: "list",
                message: "Who is their manager?",
                choices: mgrChoices
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employees SET ?",
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: answer.roleid,
                    manager_id: answer.managerid,
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added");
                    start();
                }
            );
        });
}

function viewDepartment() {
    console.log("here here")
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res)
        start();
    });
};

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res)
        start();
    });
};

function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res)
        start();
    });
};

function empList() {
    return connection.query("SELECT id, first_name, last_name FROM employees");
}