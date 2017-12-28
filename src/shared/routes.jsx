import React from 'react';
import { actions } from 'redux-ghost';
import dotty from 'dotty';
import { Redirect } from 'found';

import App from './components/app.jsx';

export const routeConfig = [
  {
    path: '/:string?',
    Component: App
  }
];
