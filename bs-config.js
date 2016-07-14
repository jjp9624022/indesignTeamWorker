/*  "use strict";
var browserSync = require('browser-sync');

function flaskMiddleware (req, res, next) {
    // Adapted directly from Browsersync exampes:
    //   https://github.com/Browsersync/recipes/tree/master/recipes/middleware.css.injection

    var parsed = require("url").parse(req.url);
    if (parsed.pathname.match(/\api/)) {
        return goFlask(parsed.pathname).then(function (o) {
            res.setHeader('Content-Type', 'text/css');
            res.end(o.css);
        });
    }
    next();

    function goFlask(src) {
        var f = require('fs').readFileSync('app' + src).toString();
        return ; 
    }
}
*/

// module.exports = {
//     "files" : "./**/*.{html,htm,css,js}",
//     "server" : {
//         "baseDir" : "./" ,
//         "middleware" : {
//             2 : flaskMiddleware
//         }
//     },
//     "https" : false,
//     "browser" : ["google-chrome", "firefox"],
//     "watchOptions":{ ignored: 'node_modules' }
// }


var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    server: {
        middleware: {
            1: proxyMiddleware('/api', {
                target: 'http://127.0.0.1:5000',
                changeOrigin: false   // for vhosted sites, changes host header to match to target's host
            }),

            2: fallbackMiddleware({
                index: '/index.html', verbose: true
            })
        }
    }
};