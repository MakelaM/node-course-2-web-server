const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs'); 
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


//tests
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'About Page',
        welcomeMessage: 'Welcome!',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (reg, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/projects', (reg, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (reg, res) => {
    res.send({
        errorMessage: 'Error sending request'
    });
});
app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});