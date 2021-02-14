const babelConfig = require('./babel.config');

const [_, {alias}] = babelConfig.plugins.find(
  ([name]) => name === 'babel-plugin-module-resolver',
);

const importOrder = Object.keys(alias).map((i) => `^${i}/(.*)$`);

module.exports = {
  bracketSpacing: false,
  jsxBracketSameLine: true,
  singleQuote: true,
  trailingComma: 'all',
  importOrder: [...importOrder, '^[./]'],
  importOrderSeparation: false,
};
