const path = require("path");
const compareVersions = require("compare-versions");
const DocsLoader = require("./DocsLoader");

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

  versions.forEach(version => {
    const loader = new DocsLoader(version);

    const navigation = loader.loadNavigation();
    const manifest = loader.loadManifest();

    if (!manifest.spec) {
      console.error(`Incorrect manifest for version ${version}`);
      return;
    }

    Object.keys(manifest.spec).forEach(contentType => {
      const obj = manifest.spec[contentType];
      const pages = populateDocsPages(obj);

      pages.forEach(page => {
        content = loader.loadContent(contentType, page.id);

        createPage({
          path: `/docs/${version}/${contentType}/${page.id}`,
          component: template,
          context: {
            displayName: page.displayName,
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
