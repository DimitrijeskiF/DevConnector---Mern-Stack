const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const postsRouter = require('./routes/api/posts');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());

//Routes
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
});