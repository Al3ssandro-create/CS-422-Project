const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const {
  get_fav_courses,
  get_friends,
  get_user_by_email,
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
  query_users_with_status,
  get_courses_by_code_instructor,
  add_grade,
  get_user_grades,
  modify_grade,
  delete_grade,
} = require("./db/db");

function isNumberAndNotStartingWithZero(str) {
  return /^[1-9]\d*$/.test(str);
}

const PORT = process.env.PORT || 8080;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));
app.use(cors());

// All other routes should redirect to the index.html in 'dist'
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.get("/api/user/:email", async (req, res) => {
  const user = await get_user_by_email(req.params.email);
  res.json(user);
});

app.get("/api/user/:id/fav_courses", async (req, res) => {
  const fav_courses = await get_fav_courses(req.params.id);
  res.json(fav_courses);
});

app.get("/api/user/:user/grades", async (req, res) => {
  const grades = await get_user_grades(req.params.user);
  res.json(grades);
});

app.post("/api/user/:user/grades/:courseId/:grade", async (req, res) => {
  const grades = await add_grade(req.params.user, req.params.courseId, req.params.grade);
  res.json(grades);
});

app.put("/api/user/:user/grades/:courseId/:grade", async (req, res) => {
  const grades = await modify_grade(req.params.user, req.params.courseId, req.params.grade);
  res.json(grades);
});

app.delete("/api/user/:user/grades/:courseId", async (req, res) => {
  const grades = await delete_grade(req.params.user, req.params.courseId);
  res.json(grades);
});

app.get("/api/courses/:id/:department/:number", async (req, res) => {
  const course = await get_courses_by_code(req.params.id, {
    department: req.params.department,
    number: req.params.number,
  });

  res.json(course);
});

app.get(
  "/api/courses/:id/:department/:number/:instructor",
  async (req, res) => {
    const course = await get_courses_by_code_instructor(req.params.id, {
      department: req.params.department,
      number: req.params.number,
      instructor: req.params.instructor,
    });

    res.json(course);
  }
);

app.post("/api/user/:id/fav_courses/:courseId", async (req, res) => {

  const course = await add_fav_course(req.params.id, req.params.courseId);
  res.json(course);
});

app.delete("/api/user/:id/fav_courses/:courseId", async (req, res) => {

  const course = await remove_fav_course(req.params.id, req.params.courseId);
  res.json(course);
});

app.get("/api/user/:id/friends", async (req, res) => {
  const friends = await get_friends(req.params.id);
  res.json(friends);
});

app.post("/api/user/:id/friends/:friendId", async (req, res) => {
  const friend = await add_friend(req.params.id, req.params.friendId);
  res.json(friend);
});

app.delete("/api/user/:id/friends/:friendId", async (req, res) => {
  const friend = await remove_friend(req.params.id, req.params.friendId);
  res.json(friend);
});

app.put("/api/user/:id/friends/:friendId", async (req, res) => {

  const friend = await accept_friend(req.params.id, req.params.friendId);
  res.json(friend);
});

app.get("/api/courses/:department/:query", async (req, res) => {
  const { department, query } = req.params;

  if (department.toLowerCase() == "all") {
    if (isNumberAndNotStartingWithZero(query)) {
      const courses = await query_courses_by_code_all(query);
      res.json(courses);
    } else {
      const courses = await query_courses_by_instructor_name_all(query);
      res.json(courses);
    }
  } else {
    if (isNumberAndNotStartingWithZero(query)) {
      const courses = await query_courses_by_code(
        department.toUpperCase(),
        query
      );
      res.json(courses);
    } else {
      const courses = await query_courses_by_instructor_name(
        department.toUpperCase(),
        query
      );

      res.json(courses);
    }
  }
});

app.get("/api/query/:id/:query", async (req, res) => {
  const { id, query } = req.params;
  const users = await query_users_with_status(id, query);
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
