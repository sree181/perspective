/******************************************************************************
 *
 * Copyright (c) 2018, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: process.env.PSP_NO_MINIFY || process.env.PSP_DEBUG ? "development" : process.env.NODE_ENV || "production",
    entry: "./src/ts/index.ts",
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js", ".json"]
    },
    externals: [/^[a-z0-9@]/],
    plugins: [new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(en|es|fr)$/)],
    stats: {modules: false, hash: false, version: false, builtAt: false, entrypoints: false},
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{loader: "style-loader"}, {loader: "css-loader"}, {loader: "less-loader"}]
            },
            {test: /\.ts?$/, loader: "ts-loader"}
        ]
    },
    output: {
        filename: "index.js",
        libraryTarget: "commonjs",
        path: path.resolve(__dirname, "dist/cjs")
    }
};
