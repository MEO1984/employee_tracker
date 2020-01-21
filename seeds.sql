  
INSERT INTO departments(dept_name) VALUES ("Administration");
INSERT INTO departments(dept_name) VALUES ("Sales");
INSERT INTO departments(dept_name) VALUES ("Financial");
INSERT INTO departments(dept_name) VALUES ("Creative");

INSERT INTO roles ( title, salary, department_id)
    VALUES ('CEO', 250000, 1),
    ('Admin Assistant', 40000, 1),
    ('Sales Person', 50000, 2),
    ('Lead Specialist', 60000, 2),
    ('Accountant', 80000, 3),
    ('Comptroller', 100000, 3),
    ('Web Designer', 80000, 4);

INSERT INTO employees ( first_name, last_name, role_id, manager_id)
    VALUES 
        ('Sterling', 'Archer', 1, NULL),
        ('Cyril','Figgis', 3, 1),
        ('Mallory', 'Archer', 4, NULL),
        ('Lana', 'Kane', 2, 3);