'use sctrict'

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync');
const mergeJson = require('gulp-merge-json');
const Handlebars = require('handlebars');
const handlebarsLayouts = require('handlebars-layouts');
const handlebarsCompile = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const rollup = require('rollup-stream');
const source = require('vinyl-source-stream');
const json = require('rollup-plugin-json');
const babel = require('rollup-plugin-babel');


// APP config
let dir = {
  src: 'app/',
  dest: 'dist/'
}

// Start browserSync server
gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: dir.src
        }
    });
});

// SASS
gulp.task('sass', () => {
    return gulp.src(dir.src + 'assets/sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(dir.src + 'css'));
});

handlebarsLayouts.register(Handlebars);


Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}

Handlebars.registerHelper('carousel', (items, options) => {

	let attributes = ['class="carousel"'];
	let item = items.length;

	for (var attributeName in options.hash) {

    	if (attributeName === 'class' || attributeName === 'class' && 'i') {
    		attributes.remove('class="carousel"');
    		attributes.push('class="carousel ' + options.hash[attributeName] + '"');
    	} else if (attributeName === 'i') {
    	} else {
    		attributes.push(attributeName + '="' + options.hash[attributeName] + '"');
    	}
    }

    if (attributeName === 'i') {
		let item = options.hash[attributeName];
	}

    let body = '<div ' + attributes.join(' ') + '>';

	for(let i=0, l=item; i<l; i++) {
		body = body + '<div class="carousel-item">' + options.fn(items[i]) + '</div>';
	}

    return new Handlebars.SafeString(body + '</div>');
});

Handlebars.registerHelper('ifCond', (vs1, vs2, options) => {
	if(vs1 === vs2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

Handlebars.registerHelper('repeat', (items, from, to, incr, options) => {
    let int = '';
    for(let i=from; i<to; i+=incr)
        int+=options.fn(items[i]);
    return int;
});

// + socials


let reload = browserSync.reload;
let del = require('del');
let fs = require('fs');




// Merge JSON
gulp.task('merge', () => {
	gulp.src([
		dir.src + 'assets/data/**/*.json',
		!dir.src + 'assets/data/all.json'
	])
	.pipe(plumber())
	.pipe(mergeJson('all.json'))
	.pipe(gulp.dest(dir.src + 'assets/data'));
});



// Handlebars compile
gulp.task('handlebars', ['merge'], () => {

	let data = JSON.parse(fs.readFileSync(dir.src + 'assets/data/all.json'));

	let options = {
        ignorePartials: true,
        batch : [
        	dir.src + 'assets/tpl/layouts',
      		dir.src + 'assets/tpl/modules'
        ]
    }

    return gulp.src([
			dir.src + 'assets/tpl/pages/**/*.{hbs,handlebars}'
		])
		.pipe(handlebarsCompile(data, options))
		.pipe(rename({
			extname: '.html'
		}))
		.pipe(gulp.dest(dir.src));
});

gulp.task('scripts', () => {
  return rollup({
    entry: './app/js/main.js',
    plugins: [json(), babel()]
  }).pipe(source('main.js'))
  .pipe(gulp.dest('dist'));
});

// Watch for file changes
gulp.task('default', ['browser-sync', 'handlebars', 'sass', 'scripts'], () => {
	gulp.watch(dir.src + 'assets/tpl/**/*.{hbs,handlebars}', ['handlebars', reload]);
	gulp.watch(dir.src + '*.html', reload);
  gulp.watch(dir.src + 'assets/sass/**/*.scss', ['sass', reload]);
  gulp.watch(`${dir.src}js/**/*.js`, ['scripts', reload]);
});
