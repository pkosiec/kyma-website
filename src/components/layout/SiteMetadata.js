import React from "react";
import i18n from "../../config/i18n";
import { Helmet } from "react-helmet";
import Sprites from "./Sprites";

const SiteMetadata = ({ pageId = "", pageName = "" }) => {
  const title = `${i18n.t("metadata.title")} - ${i18n.t(
    "metadata.shortDescription",
  )}`;
  const description = i18n.t("metadata.description");

  let pageTitle;
  if (pageId) {
    const pageTitleKey = `navigation.${pageId}`;
    pageTitle = i18n.t(pageTitleKey);
  } else {
    pageTitle = pageName;
  }

  const fullSiteTitle = (pageTitle ? `${pageTitle} | ` : "") + title;

  return (
    <div>
      {/* <Helmet defaultTitle={title} titleTemplate={`%s | ${title}`}>
        <meta name="twitter:title" content={fullSiteTitle} />
        <meta name="twitter:description" content={description} />
        <meta property="og:title" content={fullSiteTitle} />
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
        <meta name="twitter:site" content={`@${i18n.t("socialMedia.twitter.username")}`} />
        <meta name="og:site_name" content={i18n.t("metadata.title")} />
      </Helmet> */}
      <Sprites />
    </div>
  );
};

export default SiteMetadata;
