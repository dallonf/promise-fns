module.exports = {
    reporter: "spec",
    recursive: true,
    require: ["@babel/register", "regenerator-runtime/runtime"],
    spec: ["test/testHelper.js", "test/unit/**/*.test.js"],
};
