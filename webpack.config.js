const path = require('path');
const webpack = require('webpack');
//process.env.NODE_ENV = 'production'   //배포모드

module.exports = {
    name : 'sutdy',
    mode : 'development',    //설서비스 : production
    devtool : 'evel',
    resolve:{
        extensions: ['.js', '.jsx'],
    },
    //1. 해당 파일 대상으로 만들겠다
    entry:{
        app: ['./webComponentModule']
    },  //입력
    //2. 해당 모듈을 추가하여
    module:{
        rules:[{
            test: /\.jsx?/, //js & jsx 파일 대상으로
            loader: 'babel-loader', //바벨을 적용해서 로더하겠다
            options:{   //바벨 옵션 적용
                //@babel/preset-env 역활은 자동으로 브라우저마다 호환되게 해주는 모듈
                presets:[
                    ['@babel/preset-env', {
                        targets : {
                            //이렇게  한국에서 점유율이 5% 이상인 브라우저만 호환.
                            browsers: ['> 5% in KR'],
                        },
                        debug : true,
                    }],
                    '@babel/preset-react', 
                ],
                 plugins:[  //모듈에 종속되는 플러그인 추가할때
                     'react-hot-loader/babel',
                     '@babel/plugin-proposal-class-properties'
                 ],
            },
        }], //모듈의 룰 설정
    },  //모듈추가

    plugins:[   //모듈말고 추가할 플러그 인이 있을경우
        new webpack.LoaderOptionsPlugin({ debug: true }),   
    ],

    output:{
        path : path.join(__dirname, 'dist'),    //path.join(__dirname << 현재폴더 위치
        filename : 'app.js',
        publicPath : '/dist/',   //가상경로
    },  //출력
};