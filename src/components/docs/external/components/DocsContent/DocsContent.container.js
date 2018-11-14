import React from "react";
import ContentWrapper from "./DocsContent.component";

const DocsContentContainer = ({ content, version }) => {
  const replaceImagePathsInDocs = (inputContent, ver) => {
    const newContent = { ...inputContent };
    const { type, id } = newContent;

    newContent.docs = inputContent.docs.map(doc => {
      if (doc.source.search(/.?\/?assets/g) !== -1) {
        doc.source = doc.source.replace(
          /src="\.?\/?assets/g,
          `src="/documentation/${ver}/${type}/${id}/assets`,
        );
      }

      return doc;
    });

    return newContent;
  };

  const modifiedContent = replaceImagePathsInDocs(content, version);

  return <ContentWrapper content={modifiedContent} />;
};

export default DocsContentContainer;
