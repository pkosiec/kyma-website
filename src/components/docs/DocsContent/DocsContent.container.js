import React from "react";
import DocsContent from "./DocsContent.component";
import { DocsProcessor } from "./DocsProcessor";

const DocsContentContainer = ({ content, version }) => {
  const { docs = [], type, id } = content;
  const newContent = { ...content };

  newContent.docs = new DocsProcessor(docs)
    .filterExternal()
    .sortByOrder()
    .replaceImagePaths({ type, id, version })
    .result();

  return <DocsContent content={newContent} />;
};

export default DocsContentContainer;
