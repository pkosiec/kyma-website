const fs = require("fs-extra");
const path = require("path");

const createBlogPostPages = require("./src/api-extensions/blog-post-pages");
const createDocsPages = require("./src/api-extensions/documentation-pages");

exports.onPostBootstrap = () => {
  console.log("Copying locales");
  fs.copySync(
    path.join(__dirname, "/src/locales"),
    path.join(__dirname, "/public/locales"),
  );
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: path.resolve(
              __dirname,
              "node_modules/@kyma-project/react-components/lib/index.js",
            ),
            use: "null-loader",
          },
        ],
      },
    });
  }
};

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;
  await createBlogPostPages({ graphql, createPage });
  await createDocsPages({ graphql, createPage });
};
