import React from "react";

import { sortByOrder, filterWithoutInternal } from "../../helpers/helpers";
import MDContent from "../../../../content/MDContent";
import {
  Wrapper,
  Header,
  ContentHeader,
  ContentDescription,
  Anchor,
} from "./styled";

const ContentWrapper = ({ content }) => {
  const { docs = [] } = content;

  let finalDocs = sortByOrder(docs);
  finalDocs = filterWithoutInternal(finalDocs);

  let lastTypeHash;
  let removeSpaces = name => {
    return name
      .trim()
      .replace(/ /g, "-")
      .toLowerCase();
  };

  return (
    <div>
      {content && (
        <Wrapper>
          <ContentHeader>{content.displayName}</ContentHeader>
          <ContentDescription>
            {docs.map((item, idx) => {
              const type = item.type ? item.type : item.title;
              const hash = `${removeSpaces(type)}-${removeSpaces(item.title)}`;

              let isFirstOfType = false;
              const currentTypeHash = `${removeSpaces(type)}-${removeSpaces(
                type,
              )}`;

              isFirstOfType = lastTypeHash !== currentTypeHash;
              lastTypeHash = currentTypeHash;

              return (
                <div key={idx}>
                  {isFirstOfType &&
                    currentTypeHash !== hash && <Anchor id={currentTypeHash} />}
                  <Header id={hash}>{item.title}</Header>
                  <MDContent html={item.source} />
                </div>
              );
            })}
          </ContentDescription>
        </Wrapper>
      )}
    </div>
  );
};
export default ContentWrapper;
