/*
 * module dependency
 */
var google = require('../lib/google');

/*
 * expose router
 */
var router = module.exports = require('express').Router();


/**
 * router for index
 */

/** / index页面 */
router.get('/', function(req, res) {
  res.render('index');
});

/** /search 搜索页面 */
router.get('/search', function(req, res) {
  var word = req.query.q;
  if (!word) {
    return res.redirect('/');
  }

  co(function*() {
    var text =
      yield google.search(req.query);

    // 加一个css在 </body> 前面
    text = text.replace(
      /<\/body>/i,
      "<link rel='stylesheet' href='/public/css/search.css' />$&"
    );

    res
      .type('html')
      .end(text);
  });
});

/** 跳转页面 */
router.get('/url', function(req, res) {
  var url = req.query.q;
  if (url) {
    res.redirect(url);
  }
  else {
    res.redirect('/');
  }
});

/** search页面的logo */
router.get('/webhp', function(req, res) {
  res.redirect('/');
});