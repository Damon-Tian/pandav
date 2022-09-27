const { rules } = require("eslint-config-prettier")
const { rule } = require("postcss")

module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/recommended", "prettier/vue", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-unused-vars": "off"
  }
}
