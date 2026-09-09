const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const path = require('path');

const { notFound, errorHandler } = require('./middleware/error.middleware');

const authRoutes = require('./routes/auth.routes');
const fuelRoutes = require('./routes/fuelRoutes');
const settingRoutes = require('./routes/settingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const valetRoutes = require('./routes/valetRoutes');
const jobRoutes = require('./routes/jobRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const newsletterRoutes = require('./routes/newsletterRoutes');

const app = express();

// Trust reverse proxy (Railway, Heroku, etc.) for accurate client IP and secure cookies
app.set('trust proxy', 1);

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Allow requests from both the customer frontend and the admin app across environments
const rawOrigins = [
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
  'https://londis-admin.vercel.app',
  'https://londis-frontend.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:5176',
  'http://localhost:5177',
].filter(Boolean);

const allowedOrigins = Array.from(
  new Set(rawOrigins.map((o) => o.trim().replace(/\/+$/, '')))
);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve uploaded files (resumes, forecourt images) statically
app.use('/uploads', express.static(path.join(__dirname, '..', process.env.UPLOAD_DIR || 'uploads')));

// Basic rate limiting on auth endpoints
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });
app.use('/api/auth', authLimiter);

// Health check
app.get('/api/health', (req, res) =>
  res.json({
    status: 'ok',
    app: 'S&B UK Petroleum & Forecourt Services API',
    timestamp: new Date().toISOString(),
  })
);

// Petroleum & Forecourt Routes
app.use('/api/auth', authRoutes);
app.use('/api/fuel-prices', fuelRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/valet-bookings', valetRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/newsletter', newsletterRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;

