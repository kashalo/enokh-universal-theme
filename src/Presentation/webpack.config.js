const Webpackbar = require('webpackbar');
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

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
            }
        ],
    },
};

module.exports = {
    ...config,
    entry: {
        ...config.entry(), // Allow block.json files to be parsed
        'mah-design-system-core': './resources/sass/mah-design-system-core.scss',
        'mah-design-system-core-editor': './resources/sass/mah-design-system-core-editor.scss',
        'mah-design-system-elements': './resources/sass/mah-design-system-elements.scss',
        'mah-design-system-elements-editor': './resources/sass/mah-design-system-elements-editor.scss',
    },
    plugins: [
        ...config.plugins,
        new Webpackbar(),
    ],
    output: {
        path: __dirname + '/assets',
        filename: '[name].js',
    },
};