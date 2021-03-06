const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup'); // 可以去除gulp中无用的代码，rollup的tree-shaking
const replace = require('rollup-plugin-replace');// 替换掉config里的多余代码
const eslint = require('gulp-eslint')
const entry = "./src/server/**/*.js"
// 开发环境
function builddev() {
    return watch(entry, {
        ignoreInitial: false
    }, function(){
        gulp.src(entry)
        .pipe(babel({
            babelrc: false, // 让里面的babel生效，外面的不生效
            "plugins": [
                ['transform-es2015-modules-commonjs']
            ]
        }))
        .pipe(gulp.dest('./dist'))
    })
}
// 上线环境
function buildprod() {
    return gulp.src(entry)
        .pipe(babel({
            babelrc: false, // 让里面的babel生效，外面的不生效
            ignore: ["./src/server/config/*.js"],
            "plugins": [
                ['transform-es2015-modules-commonjs']
            ]
        }))
        .pipe(gulp.dest('./dist'))
}
// 对代码进行检查的环境
function buildlint() {
    return gulp.src(entry)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
}
// 清洗环境
function buildconfig() {
    return gulp.src(entry)
    .pipe(rollup({
        output: {
            format: 'cjs'
        },
        plugins: [
            replace({
                "process.env.NODE_ENV": JSON.stringify('production')
            })
        ],
        input: "./src/server/config/index.js"
    }))
    .pipe(gulp.dest('./dist'))
}

let build = gulp.series(builddev)

if(process.env.NODE_ENV == "production") {
    build = gulp.series(buildprod, buildconfig)
}

if(process.env.NODE_ENV == "lint") {
    build = gulp.series(buildlint)
}

gulp.task("default", build)