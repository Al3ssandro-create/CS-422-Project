const sqlite3 = require("sqlite3").verbose();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "distribution.sqlite");

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  }

  initialize();
  console.log("Connected to the SQLite database.");
});

const getUser = (userId) => {
  console.log("CANE DIO");
};

const salt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const initialize = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            surname TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            salt TEXT NOT NULL,
            gpa REAL NOT NULL DEFAULT 0
        )`);

    db.run(`CREATE TABLE IF NOT EXISTS friends (
            friend1 INTEGER NOT NULL,
            friend2 INTEGER NOT NULL,
            status TEXT NOT NULL,
            PRIMARY KEY (friend1, friend2)
        )`);

    db.run(`CREATE TABLE IF NOT EXISTS favCourses (
            user INTEGER NOT NULL,
            course INTEGER NOT NULL,
            PRIMARY KEY (user, course)
        )`);

    db.run(`CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            year INTEGER NOT NULL,
            semester TEXT NOT NULL,
            department TEXT NOT NULL,
            number INTEGER NOT NULL,
            name TEXT NOT NULL,
            instructor TEXT NOT NULL,
            a INTEGER NOT NULL,
            b INTEGER NOT NULL,
            c INTEGER NOT NULL,
            d INTEGER NOT NULL,
            f INTEGER NOT NULL,
            w INTEGER NOT NULL
        )`);
  });
};

const populate_user = () => {
  db.serialize(() => {
    db.run(`INSERT INTO users (name, surname, email, password, salt) VALUES
    ('Mario', 'Rossi', 'mario.rossi@uic.edu', 'password', '${salt()}'),
    ('Marco Domenico', 'Santambrogio', 'marco.santa@polimi.it', 'necstlab', '${salt()}'),
    ('User', 'Study', 'user.study@uic.edu', 'password', '${salt()}'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 'password', '${salt()}'),
    ('Bob', 'Smith', 'bob.smith@example.com', 'password', '${salt()}'),
    ('Charlie', 'Brown', 'charlie.brown@example.com', 'password', '${salt()}'),
    ('David', 'Miller', 'david.miller@example.com', 'password', '${salt()}'),
    ('Emma', 'Garcia', 'emma.garcia@example.com', 'password', '${salt()}'),
    ('Ethan', 'Davis', 'ethan.davis@example.com', 'password', '${salt()}'),
    ('Evelyn', 'Martinez', 'evelyn.martinez@example.com', 'password', '${salt()}'),
    ('Isabella', 'Moore', 'isabella.moore@example.com', 'password', '${salt()}')
    `);
  });
};

const populate_courses = () => {
  let data = null;
  try {
    const jsonString = fs.readFileSync(
      path.join(__dirname, "distribution.json"),
      "utf8"
    );
    data = JSON.parse(jsonString);
  } catch (err) {
    console.error("Error reading or parsing the file:", err);
    process.exit(1);
  }

  for (const term of data) {
    for (const course of term.courses) {
      const dist = course.distribution;

      db.run(
        `INSERT INTO courses (year, semester, department, number, name, instructor, a, b, c, d, f, w) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          term.year,
          term.semester,
          course.code,
          course.number,
          course.name,
          course.instructor,
          dist.a,
          dist.b,
          dist.c,
          dist.d,
          dist.f,
          dist.w,
        ],
        function (err) {
          if (err) {
            return console.error(err.message);
          }
          
        }
      );
    }
  }
};

module.exports = { getUser, populate_user, populate_courses };
