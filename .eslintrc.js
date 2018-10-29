module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: "eslint:recommended",
    parserOptions: {
        ecmaVersion: 2017,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        },
        sourceType: "module"
    },
    rules: {
        indent: [
            "error",
            4,
            {
                SwitchCase: 1
            }
        ],
        "linebreak-style": "off",
        quotes: [
            "error",
            "double",
            {
                allowTemplateLiterals: true
            }
        ],
        semi: ["error", "always"],
        "no-console": "off",
        "no-useless-escape": "off",
        "max-len": [1, 600],
        "function-paren-newline": ["error", "never"]
    }
};
