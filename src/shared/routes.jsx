import React from 'react';
import dotty from 'dotty';
import { Redirect } from 'found';

import App from './components/app.jsx';
const randomProjectId = () => (['rad', 'sex', 'hab', 'sherpa'])[ Math.floor(Math.random() * 4)];

export const routeConfig = [
  {
    path: '/:string?',
    Component: App,
    getData: () => {
      return {
        projectId: randomProjectId()
      }
    }
  }
];
