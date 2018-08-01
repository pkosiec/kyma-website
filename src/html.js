import React from "react";
import PropTypes from "prop-types";
import "./config/i18n";
import { withPrefix } from "gatsby";

class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>Kyma - cloud-native application development framework</title>
          <meta
            name="description"
            content="A flexible and easy way to integrate and extend enterprise applications in a cloud-native world"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:type" content="website" />
          <meta property="og:image" content={withPrefix("/kyma-logo.png")} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:image" content={withPrefix("/kyma-logo.png")} />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={withPrefix("/apple-touch-icon.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={withPrefix("/favicon-32x32.png")}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={withPrefix("/favicon-16x16.png")}
          />
          <link rel="manifest" href={withPrefix("/site.webmanifest")} />
          <link
            rel="mask-icon"
            href={withPrefix("/safari-pinned-tab.svg")}
            color="#2872dd"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href={withPrefix("/global.css")}
          />
          {this.props.headComponents}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}

export default HTML;

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
};
