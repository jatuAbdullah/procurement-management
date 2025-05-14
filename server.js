const express = require('express');
const dotenv = require('dotenv');
const helmet = require('helmet')
const morgan = require('morgan');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoute'); 
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const checklistRoutes = require('./routes/checklistRoutes');
const answerRoutes = require('./routes/answerRoute');

dotenv.config();

// Connect to database
connectDB();

const app = express();
app.use(express.json()); // Body parser
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Helmet for security headers
app.use(helmet());




// Use Morgan only in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logs method, URL, status, response time
}


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/checklists', checklistRoutes);
app.use('/api/answers', answerRoutes);


// Middleware for 404 and general error handling
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
