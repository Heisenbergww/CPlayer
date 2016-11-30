/**
 * Created by juri on 2016/11/23.
 */
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports={
    entry:{
        // math:'./math.js',
        // increment:'./increment.js',
        demo:'./src/js/demo.js'
    },
    output:{
        publicpath:'/assets/js',
        path:'dist/js',
        filename:'[name].output.js'
    },
    devtool:'sourcemap',
    status:{
        colors:true,
        reasons:true
    },
    watch: true,
    module:{
        // preLoaders:[{
        //     test:/\.(js|jsx)$/,
        //     exclude:/node_modules/,
        //     loader:'eslint'
        // }],
        loaders:[{
            test:/\.less$/,
            loader:'style!css!postcss!less'
        },{
            test:/\.css$/,
            loader:'style!css'
        },{
            test:/\.(png|jpg)$/,
            loader:'url?limit=4000'
        }]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],
    postcss: [
        autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
        })
    ]

}