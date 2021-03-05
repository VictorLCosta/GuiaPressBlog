const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cnn = require('./database/context');

const categoriesController = require('./controllers/CategoriesController');
const articlesController = require('./controllers/ArticlesController');

const Article = require('./models/Article');
const Category = require('./models/Category');

// View engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('wwwroot'))

// Body parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Database conn
cnn.authenticate()
   .then(() => {
       console.log('Conexão feita');
   })
   .catch((error) => {
        console.log(error);
   });

app.use('/', categoriesController);
app.use('/', articlesController);

app.get('/', (req, res) => 
{
    Article.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render('index', {
                articles: articles,
                categories: categories
            });
        });
    });
});

app.get('/:slug', (req, res) => 
{
    var slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            res.render('article', {
                article: article
            });
        }
        else{
            res.redirect('/');
        }
    }).catch(err => {
        res.redirect('/')
    });
});

app.get('/categories/:slug', (req, res) => 
{
    var slug = req.params.slug;

    Category.findOne({
        include: [{model: Article}],
        where: {
            slug: slug
        }
    }).then(category => {
        Category.findAll().then(categories => {
            res.render('index', {
                categories: categories,
                articles: category.articles
            })
        });
    }).catch(err => {
        res.redirect('');
    });
});

app.listen(8080, () => 
{
    console.log('Servidor inicializado');
});