import express from 'express';

import { JOIN_KEY, DONATE_KEY } from '../shared/constants';

const BLOG_ADMIN_URL = 'http://blog.better-angels.org/ghost/';
const app = express();

const redirect = (from, to) => app.get(from, (req, res, next) => {
  res.redirect(301, to);
});

redirect('/from', '/to');

export default app;
