const path = require('path');
const runRootPath = path.join(__dirname,'../');
const staticPath = path.join(runRootPath, 'static');
const tempPath = path.join(runRootPath, 'static/temp');
const tempPathPrefix = '/static/temp/';
const port = "3001";
const limit = '800mb';
const staticDirs = ['/js', '/img', '/node_modules', '/dist', '/static'];


module.exports = {
  runRootPath,
  port,
  limit,
  staticDirs,
  staticPath,
  tempPath,
  tempPathPrefix
};
