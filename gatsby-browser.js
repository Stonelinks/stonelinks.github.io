import ReactGA from 'react-ga';
import { config, pages } from 'config';
import find from 'lodash/find';

import { browserHistory } from 'react-router';

if (config.gaCode) {
  ReactGA.initialize(config.gaCode);
}

exports.onRouteUpdate = state => {
  const page = find(pages, { path: state.pathname });
  if (page && page.data && page.data.redirect) {
    browserHistory.push(page.data.redirect);
  }

  if (config.gaCode) {
    ReactGA.ga('send', 'pageview', {
      location: location.pathname,
      title: page && page.data && page.data.title ? page.data.title : state.pathname,
      page: state.pathname,
    });
  }
};
