// Require Modules 
const express = require('express');
const path = require('path');
const pug = require('pug');
const bodyParser = require('body-parser');


const myProjects = require('./data.json');

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
        res.redirect('/');
    } else {
        const projectsToSend = myProjects.Projects.filter(
            project => project.category === selectedCategory
        );
        res.render('index', { projects: { Projects: projectsToSend } });
    }
});

app.get('/', (req, res) => {
    res.render('index', { projects: myProjects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const projectId = req.params.id;
    const project = myProjects.Projects.find(p => p.id === projectId);

    res.render('project', { project });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on 3000");
});