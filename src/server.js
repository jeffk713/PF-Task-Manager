const express = require('express');
const connectDB = require('../config/db');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json({ extended: false }));

app.use('/user', require('./routes/user.route'));
app.use('/task', require('./routes/task.route'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
