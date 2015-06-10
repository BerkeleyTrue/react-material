import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import gutil from 'gulp-util';
import through from 'through2';

var tmplt = fs.readFileSync(
  path.join(__dirname, './svgTemplate.jsx'), { encoding: 'utf8' }
);

export default function gulpReactifySVG(opts = {}) {
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-reactifySVG', 'Streaming not supported'));
      return;
    }

    const stringyFile = file.contents.toString();

    const stringyFileTemp = stringyFile
      .substr(stringyFile.indexOf('<defs>') + 6);
    const svgDefs = stringyFileTemp
      .substring(0, stringyFileTemp.indexOf('</defs>'));
    const iconArray = svgDefs.split('\n').filter(item => {
      return !!item;
    });

    const data = iconArray.map(svg => {
      return {
        svg,
        name: svg.substring(svg.indexOf('id="') + 4, svg.indexOf('">'))
      };
    });

    try {
      var compiled = _.template(tmplt, null, _.templateSettings);
      file.contents = new Buffer(compiled({ icons: data }));
      this.push(file);
    } catch (err) {
      this.emit(
        'error',
        new gutil.PluginError('gulp-reactifySVG', err, { fileName: file.path })
      );
    }

    this.push(file);
    cb();
  });
}
