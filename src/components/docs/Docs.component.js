import React from "react";
import MainPage from "./external/MainPage/MainPage.component";
import VersionSwitcher from "./navigation/VersionSwitcher";
import BackToTop from "./navigation/BackToTop";

class Docs extends React.PureComponent {
  changeVersion = async e => {
    const newVersion = e.target.value;

    // let path = `/${this.props.pageName}`;
    // if (newVersion !== this.props.latestVersion) {
    //   path += `/${newVersion}`;
    // }

    // if (this.props.match.params.type && this.props.match.params.id) {
    //   path += `/${this.props.match.params.type}/${this.props.match.params.id}`;
    // }

    // if (this.props.location.hash) {
    //   path += this.props.location.hash;
    // }

    // this.props.history.replace(path);
    // await this.refetchDocs(newVersion);
  };

  render() {
    const {
      navigation,
      manifest,
      content,
      currentVersion,
      versions,
      location,
      match,
    } = this.props;

    return (
      <>
        <MainPage
          topics={navigation}
          manifest={manifest.spec}
          location={location}
          version={currentVersion}
          versions={versions}
          content={content}
          match={match}
          topNavComponent={
            <>
              <BackToTop />
              <VersionSwitcher
                versions={versions}
                currentVersion={currentVersion}
                onChange={this.changeVersion}
              />
            </>
          }
        />
      </>
    );
  }
}

export default Docs;
