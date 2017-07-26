var metalsmith = require('metalsmith');
var markdown = require('metalsmith-markdown');
//var markdown = require('metalsmith-markdown-sections');
var layouts = require('metalsmith-layouts');
var handlebars = require('handlebars');
var collections = require('metalsmith-collections');
var permalinks = require('metalsmith-permalinks');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');
var helpers = require('metalsmith-register-helpers');
var dirHierarchy = require( 'metalsmith-directory-hierarchy' );
//var debugUi = require('metalsmith-debug-ui');
var debug = require('metalsmith-debug');

metalsmith(__dirname)
    .metadata({
        site: {
            name: 'VALHelpMe',
            description: "VAL Help Me Repository"
        }
    })
    .source('./src')
    .destination('./build')
    .use(collections({
        Dashboard:{
            pattern: ['dashboard/**/.md','dashboard/**/**/.md','dashboard/**/**/.html'],
            sortBy: 'date',
            reverse: true,
            refer:false
        },
        Repository:{
            pattern: ['repository/**/.md','repository/**/**/.md','repository/**/**/.html'],
            sortBy: 'date',
            reverse: true,
            refer:false
        },
        UserProfile:{
            pattern: ['userProfile/**/.md','userProfile/**/**/.md','userProfile/**/**/.html'],
            sortBy: 'date',
            reverse: true,
            refer:false
        }
    }))
    .use(dirHierarchy({
        "name" : "hierarchy",       // the name of the metalsmith metadata property
        "test" : /\.md?$|\.html?$/           // regex to match files to include in hierarchy
    }))
    .use(markdown({
        smartypants: true,
        gfm: true,
        tables: true
    }))
    .use(permalinks({
        relative:false,
        pattern:'/:collections/:title'
    }))
    .use(helpers({
        directory: './node_modules/handlebars-helpers/lib/'
    }))
    .use(layouts({
        engine: 'handlebars',
        directory: './layouts',
        //default: 'article.html',
        default: 'index.html',
        pattern: ["**/**/**/*.html,**/**/*.html","**/*.html","*.html"],
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    }))
    //.use(serve({
    //    port: 8081,
    //    verbose: true
    //}))
    //.use(watch({
    //    paths: {
    //        "${source}/**/*":true,
    //        "layout/**/*": "**/*",
    //    }
    //}))
    .build(function (err,files) {
        if (err) {
            console.log(err);
        }
        else {
            console.log('FTBCVALHelp built!');
        }
    });