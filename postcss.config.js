module.exports = {
    plugins: {
        'autoprefixer': {
            grid: true
        },
        'cssnano': {},
        'postcss-preset-env': {
            browsers: 'last 2 versions',
        },
    },
};