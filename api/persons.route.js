// persons.route.js
const express = require('express');
const userRoutes = express.Router();

// Require Business model in our routes module
let User = require('./models/user.model');

// Defined get data(index or listing) route
userRoutes.route('/users').get(function (req, res) {
    User.find(function(err, users){
        if(err){
            console.log(err);
        }
        else {
            res.json(users);
        }
    });
});

// Defined edit route
userRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, business){
        res.json(business);
    });
});

//  Defined update route
userRoutes.route('/update/:id').post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send("data is not found");
        else {
            user.email = req.body.email;
            user.password = req.body.password;
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.jobs_count = req.body.jobs_count;
            user.active = req.body.active;
            user.slack_username = req.body.slack_username;

            user.save().then(business => {
                res.json('Update complete');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

// Defined delete | remove | destroy route
userRoutes.route('/delete/:id').get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = userRoutes
