require('dotenv').config();

const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectDb = require('./controllers/db');
const cors = require('cors');

const port = process.env.PORT || 3001;

// Comma-separated list, e.g. FRONTEND_URL=http://localhost:3000,https://your-app.vercel.app
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: (origin, callback) => {
        // allow tools with no origin header (curl, server-to-server, health checks)
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
}));

const signinRoute = require('./routes/signin');
const loginRoute = require('./routes/login');
const authmiddleware = require('./middlewares/auth');
const profileRoute = require('./routes/profile');
const qnaRoute = require('./routes/qna');
const contactRoute = require('./routes/contact');

app.use('/signin', signinRoute);
app.use('/login', loginRoute);
app.use('/profile', authmiddleware, profileRoute);
app.use('/qna', authmiddleware, qnaRoute);
app.use('/api/contact', contactRoute);

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((err) => {
    console.error('Failed to connect db', err);
    process.exit(1);
});
