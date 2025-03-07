module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'never', 'sentence-case'],
    'type-empty': [2, 'never'],
    'scope-empty': [2, 'never'],
  },
};
