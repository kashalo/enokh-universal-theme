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
            },
        ],
    },
};

module.exports = {
    ...config,
    entry: {
        ...config.entry(), // Allow block.json files to be parsed
        'enokh-universal-theme': './resources/ts/enokh-universal-theme',
        'enokh-universal-theme-editor': './resources/ts/enokh-universal-theme-editor',
    },
    output: {
        path: __dirname + '/assets',
        filename: '[name].js',
    },
};
