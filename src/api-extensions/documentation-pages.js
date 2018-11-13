const path = require("path");
const compareVersions = require("compare-versions");
const ui = require("../locales/en/UI.json");
const DocsLoader = require("./DocsLoader");

// FIXME: Do not use  GraphQL, use Node.js instead
async function getDocsVersions(graphql) {
  const result = await graphql(`
    {
      allDirectory(
        filter: {
          relativePath: { regex: "/^[^/]+$/" }
          sourceInstanceName: { eq: "docs" }
        }
      ) {
        edges {
          node {
            relativePath
          }
        }
      }
    }
  `);

  const edges = result.data.allDirectory.edges || [];
  const versions = edges
    .map(edge => edge.node.relativePath)
    .sort(compareVersions)
    .reverse();

  return versions;
}

async function createDocsPages({ graphql, createPage }) {
  const template = path.resolve(`src/templates/Documentation.js`);
  const versions = await getDocsVersions(graphql);
  if (versions.length === 0) {
    return;
  }

  // Main /docs page
  const latestVersion = versions[0];

  const loader = new DocsLoader(latestVersion);
  const navigation = loader.loadNavigation();
  const manifest = loader.loadManifest();

  //TODO: Refactor
  // FIXME: not root, just first key + first item id
  const latestVersionContent = loader.loadContent(
    "root",
    manifest.spec.root.id,
  );
  createPage({
    path: `/docs`,
    component: template,
    context: {
      displayName: ui.navigation.documentation,
      content: latestVersionContent,
      navigation,
      manifest,
    },
  });

  versions.forEach(version => {
    const loader = new DocsLoader(version);

    const navigation = loader.loadNavigation();
    const manifest = loader.loadManifest();

    if (!manifest.spec) {
      console.error(`Incorrect manifest for version ${version}`);
      return;
    }

    // main version page

    // FIXME: not root, just first key + first item id
    const versionContent = loader.loadContent("root", manifest.spec.root.id);
    createPage({
      path: `/docs/${version}`,
      component: template,
      context: {
        displayName: `${version} - ${ui.navigation.documentation}`,
        content: versionContent,
        navigation,
        manifest,
      },
    });

    // subpages

    Object.keys(manifest.spec).forEach(contentType => {
      const obj = manifest.spec[contentType];
      const pages = populateDocsPages(obj);

      pages.forEach(page => {
        content = loader.loadContent(contentType, page.id);

        createPage({
          path: `/docs/${version}/${contentType}/${page.id}`,
          component: template,
          context: {
            displayName: `${page.displayName} - ${ui.navigation.documentation}`,
            content,
            navigation,
          },
        });
      });
    });
  });
}

function populateDocsPages(obj) {
  if (Array.isArray(obj)) {
    return obj;
  }

  if (typeof obj === "object") {
    return [obj];
  }

  return [];
}

module.exports = createDocsPages;
