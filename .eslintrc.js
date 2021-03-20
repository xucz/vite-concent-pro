module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ['plugin:react/recommended', "react-app"],
  env: {
    jest: true,
  },
  globals: {
    JSX: true,
    React: true
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // eqeqeq: 0,
    // 'constructor-super': 0,
    // 'no-plusplus': 0,
    // 'no-underscore-dangle': 0,
    // 'max-len': ['error', { code: 300 }],
    'linebreak-style': ["off", "windows"],
    camelcase: 0,
    '@typescript-eslint/explicit-member-accessibility': 0,
    '@typescript-eslint/prefer-optional-chain': 0,
    'react/display-name': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    'function-paren-newline': 0,
    'object-curly-spacing': 0,
    'arrow-parens': 0,
    /**
     * allow
     * return name.split('').reverse().join('');
     */
    'newline-per-chained-call': 0,
  },
};
