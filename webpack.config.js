const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require("path");
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin');
const Webpackbar = require('webpackbar');

const config = {
    ...defaultConfig,
    module: {
        ...defaultConfig.module,
        rules: [
            ...defaultConfig.module.rules,
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(bmp|png|jpe?g|gif|webp)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
        ],
    },
    resolve: {
        ...defaultConfig.resolve,
        alias : {
            '@enokh-blocks': path.resolve(__dirname, './resources/ts'),
        }
    }
};

module.exports = {
    ...config,
    entry: {
        ...config.entry(), // Allow block.json files to be parsed
        'enokh-universal-theme': './resources/ts/enokh-universal-theme',
        'enokh-universal-theme-editor': './resources/ts/enokh-universal-theme-editor',

        'enokh-design-system-core': './resources/scss/enokh-design-system-core.scss',
        'enokh-design-system-core-editor': './resources/scss/enokh-design-system-core-editor.scss',
        'enokh-design-system-elements': './resources/scss/enokh-design-system-elements.scss',
        'enokh-design-system-elements-editor': './resources/scss/enokh-design-system-elements-editor.scss',

        'enokh-blocks-term-icon-selector': './resources/ts/editor/admin/TermIconSelector/index',
    },
    plugins: [
        ...config.plugins,
        new Webpackbar(),
        new CleanTerminalPlugin(),
    ],
    output: {
        path: __dirname + '/assets',
        filename: '[name].js',
    },
};
