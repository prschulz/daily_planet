var express = require('express'),
app = express(),
bodyParser = require('body-parser');

app.set('view engine','ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


//WHY CAN'T THIS BE A VAR
articles = [
 {id:1, title:"awesome first post", body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, et. Similique ipsam consequuntur officia accusantium voluptatibus laudantium voluptate magni ipsa ullam cupiditate autem hic assumenda, ab, velit quo delectus recusandae."},
  {id:2, title:"awesome second post", body:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo molestias fugit eius voluptatibus repellat distinctio laboriosam debitis iure explicabo aperiam doloremque asperiores quis obcaecati, vel tempora, delectus nesciunt ipsa saepe."}];

count = 3;

app.get('/', function(req,res){
  res.render('index.ejs');
});

app.get('/articles', function (req, res) {
  res.render('articles.ejs',{articles:articles});
});

app.get('/contact', function(req,res){
  res.render('contact.ejs');
});

app.get('/about', function(req,res){
  res.render('about.ejs');
});

//render page to add new article
app.get('/articles/new', function (req, res) {
  res.render('newarticle.ejs');
});

//add new article to article array
app.post('/articles/new',function(req,res){
  var article = {};
  article.title = req.body.article.title;
  article.body = req.body.article.body;
  article.id = count;
  // console.log(article);
  articles.push(article);
  count ++;
  res.render('articles.ejs');
});

//display individual articles
app.get('/articles/:id', function (req, res) {
  var articleID = Number(req.params.id);
  var foundArticle;
  articles.forEach(function(article){
    if(article.id === articleID){
      foundArticle = article;
    }
  });
  res.render('article.ejs',{article: foundArticle});
});


//listener to launch node server
app.listen(3000, function(){
  console.log("Server is listening on port 3000");
});