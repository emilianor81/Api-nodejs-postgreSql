const { Router } = require('express');
const axios = require('axios');


const { getArticles, deleteArticles , getArticlesFiltered , getArticlesPaginated} = require('../controllers/index.controllers')

const router = Router();

router.post('/articles' , getArticles); //check the Api for new article and save them in the DB
router.delete('/articles/:id', deleteArticles) //delete sent articles
router.get('/articles/filtered', getArticlesFiltered)//show articles filtered for tags, author & title
router.get('/articles', getArticlesPaginated ) //show all articles paginated



module.exports = router;