module.exports={
    entry:'./app/index.js',
    output:{
        path:__dirname,
        filename:'bundle.js'
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test:/\.scss/,
                loader:'style!css!sass'
            },
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                loader:'babel',
                query:{
                    presets:['es2015']
                }
            },
            {
                test:/.(png)|(jpg)$/, 
                loader: "url?limit=50000"
            }
        ]
    }
}