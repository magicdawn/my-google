/**
 * expose google util
 */
var google = module.exports = {};

/**
 * do search
 *
 * returns Promise
 */
google.search = function(query) {

  query.ie = query.oe = 'utf-8';
  query.start = query.start || 0;
  query.hl = 'zh_CN'; // 界面语言
  query.newwindow = 1;

  return request
    .get('http://173.194.121.28/search')
    .query(query)
    .promise()
    .then(function(res) {
      return res.text;
    });
};

google.domains = [
  'http://img.youtube.com', // 油管截图
]

google.replace = function(html) {
  this.domains.forEach(function(d) {
    html = html.replace(new RegExp(d,'gi'),'');
  });
  return html;
}