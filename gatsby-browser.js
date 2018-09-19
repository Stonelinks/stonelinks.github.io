import ReactGA from "react-ga";
import { config, pages } from "config";
import find from "lodash/find";
import _ from "lodash";
import $ from "jquery";

import { browserHistory } from "react-router";

if (config.gaCode) {
  ReactGA.initialize(config.gaCode);
}

// force 16 / 9 resolution for all videos
const resizeVideos = _.debounce(() => {
  $("iframe[src^='http://www.youtube.com']").each(function() {
    const $el = $(this);
    $el.height(($el.width() * 9) / 16);
  });
}, 100);

$(window).resize(resizeVideos);

exports.onRouteUpdate = state => {
  if (state.pathname.indexOf("/luke") !== -1) {
    browserHistory.push("/about/");
  }

  const page = find(pages, { path: state.pathname });

  if (config.gaCode) {
    ReactGA.ga("send", "pageview", {
      location: window.location.pathname,
      title:
        page && page.data && page.data.title ? page.data.title : state.pathname,
      page: state.pathname
    });
  }

  resizeVideos();
};
