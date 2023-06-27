// Require Modules 
const express = require('express');
const path = require('path');
const pug = require('pug');
const bodyParser = require('body-parser');


// Require JSON File
const myProjects = require('./data.json');


// Assign app to express 
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.engine('pug', require('pug').__express);
// Set up PUG for template engine 
app.set('views', path.join(__dirname, "views"));
// When we specify this we establish pug as our default engine so we do not need to mention any .pug extensions`
app.set('view engine', 'pug');
//  Upload Static Files to Server 
app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(express.static('images'));
app.use('/images', express.static(path.join(__dirname, 'images')));


// home route
app.get('/', (req, res) => {
    res.render('index', {projects: myProjects}); 
})


// About page 
app.get('/about', (req, res) => {
    res.render('about');
})


// Project
app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = myProjects.Projects.find(p => p.id === projectId);

    res.render('project', { project });
  });
  


// Configure Server for Heroku and localy
app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on 3000");
});