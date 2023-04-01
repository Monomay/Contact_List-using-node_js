const express = require('express');
const path = require('path');
// const alert = require('alert');
// const audio = new Audio("./asset/music/Baby_Crying.mp3");
// const sound = require("sound-play");
// sound.play("asset/music/Baby_Crying.mp3");
// console.log(sound.play);

const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./model/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('asset'));

// middleware

// app.use(function(req,res){
//     console.log('I called middleware');
// })


var contactList = [
    {
        name: "Monomay",
        phone: "8967996103"
    },
    {
        name: "Somnath",
        phone: "9064282382"
    },
    {
        name: "Debu",
        phone: "2364859532"
    }
]



app.get('/', function(req, res){
    // console.log(__dirname);
    // res.send('<h1>cool, it is running ! is it?</h1>');

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fetching contacts from db');
            return;
        }
        return res.render('index1', {
            title: "Contact List",
            contect_list: contacts
        });
    })
});

app.get('/practice', function(req, res){
    return res.render('practice', {
        title: "Monomay is playing"
    });
});

app.post('/new_contact', function(req, res){
    // return res.redirect('/practice');
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);


    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(err, newContact){
        if(err){
            console.log('error in creating a contact');
            return;
        }
        console.log('#######', newContact);
        return res.redirect('/');
    })

    // return res.redirect('/');

});

app.get('/delete-contact/', function(req, res){

    // console.log(req.query);
    // let phone = req.query.phone;
// get the id from query in the url
    let id = req.query.id;
// find the contact using id and deleting from db
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting object in db');
            return;
        }
    return res.redirect('back');
    })

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex != -1){
    //     contactList.splice(contactIndex, 1);
        
    // }
    // alert('hey google');
    // return res.redirect('back');

});

// app.get('delete-button', function(req, res){
//     if()
    
// })




app.listen(port, function(err){
    if(err){
        console.log('Error in running in the server', err);
    }
    console.log('Yup! My first express server is running on port', port);
});