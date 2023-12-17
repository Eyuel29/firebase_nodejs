const express = require("express");
const bodyParser = require('body-parser');
const ejsLayout = require('express-ejs-layouts');
const ejs = require('ejs');
const { createData, readAllData , readData, updateData, removeData } = require('./dao');

const app = express();
app.set('PORT',3800);

const logger = (req, res, next) =>{
    console.log(`Received ${req.method} request to ${req.path}`);
    next();
}

app.use(logger);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended :false}));
app.use(ejsLayout);
app.set('view engine','ejs');   
app.set('views', __dirname + '/views');
app.set('layout', './layouts/main');


app.get('[/]?[a-zA-Z0-9\-_\/]*?',async (req, res, next) =>{
    let path = req.path.toLocaleLowerCase();
    switch (path) {
        case '/add':
            res.render('form');
            res.end();
            break;
        case '/' :
            res.redirect('/add');
            res.end();      
            break;  
        case '/view' :
            const result = await readAllData();
            res.render('list',{ result : result });
            res.end();
            break;
        case '/contact':
            res.render('contact');
            res.end();
            break;
        default:
            res.send('404 - Not Found');
            res.end();
            break;
    }
});

app.post('[/]?[a-zA-Z0-9\-_\/]*?',async (req, res, next) =>{
    let path = req.path.toLocaleLowerCase();
    switch (path) {
        case '/add':
            const dataAdd = {
                "noteTitle" :req.body.noteTitle,
                "noteBody" : req.body.noteBody,
            }
            await createData(dataAdd);
            console.log("Data added successfully!");
            res.redirect('/');
            res.end();
        break;

        case '/updateform':
            let idForm = req.body.id;
            const doc = await readData(idForm);
            const val = {
                "noteTitle" : doc.noteTitle,
                "noteBody" : doc.noteBody,
                "todoId" : idForm,
            }
            res.render('edit',{ val : val });
            res.end();
            break;

        case '/update':
            const idUpdate = req.body.id;
            const dataUpdate = {
                "noteTitle": req.body.noteTitle,
                "noteBody": req.body.noteBody,
            }
            await updateData(idUpdate, dataUpdate);
            res.redirect('/view');
            res.end();
            break;

        case '/delete': 
            const id = req.body.id;
            await removeData(id);
            res.redirect('/view');
            res.end();
            break;
        default:
            res.send('404 - Not Found');
            res.end();
            break;
    
    }
});


app.listen(process.env.PORT || (app.get('PORT')), (err) =>{ 
    console.log("server runnig on port : " + app.get('PORT')); 
});
