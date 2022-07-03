const express = require('express');
const router = express.Router();
const { Article } = require('../db')


const getPagination = (page, size) => {
    const limit = size ? +size : 5;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};

  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: articles } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, articles, totalPages, currentPage };
};

module.exports = {
    getPagination,
    getPagingData,
}