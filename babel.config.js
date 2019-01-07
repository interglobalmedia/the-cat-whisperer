module.exports = {
    presets: [['@babel/preset-env']],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-throw-expressions',
      '@babel/plugin-transform-modules-commonjs',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-transform-object-assign'
    ]
  };