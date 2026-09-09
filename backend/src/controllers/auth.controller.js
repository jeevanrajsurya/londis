const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const prisma = require('../config/db');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../utils/jwt');

// Production cross-site HTTPS requests require SameSite=None and Secure=true.
// Development preserves standard localhost behavior (SameSite=Lax, Secure=false).
const getBaseCookieOpts = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/',
  };
};

const getAccessTokenCookieOpts = () => ({
  ...getBaseCookieOpts(),
  maxAge: 15 * 60 * 1000, // 15 minutes
});

const getRefreshTokenCookieOpts = () => ({
  ...getBaseCookieOpts(),
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Name, email and password are required');
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    res.status(409);
    throw new Error('An account with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, phone },
  });

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res
    .cookie('accessToken', accessToken, getAccessTokenCookieOpts())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOpts())
    .status(201)
    .json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);

  res
    .cookie('accessToken', accessToken, getAccessTokenCookieOpts())
    .cookie('refreshToken', refreshToken, getRefreshTokenCookieOpts())
    .json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

// POST /api/auth/refresh
const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return res.status(401).json({ message: 'No refresh token provided' });
  }

  try {
    const decoded = verifyRefreshToken(token);
    const accessToken = signAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });
    return res
      .cookie('accessToken', accessToken, getAccessTokenCookieOpts())
      .json({ ok: true, accessToken });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
});

// POST /api/auth/logout
const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie('accessToken', getBaseCookieOpts())
    .clearCookie('refreshToken', getBaseCookieOpts())
    .json({ ok: true });
});

// GET /api/auth/me
const me = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
  res.json({ user });
});

module.exports = { register, login, refresh, logout, me };
