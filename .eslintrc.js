module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended", "prettier/vue", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint"
  }
}
