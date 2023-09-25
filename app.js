// Require Modules 
const express = require('express');
const path = require('path');
const pug = require('pug');
const bodyParser = require('body-parser');


// Require JSON File
const myProjects = require('./data.json');

// Assign app to express 
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('pug', require('pug').__express);
app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


// Filtered projects route
app.post('/filterProjs', (req, res) => {
    const selectedCategory = req.body.category;

    if (selectedCategory === 'all') {
        // Redirect to the home route
        res.redirect('/');
    } else {
        // Filter the projects based on the selected category
        const projectsToSend = myProjects.Projects.filter(
            project => project.category === selectedCategory
        );

        // Render the home route with the filtered projects
        res.render('index', { projects: { Projects: projectsToSend } });
    }
});

// home route
app.get('/', (req, res) => {
    res.render('index', { projects: myProjects });
});



// About page 
app.get('/about', (req, res) => {
    res.render('about');
});


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