// https://github.com/gatsbyjs/gatsby/issues/6362
// https://github.com/gatsbyjs/gatsby/issues/4718

import React from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { renderToString } from "react-dom/server";
import i18n from "./src/config/i18n";

export const replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  i18n.loadNamespaces(["UI", "LandingPage"], () => {
    const sheet = new ServerStyleSheet();

    const app = (
      <StyleSheetManager sheet={sheet.instance}>
        {bodyComponent}
      </StyleSheetManager>
    );

    const body = renderToString(app);

    replaceBodyHTMLString(body);
    setHeadComponents([sheet.getStyleElement()]);
  });
};
