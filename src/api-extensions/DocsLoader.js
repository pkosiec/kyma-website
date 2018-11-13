const DOCS_LOCATION = "external/documentation";

class DocsLoader {
  constructor(version) {
    this.version = version;
  }

  async loadNavigation() {
    return this.load(`${this.version}/navigation.json`);
  }

  async loadManifest() {
    return this.load(`${this.version}/manifest.json`);
  }

  async loadContent(type, id) {
    return this.load(`${this.version}/${type}/${id}/content.json`);
  }

  load(path) {
    return require(`../../${DOCS_LOCATION}/${path}`);
  }
}

module.exports = DocsLoader;
