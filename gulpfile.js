var gulp = require('gulp');
var bump = require('gulp-bump');
var protractor = require("gulp-protractor").protractor;
var webdriver_standalone = require("gulp-protractor").webdriver_standalone;
var webdriver_update = require("gulp-protractor").webdriver_update;
var reporter = require("gulp-protractor-cucumber-html-report");
var gutil = require('gulp-util');
var minimist = require('minimist');
var configFile = require('./conf.js');

var knownOptions = {
    string: 'env',
    string: 'specs',
    default: { env: process.env.NODE_ENV || 'sit',specs:'*.feature' }
};
var options = minimist(process.argv.slice(2), knownOptions);
if(options.env == "dev"){
    var baseUrl = 'http://cafetownsend-angular-rails.herokuapp.com/login';
}

gulp.task('webdriver-start', webdriver_standalone);

gulp.task('webdriver-update', webdriver_update);

gulp.task("execute", function () {
    return gulp.src([])
        .pipe(protractor({
            configFile: "./conf.js",
            args: ['--params.website.baseUrl='+baseUrl,'--specs='+configFile.config.specs]
        })).on('error', (err) => {
            gutil.log(gutil.colors.red('Error (' + err.plugin + '): ' + err.message));
            gulp.start('report',function() {
                gutil.log(gutil.colors.magenta('Starting Report generation on error'));
            });
          }).on('end',  function() {
            gutil.log(gutil.colors.magenta('Starting Report generation on end'));
            gulp.start('report');
        });
    }
);

gulp.task("report", function () {
    gulp.src("./reports/cucumber-test-results.json")
        .pipe(reporter({
            dest: "reports"
        }));
});

gulp.task('cucumber-xml:report', function() {
    gulp.src('./reports/cucumber-test-results.json')
        .pipe(cucumberXmlReport({strict: true}))
        .pipe(gulp.dest('reports'));
});

gulp.task('bump-version', function () {
// We hardcode the version change type to 'patch' but it may be a good idea to
// use minimist (https://www.npmjs.com/package/minimist) to determine with a
// command argument whether you are doing a 'major', 'minor' or a 'patch' change.
    return gulp.src(['./package.json'])
        .pipe(bump({type: "minor"}))
        .pipe(gulp.dest('./'));
});

function cucumberXmlReport(opts) {
    var gutil = require('gulp-util'),
        through = require('through2'),
        cucumberJunit = require('cucumber-junit');

    return through.obj(function (file, enc, cb) {
        // If tests are executed against multiple browsers/devices
        var suffix = file.path.match(/\/cucumber-?(.*)\.json/);
        var xml = cucumberJunit(file.contents, opts);
        file.contents = new Buffer(xml);
        file.path = gutil.replaceExtension(file.path, '.xml');
        cb(null, file);
    });
}