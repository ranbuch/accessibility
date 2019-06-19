module.exports = {
    entry: './src/accessibility.js',
    mode: 'production',
    output: {
        library: './dist',
        libraryTarget: 'umd',
        filename: 'accessibility.min.js',
        auxiliaryComment: 'accessibility output'
    }
}