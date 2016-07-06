
let webpack = require('webpack');
let fs = require('fs');

let DEBUG = (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'development') || false;

let plugins = [
    new webpack.optimize.OccurrenceOrderPlugin()
];
if (!DEBUG) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.NoErrorsPlugin()
    );
}

function getPagesNames(dirPath) {
    let filesNames = fs.readdirSync(dirPath);
    let entries = {
    };

    for (let fileName of filesNames) {
        entries[fileName.split('.').shift() || fileName] = [`${dirPath}/${fileName}`];
    }

    return entries;
}

module.exports = {
    target: 'web',
    entry: getPagesNames(__dirname + '/test'),
    output: {
        path: './demo/dist',
        filename: DEBUG ? "./react-lui-test-debug.js" : "./react-lui-test-min.js",
        chunkFilename: DEBUG ? "./react-lui-test-debug.js" : "./react-lui-test-min.js"
    },

    cache: true,
    debug: DEBUG,

    devtool: DEBUG && "#inline-source-map",

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ['transform-runtime'],
                    cacheDirectory: true
                }
            }
        ],
        noParse: [
        ]
    },

    plugins: plugins,

    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },

    resolve: {
        modulesDirectories: [
            "node_modules",
            "web_modules"
        ],

        extensions: ["", ".js", ".jsx", ".es6", '.json'],

        alias: {
        }
    }
};
