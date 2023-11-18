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

const salt = () => {
  return crypto.randomBytes(16).toString("hex");
};

const initialize = () => {
  db.serialize(
    () => {
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
            from_user INTEGER NOT NULL,
            to_user INTEGER NOT NULL,
            status TEXT NOT NULL,
            PRIMARY KEY (from_user, to_user)
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

      db.run(`CREATE TABLE IF NOT EXISTS grade (
        user INTEGER NOT NULL,
        course INTEGER NOT NULL,
        grade INTEGER NOT NULL,
        PRIMARY KEY (user, course)
      )`);
    },
    (err) => {
      console.log(err.message);
    }
  );
};

const query_courses_by_instructor_name = (department, query) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT DISTINCT id, department, number, name, instructor FROM courses WHERE department = ? AND (instructor LIKE ? OR name LIKE ?)`,
      [department, `%${query}%`, `%${query}%`],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      }
    );
  });
};

const query_courses_by_instructor_name_all = (query) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT DISTINCT id, department, number, name, instructor FROM courses WHERE instructor LIKE ? OR name LIKE ?`,
      [`%${query}%`, `%${query}%`],
      (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(rows);
      }
    );
  });
};

const query_courses_by_code = (department, query) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM courses WHERE department = ? AND number LIKE ?`,
      [department, `${query}%`],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

const query_courses_by_code_all = (query) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT * FROM courses WHERE number LIKE ?`,
      [`${query}%`],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

const query_users_with_status = (userId, query) => {
  return new Promise((resolve, reject) => {
    const likeQuery = `%${query}%`;
    db.all(
      `SELECT 
          users.id, 
          users.name, 
          users.surname,
          CASE 
              WHEN friends.status IS NULL THEN 'None'
              ELSE friends.status 
          END AS friendship_status
       FROM users
       LEFT JOIN friends ON (users.id = friends.to_user AND friends.from_user = ?) OR (users.id = friends.from_user AND friends.to_user = ?)
       WHERE (users.id != ?) AND (users.name LIKE ? OR users.surname LIKE ?)`,
      [userId, userId, userId, likeQuery, likeQuery],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};


const get_user_by_email = (email) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  });
};

const get_fav_courses = (id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT courses.* FROM favCourses JOIN courses ON favCourses.course = courses.id WHERE user = ?`,
      [id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

const get_courses_by_code = (userId, course) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT courses.*, (favCourses.user IS NOT NULL) AS isFav 
       FROM courses 
       LEFT JOIN favCourses ON courses.id = favCourses.course AND favCourses.user = ? 
       WHERE courses.department = ? AND courses.number = ? 
       ORDER BY courses.year DESC, courses.semester DESC`,
      [userId, course.department, course.number],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

const add_fav_course = (id, course) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO favCourses (user, course) VALUES (?, ?)`,
      [id, course],
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

const remove_fav_course = (id, course) => {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM favCourses WHERE user = ? AND course = ?`,
      [id, course],
      (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });
};

const get_friends = (id) => {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT 'to' AS f, u.id, u.name, u.surname, status FROM friends
      JOIN users AS u ON friends.to_user = u.id
      WHERE friends.from_user = ?
      
      UNION
      
      SELECT 'from' AS f, u.id, u.name, u.surname, status FROM friends
      JOIN users AS u ON friends.from_user = u.id
      WHERE friends.to_user = ?`,
      [id],
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

const add_friend = (id1, id2) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO friends (from_user, to_user, status) VALUES (?, ?, ?)`,
      [id1, id2, "requested"],
      (err) => {
        if (err) {
          reject(err);
        }

        resolve(true);
      }
    );
  });
};

const remove_friend = (id1, id2) => {
  return new Promise((resolve, reject) => {
    db.run(
      `DELETE FROM friends WHERE (from_user = ? AND to_user = ?) OR (from_user = ? AND to_user = ?)`,
      [id1, id2, id2, id1],
      (err) => {
        if (err) {
          reject(err);
        }

        resolve(true);
      }
    );
  });
};

const accept_friend = (id1, id2) => {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE friends SET status = ? WHERE from_user = ? AND to_user = ?`,
      ["accepted", id2, id1],
      (err) => {
        if (err) {
          reject(err);
        }

        resolve(true);
      }
    );
  });
};

const all_users = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT id, email FROM users`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

const get_course_name_semester = (course) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id FROM courses WHERE department = ? AND number = ? AND semester = ? AND year = ?`,
      [course.deparment, course.number, course.semester, course.year],
      (err, row) => {
        if (err) {
          reject(err);
        }
        resolve(row);
      }
    );
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

// friends is an array of email1, email2, status
// the emails will be replace by ids once all_users is called
const populate_friends = async (friends) => {
  info = await all_users();

  for (const friend of friends) {
    const user1 = info.find((user) => user.email === friend[0]);
    const user2 = info.find((user) => user.email === friend[1]);

    db.run(
      `INSERT INTO friends (from_user, to_user, status) VALUES (?, ?, ?)`,
      [user1.id, user2.id, friend[2]],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
      }
    );
  }
};

const populate_fav_courses = async (email, courses) => {
  const user = await get_user_by_email(email);

  const fav_courses = [];

  for (const course of courses) {
    const course_id = await get_course_name_semester(course);
    fav_courses.push(course_id.id);
  }

  for (const course of fav_courses) {
    db.run(
      `INSERT INTO favCourses (user, course) VALUES (?, ?)`,
      [user.id, course],
      function (err) {
        if (err) {
          return console.error(err.message);
        }
      }
    );
  }
};

const drop_friends = () => {
  db.run(`DROP TABLE IF EXISTS friends`);
};

const drop_favCourses = () => {
  db.run(`DROP TABLE IF EXISTS favCourses`);
};

const drop_courses = () => {
  db.run(`DROP TABLE IF EXISTS courses`);
};

const drop_users = () => {
  db.run(`DROP TABLE IF EXISTS users`);
};

module.exports = {
  populate_user,
  populate_courses,
  populate_friends,
  populate_fav_courses,
  get_fav_courses,
  get_friends,
  get_user_by_email,
  drop_courses,
  drop_favCourses,
  drop_friends,
  drop_users,
  add_fav_course,
  remove_fav_course,
  add_friend,
  remove_friend,
  accept_friend,
  get_courses_by_code,
  query_courses_by_code,
  query_courses_by_code_all,
  query_courses_by_instructor_name,
  query_courses_by_instructor_name_all,
  query_users_with_status
};
