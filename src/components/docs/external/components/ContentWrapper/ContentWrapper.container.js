import React from "react";
import { Helmet } from "react-helmet";
import ContentWrapper from "./ContentWrapper.component";
import LoadingIndicator from "../../../../loading/LoadingIndicator";
import ui from "../../../../../locales/en/UI.json";
import DocsFetcher from "../../../../../api-extensions/DocsLoader";
import { displayError } from "../../../../../helpers/displayError";
import Text from "../../../../content/Text";
import { goToAnchor } from "react-scrollable-anchor";

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: undefined,
    };
  }
  async componentDidMount() {
    const { type, id, hash } = this.props.content;
    goToAnchor(hash);
  }

  async UNSAFE_componentWillReceiveProps(newProps) {
    const { version, item } = newProps;
    const { type, id, hash } = item;

    const currentItem = { ...this.props.content };

    if (
      type !== currentItem.type ||
      id !== currentItem.id ||
      version !== this.props.version
    ) {
      this.setState({
        loading: true,
      });
      await this.updateContent(version, type, id);
    }

    if (hash !== currentItem.hash) {
      goToAnchor(hash);
    }
  }

  replaceImagePaths = (inputDocs, { version, type, id }) => {
    return inputDocs.map(doc => {
      if (doc.source.search(/.?\/?assets/g) !== -1) {
        doc.source = doc.source.replace(
          /src="\.?\/?assets/g,
          `src="/docs-src/${version}/${type}/${id}/assets`,
        );
      }

      return doc;
    });
  };

  render() {
    const { content, version } = this.props;
    const contentCpy = { ...content };
    contentCpy.docs = this.replaceImagePaths(contentCpy.docs, {
      version: version,
      type: content.type,
      id: content.id,
    });

    return (
      <>
        <ContentWrapper content={contentCpy} {...this.props} />
      </>
    );
  }
}
