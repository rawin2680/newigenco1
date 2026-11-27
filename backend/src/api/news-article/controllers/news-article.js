"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { factories } = require("@strapi/strapi");
function publicNews(article) {
  if (!Array.isArray(article.blocks)) return article;
  return { ...article, blocks: article.blocks.filter(block => block?.visible === true) };
}
exports.default = factories.createCoreController('api::news-article.news-article', () => ({
  async find(ctx) {
    ctx.query.status = 'published';
    const result = await super.find(ctx);
    return { ...result, data: result.data.map(publicNews) };
  },
  async findOne(ctx) {
    ctx.query.status = 'published';
    const result = await super.findOne(ctx);
    return { ...result, data: result.data ? publicNews(result.data) : result.data };
  }
}));
