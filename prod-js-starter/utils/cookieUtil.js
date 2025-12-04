const config = require('../config/env');

const COOKIE_NAMES = {
  Admin: {
    access: 'admin_access_token',
    refresh: 'admin_refresh_token',
  },
  User: {
    access: 'user_access_token',
    refresh: 'user_refresh_token',
  },
};

function getCookieOptions(maxAge) {
  const isProd = config.app.nodeEnv === 'production';

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'strict' : 'lax',
    maxAge,
    path: '/',
  };
}

function setAuthCookies(res, accessToken, refreshToken, role) {
  if (!COOKIE_NAMES[role]) {
    throw new Error(`Invalid role provided to setAuthCookies: "${role}"`);
  }

  const { access, refresh } = COOKIE_NAMES[role];

  res.cookie(access, accessToken, getCookieOptions(15 * 60 * 1000));
  res.cookie(refresh, refreshToken, getCookieOptions(7 * 24 * 60 * 60 * 1000));
}

function clearAuthCookies(res, role) {
  if (!COOKIE_NAMES[role]) {
    throw new Error(`Invalid role provided to clearAuthCookies: "${role}"`);
  }

  const { access, refresh } = COOKIE_NAMES[role];

  const clearOptions = { path: '/' };

  res.clearCookie(access, clearOptions);
  res.clearCookie(refresh, clearOptions);
}

module.exports = {
  setAuthCookies,
  clearAuthCookies,
  COOKIE_NAMES,
};
