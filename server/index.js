const express = require('express');
const path = require('path');
const app = express();
const { get_fav_courses,
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
    get_courses_by_name } = require('./DB/db');

const PORT = process.env.PORT || 3000;

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// All other routes should redirect to the index.html in 'dist'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/api/user/:email', async (req, res) => {
    const user = await get_user_by_email(req.params.email);
    res.json(user);
})

app.get('/api/user/:id/fav_courses', async (req, res) => {
    const fav_courses = await get_fav_courses(req.params.id);
    res.json(fav_courses);
})

app.get('/api/user/:id/:department/:number', async (req, res) => {
    const course = await get_courses_by_name(req.params.id, {department: req.params.department, number: req.params.number});
    res.json(course);
})

app.post('/api/user/:id/fav_courses', async (req, res) => {
    const course = await add_fav_course(req.params.id, req.body);
    res.json(course);
})

app.delete('/api/user/:id/fav_courses', async (req, res) => {
    const course = await remove_fav_course(req.params.id, req.body);
    res.json(course);
})

app.get('/api/user/:id/friends', async (req, res) => {
    const friends = await get_friends(req.params.id);
    res.json(friends);
})

app.post('/api/user/:id/friends', async (req, res) => {
    const friend = await add_friend(req.params.id, req.body);
    res.json(friend);
})

app.delete('/api/user/:id/friends', async (req, res) => {
    const friend = await remove_friend(req.params.id, req.body);
    res.json(friend);
})

app.put('/api/user/:id/friends', async (req, res) => {
    const friend = await accept_friend(req.params.id, req.body);
    res.json(friend);
})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});