module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 13,
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: [0, 4], //отступы должны быть кратны 4
        semi: [2, "always"], //наличие ;
        "space-before-function-paren": [
            "error",
            { anonymous: "always", named: "never" }
        ], //отсутствует пробел перед назначением функции
        "multiline-ternary": ["off"],
        quotes: ["error", "double", { allowTemplateLiterals: true }] //двойные кавычки
    }
};
