const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cnn = require('./database/context');

const categoriesController = require('./controllers/CategoriesController');
const articlesController = require('./controllers/ArticlesController');

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
    res.render('index');
});

app.listen(8080, () => 
{
    console.log('Servidor inicializado');
});