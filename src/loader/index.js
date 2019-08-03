'use strict';
const Promise = require('bluebird');
module.exports = class Loader {
  constructor(hexo) {
    this.hexo = hexo;
    this._loaders = {};
  }
  register(ext, loader) {
    if (!this._loaders[ext]) this._loaders[ext] = [];
    this._loaders[ext].push(loader);
  }
  async load(module, opts) {
    let content = opts.inline ? module.content : '';
    content = await Promise.reduce(this._loaders[module.ext] || [], (content, loader) => loader(content, opts), content);
    return content;
  }
};