const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.scss$/,
    loaders: ["style-loader", "css-loader", "sass-loader"],
    include: path.resolve(__dirname, "../")
  });
  defaultConfig.resolve.extensions.push(".scss");

  defaultConfig.module.rules.push({
    test: /\.woff2?/,
    loader: "file-loader",
    include: path.resolve(__dirname, "../")
  });
  defaultConfig.resolve.extensions.push(".woff")
  defaultConfig.resolve.extensions.push(".woff2")
  return defaultConfig;
};
