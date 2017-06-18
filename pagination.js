var url = require('url')
  , qs = require('querystring');

/**
 * Pagination helper
 *
 * @param {Number} pages
 * @param {Number} page
 * @return {String}
 * @api private
 */

function createPagination (req) {
  return function createPagination (pages, page) {
    var params = qs.parse(url.parse(req.url).query)
    var str = ''

    params.page = 1
    var clas = page == 1 ? "active" : "no"

    for (var p = 1; p <= pages; p++) {
      params.page = p
      clas = page == p ? "active" : "no"

      var href = '?' + qs.stringify(params)

      str += '<li class="'+clas+'"><a href="'+ href +'">'+ p +'</a></li>'
    }

    return str
  }
}

module.exports = createPagination;