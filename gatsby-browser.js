import ReactGA from 'react-ga';
import { config, pages } from 'config';
import find from 'lodash/find';
import _ from 'lodash';
import $ from 'jquery';

import { browserHistory } from 'react-router';

if (config.gaCode) {
  ReactGA.initialize(config.gaCode);
}

// force 16 / 9 resolution for all videos
const resizeVideos = _.debounce(function() {
  $("iframe[src^='http://www.youtube.com']").each(function () {
    const $el = $(this);
    $el.height($el.width() * 9 / 16);
  });
}, 100)

$(window).resize(resizeVideos);

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

  resizeVideos()
};
