var util = require('util');
var parse = require('url').parse;
var fs = Promise.promisifyAll(require('fs'));

// fs.exists 比较特殊,第一个参数不是error
fs.existsAsync = function(p) {
    return new Promise(function(resolve) {
        fs.exists(p, resolve);
    });
}

var path = require('path');
var assert = require('assert');

var less = require('less');
less.renderAsync = Promise.promisify(less.render, less);

/**
 * e.g
 *
 * app.use('/public/css',less(__dirname+"/public/css-src"))
 */
module.exports = function(lessBasePath,op) {
    return co.wrap(function*(req, res, next) {
        // originalUrl html 里面写的
        // base,表示use的url
        // url 表示original相对于base的

        var file = parse(req.url).pathname;
        if (path.extname(file) === '.css') {
            file = file.replace(/css$/, 'less');
            var real = path.join(lessBasePath, file);
            if (
                yield fs.existsAsync(real)) {

                // 文件存在
                var contents =
                    yield fs.readFileAsync(real, 'utf8');

                try {
                    var output =
                        yield less.renderAsync(contents, {
                            paths: path.dirname(real),
                            filename: real,
                            compress: false
                        });

                    return res.type('css').end(output.css);
                }
                catch (e) {
                    // less render 出错
                    console.error(e);
                    next(e)
                }
            }
            else {
                // 文件不存在
                next();
            }
        }
    });
}