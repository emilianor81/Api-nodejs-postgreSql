const express = require('express');
const router = express.Router();
const axios = require('axios');
const {BASE_URL } = require('../../constants');
const { Article , Op } = require('../db')
const { getPagination , getPagingData } = require('./pagination')


const getArticles = async (req, res)  => {
    arraySend = [];
    try{
        const articleResponses = await axios.get(`${BASE_URL}`);
        articleResponses.data.hits.forEach(async item => {
            let { created_at, title , author , points , story_id , objectID, comment_text , _tags } = item;
            let tags = ''; 
            _tags.forEach(tag => {
                tags = tags.concat(tag, ',')            
            });
            let  [article, created] = await Article.findOrCreate({
                where: { id: objectID },
                defaults: {
                    date: created_at,
                    title: title ,
                    author: author,
                    points: points,
                    story_id: story_id,
                    comment_text: comment_text,
                    tags: tags, 
                 },
                })
                
        })
        res.send('The database was loaded successfully')  
    }catch (error) {
      res.send(error); 
    }
}

const getArticlesPaginated = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Article.findAndCountAll({ limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      // console.log('ver que estoy enviando: ', response.articles)
      console.log('estoy enviando algoooo')
      res.send(response.articles);
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}


const getArticlesFiltered = (req, res) => {
    const { page, size, title , tags, author } = req.query;
    const { limit, offset } = getPagination(page, size);
    let condition = [];
    if(author){
        condition.push({ author: { [Op.like]: `%${author}%` } })
    }
    if(title){
        condition.push({ title: { [Op.like]: `%${title}%` } })
    }
    if(tags){
        condition.push({ tags: { [Op.like]: `%${tags}%` } })
    }
    Article.findAndCountAll({ limit, offset ,
        where: { [Op.and]: condition }
      })
    .then(data => { 
      const response = getPagingData(data, page, limit);
        let {totalItems, articles, totalPages, currentPage } = response
      res.send(articles);
    })
    .catch(err => {
      res.send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

const deleteArticles = async (req, res) => {
    const id = req.params.id
    try {
		const article = await Article.destroy({where: {id: id}})
		article === 1 ? res.send('Item deleted successfully') : res.send('The article does not exist')
	} catch (error) {
		res.send(error).status(404)
	}
}


module.exports = {
    getArticles,
    deleteArticles,
    getArticlesPaginated,
    getArticlesFiltered
}
