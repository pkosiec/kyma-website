import React from "react";

import MDContent from "../../content/MDContent";
import { Wrapper, Header, ContentHeader, ContentDescription } from "./styled";

const DocsContent = ({ content, tokenize }) => {
  if (!content) {
    return null;
  }

  const { docs = [] } = content;

  return (
    <Wrapper>
      <ContentHeader>{content.displayName}</ContentHeader>
      <ContentDescription>
        {docs.map((item, idx) => {
          const type = item.type || item.title;
          const hash = `${tokenize(type)}-${tokenize(item.title)}`;

          return (
            <div key={idx}>
              <Header id={hash}>{item.title}</Header>
              <MDContent html={item.source} />
            </div>
          );
        })}
      </ContentDescription>
    </Wrapper>
  );
};
export default DocsContent;
