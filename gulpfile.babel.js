/* Импортируем галп. Очевидно, но за то последовательно */
import gulp from 'gulp';

/* Вспомогательные модули */
import fs from 'fs';
import del from 'del';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';

/* Модули для работы со стилями */
import sass from 'gulp-sass';
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";

/* Модули для работы с JavaScript */
import rollup from 'rollup-stream';
import source from 'vinyl-source-stream';
import babel from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';
import uglify from "gulp-uglify";

/* Модули для работы с шаблонами Handlebars */
import mergeJson from 'gulp-merge-json';
import Handlebars from 'handlebars';
import handlebarsLayouts from 'handlebars-layouts';
import handlebarsCompile from 'gulp-compile-handlebars';

/* Просто сокращённая запись ради удобства, ничего более */
const reload = browserSync.reload;

/* Определяем все пути */
const path = {
  src: 'app',
  dest: 'dist'
}

/* Тут нужно прокомментировать ;) */
handlebarsLayouts.register(Handlebars);

/* ИМХО как-то не очень пахнет такая конструкция */
Array.prototype.remove = function (value) {
  let idx = this.indexOf(value);
  if (idx != -1) {
    // Второй параметр - число элементов, которые необходимо удалить
    return this.splice(idx, 1);
  }
  return false;
}

/* Регистрация хелпера для Handlebars */
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

/* Регистрация хелпера для Handlebars */
Handlebars.registerHelper('ifCond', (vs1, vs2, options) => {
	if(vs1 === vs2) {
		return options.fn(this);
	}
	return options.inverse(this);
});

/* Регистрация хелпера для Handlebars */
Handlebars.registerHelper('repeat', (items, from, to, incr, options) => {
    let int = '';
    for(let i=from; i<to; i+=incr)
        int+=options.fn(items[i]);
    return int;
});

/* [TASK] Запускаем сервер browserSync */
gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: path.dest
    }
  });
});

/* [TASK] Компилируем SASS */
gulp.task('sass', () => {
  return gulp.src(`${path.src}/assets/sass/**/*.scss`)
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(gulp.dest(`${path.dest}/css`));
});

/* [TASK] Копирование CSS */
gulp.task('css', () => {
  gulp.src(`${path.src}/css/*.css`)
  .pipe(gulp.dest(`${path.dest}/css`));
});

/* [TASK] Слияние файлов JSON */
gulp.task('merge', () => {
	gulp.src([
    `${path.src}/assets/data/**/*.json`,
		!path.src + 'assets/data/all.json'
	])
	.pipe(plumber())
	.pipe(mergeJson('all.json'))
	.pipe(gulp.dest(`${path.src}/assets/data`));
});

/* [TASK] Обработка шаблонов Handlebars */
gulp.task('handlebars', ['merge'], () => {
	let data = JSON.parse(fs.readFileSync(`${path.src}/assets/data/all.json`));
	let options = {
    ignorePartials: true,
    batch : [
      `${path.src}/assets/tpl/layouts`,
      `${path.src}/assets/tpl/modules`
    ]
  }
  return gulp.src([
    `${path.src}/assets/tpl/pages/**/*.{hbs,handlebars}`
	])
	.pipe(handlebarsCompile(data, options))
	.pipe(rename({
		extname: '.html'
	}))
	.pipe(gulp.dest(path.dest));
});

/* [TASK] Компиляция и сборка ES6 скриптов */
gulp.task('scripts', () => {
  return rollup({
    entry: `${path.src}/js/main.js`,
    plugins: [json(), babel()]
  }).pipe(source('main.js'))
  .pipe(gulp.dest(`${path.dest}/js`));
});

/* [TASK] Сборка с отслеживанием изменения для удобной разработки */
gulp.task('watch', ['css', 'browser-sync', 'handlebars', 'sass', 'scripts'], () => {
  gulp.watch(`${path.src}/assets/tpl/**/*.{hbs,handlebars}`, ['handlebars', reload]);
	gulp.watch(`${path.dest}/*.html`, reload);
  gulp.watch(`${path.src}/assets/sass/**/*.scss`, ['sass', reload]);
  gulp.watch(`${path.src}/js/**/*.js`, ['scripts', reload]);
});

/* [TASK] Сборка без отслеживания (Сборка в продакшен) */
gulp.task('default', ['css', 'handlebars', 'sass', 'scripts']);
