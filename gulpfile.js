var gulp = require('gulp');
var sshSftp = require('gulp-ssh');
var config = require('./config');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var copy = require('gulp-copy');
var clean = require('gulp-clean');
var del = require('del');
var vinylPaths = require('vinyl-paths');
var fs = require('fs');

var runProFlag = true;
var assetPath = '';
var ftpAuth = {};
var ftpAuthImg = {};
var sshSftpConfig = {};
console.log('环境：', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
    runProFlag = true;
    assetPath = './dist/' + process.env.ProVersionTime + '/';
    // 生产服务器-前端项目打版
    runProFlag = false;
    assetPath = config.build.assetsRoot;
    console.log('assetPath：', assetPath);
    sshSftpConfig = {
      host: '',
      port: 22,
      username: 'root',
      password: ''
      // privateKey: fs.readFileSync(privateKeyPath + 'mykey.pem')
    };
};

if (!runProFlag) {
    var gulpSSH = new sshSftp({
        ignoreErrors: false,
        sshConfig: sshSftpConfig
    });
    // 压缩img内未经压缩的图片,存至imagemins文件夹内
    gulp.task('imagemin', function () {
        return gulp.src(assetPath+'/static/img/**/*.{png,jpg,gif,svg}')
            .pipe(imagemin({
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
                use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
            }))
            .pipe(gulp.dest(assetPath+'/static/imagemins'));
    });

    // 删除img内未经压缩处理的图片
    gulp.task('clean-img', ['imagemin'], function () {
        return gulp.src(assetPath + '/static/img/**/*', {read: false})
            .pipe(clean())
    });

    // 复制压缩后的图片到img文件夹
    gulp.task('copy-img', ['clean-img'], function () {
        return gulp.src(assetPath + '/static/imagemins/**/*')
            .pipe(gulp.dest(assetPath + '/static/img/'))
    });

    // 删除复制完压缩图后的imagemins文件夹
    gulp.task('clean-imagemins', ['copy-img'], function () {
        return gulp.src(assetPath + '/static/imagemins', {read: false})
            .pipe(clean({force: true}))
    });

    gulp.task('deploy', ['clean-imagemins'], function () {
        return gulp.src(assetPath + '/**/*')
            .pipe(gulpSSH.dest('/website/'));
    });
}
