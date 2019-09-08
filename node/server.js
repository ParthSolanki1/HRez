const express = require('express');
const sqlite = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const app = express();
const dbpath = '/home/parth/Desktop/Angular Workspace/HReasy/HReasy/users.db';
const db = new sqlite.Database(dbpath, sqlite.OPEN_READWRITE, (e) => {
    if(e){
        return console.error(e.message);
    }
    console.log('database connected')
})

var username;

/*
*
*
*
Sign-up backend
*
*
*
*/

var userExists = true;
var emailExists = true;

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

function checkUserExistence(req) {
    const checkUsername = 'SELECT * FROM users WHERE username=?';

    function success(rows) {
        if(typeof rows !== 'object'){
            console.log("username doesn't exit");
            userExists = false;
        }
    }

    return new Promise(function(resolve, reject) {
        db.get(checkUsername, [req.body.username.toLowerCase()], (err, rows) => {
            if(err) {
                reject(e.message);
            } else {
                resolve(success(rows));
            }
        })
    });
}

function checkEmailExistence(req) {
    const checkEmail = 'SELECT * FROM users WHERE email=?';

    function success(rows) {
        if(typeof rows !== 'object'){
            console.log("email doesn't exit");
            emailExists = false;
        }
    }

    return new Promise(function(resolve, reject) {
        db.get(checkEmail, [req.body.email], (err, rows) => {
            if(err) {
                reject(e.message);
            } else {
                resolve(success(rows));
            }
        })
    });
}



//middleware that takes json data sent in request and turns to object 
app.use(express.json());

app.post('/api/register', (req, res) => {

    userExists = true;
    emailExists = true;

    checkUserExistence(req).then(function() {
        checkEmailExistence(req).then(function() {
            if(!userExists && !emailExists) {
                let key = makeid(15);
                let sql = "INSERT INTO users VALUES (?, ?, ?, ?, ?, 'no', ?)"

                db.run(sql, [req.body.username.toLowerCase(), req.body.password, req.body.email, req.body.firstName, req.body.lastName, key], (e) => {
                    if(e) {
                        return console.error(e.message);
                    }

                    console.log('registration successful');
                });

                console.log(req.body.email);

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'hreasy9@gmail.com',
                        pass: 'HReasy123'
                    }
                    });

                var link = "http://localhost:4200/api/verify?id="+key;
                console.log(key);
                    
                var mailOptions = {
                    from: 'hreasy9@gmail.com',
                    to: req.body.email,
                    subject: 'Verify Email',
                    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
                };
                
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }

            res.send({userExists: userExists, emailExists: emailExists});
        })
    });
});

app.get('/api/verify', (req, res) => {
    let sql = "UPDATE users SET confirmed='yes' WHERE key=? AND confirmed='no'";

    db.run(sql, [req.query.id], (err) => {
        if(err){
            console.log(err)
        }
        console.log('verified account');
    });

    res.redirect('http://localhost:4200/');
});

/*
*
*
*
Login
*
*
*
*/

var usernameSession;
var passwordIncorrect = false;
var verifyComplete = true;
var FirstName;
var LastName;

function loginCheck(req) {
    let sql = "SELECT confirmed, password, firstName, lastName FROM users WHERE username=?;"
    userExists = true;
    passwordIncorrect = false;
    verifyComplete = true

    function success(rows) {
        if(typeof rows !== 'object'){
            userExists = false;
        } else if(rows.confirmed === "no") {
            verifyComplete = false;
        } else if(rows.password !== req.body.password){
            passwordIncorrect = true;
        } else {
            FirstName = rows.firstName;
            LastName = rows.lastName;
        }
    }

    return new Promise(function(resolve, reject) {
        db.get(sql, [req.body.username.toLowerCase()], (err, rows) => {
            if(err) {
                reject(err.message);
            } else {
                resolve(success(rows));
            }
        })
    });
}

app.post('/api/login', (req, res) => {

    loginCheck(req).then(function(){
        if(userExists && !passwordIncorrect && verifyComplete) {
            usernameSession = req.body.username;
        }

        res.send({userExists: userExists, passwordIncorrect: passwordIncorrect, verifyComplete: verifyComplete, firstName: FirstName, lastName: LastName});
    });

});


app.get('/api/logout', (req, res) => {
    let done = true;
    res.send(done);
});

var user;

function getinfo(username) {
    let sql = "SELECT firstName, lastName FROM users WHERE username=?"

    function success(first, last) {
        user = {firstName: first, lastName: last};
    }

    return new Promise((resolve, reject) => {
        db.get(sql, [username], (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(success(rows.firstName, rows.lastName));
            }
        });
    })
}

app.get('/api/userinfo', (req, res) => {
    getinfo(usernameSession).then(
        res.send(user)
    );
});

/*
*
*
*
CREATING TEAMS
*
*
*
*/

function addTeam(req) {
    let sql = "INSERT INTO teams VALUES (?, ?, ?, ?, ?, ?, ?)"
    let key = makeid(15);

    return new Promise((resolve, reject) => {
        db.run(sql, [key, req.body.name, usernameSession, req.body.user1, req.body.user2, req.body.user3, req.body.user4], (err) => {
            if(err) {
                reject(err);
            } else {
                resolve(console.log('team entered'));
            }
        });
    });
}

function getsql(length){
    if(length === 1){
        return 'SELECT * FROM users WHERE username=?'
    } else if (length === 2) {
        return 'SELECT * FROM users WHERE username=? OR username=?'
    } else if (length === 3) {
        return 'SELECT * FROM users WHERE username=? OR username=? OR username=?'
    } else {
        return 'SELECT * FROM users WHERE username=? OR username=? OR username=? OR username=?'
    }
}

var result=[];

function checkUserValid(sql, users, res) {
    result = []

    function success(rows) {
        let key = makeid(15);

        for(let i=0; i<rows.length; i++){
            if(rows[i].confirmed === 'yes'){
                result.push(rows[i].username);
            }
        }
        
        res.send({verifiedUsers: result});
    }

    return new Promise((resolve, reject) => {
        db.all(sql, users, (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(success(rows, users, res));
            }
        })
    })
}

app.post('/api/create', (req, res) => {
    let users = []
    result = [];

    if(req.body.user1 && req.body.user1 != ""){
        users.push(req.body.user1);
    }

    if(req.body.user2 && req.body.user2 != ""){
        users.push(req.body.user2);
    }

    if(req.body.user3 && req.body.user3 != ""){
        users.push(req.body.user3);
    }

    if(req.body.user4 && req.body.user4 != ""){
        users.push(req.body.user4);
    }

    let sql = getsql(users.length);

    checkUserValid(sql, users, res).then(console.log(result));
});

function insertTeam(sql, params) {
    return new Promise((resolve, reject) => {
        db.run(sql, params, (err) => {
            if(err){
                reject(console.log(err));
            } else {
                resolve('added team');
            }
        });
    });
}

app.post('/api/createTeam', (req, res) => {
    let users = []

    if(req.body.user1 && req.body.user1 != ""){
        users.push(req.body.user1);
    }

    if(req.body.user2 && req.body.user2 != ""){
        users.push(req.body.user2);
    }

    if(req.body.user3 && req.body.user3 != ""){
        users.push(req.body.user3);
    }

    if(req.body.user4 && req.body.user4 != ""){
        users.push(req.body.user4);
    }

    let sql = ""

    if(users.length === 1) {
        sql = 'INSERT INTO teams (user1, user2, name, key) VALUES (?, ?, ?, ?)';
    } else if(users.length === 2) {
        sql = 'INSERT INTO teams (user1, user2, user3, name, key) VALUES (?, ?, ?, ?, ?)';
    } else if(users.length === 3) {
        sql = 'INSERT INTO teams (user1, user2, user3, user4, name, key) VALUES (?, ?, ?, ?, ?, ?)';
    } else {
        sql = 'INSERT INTO teams (user1, user2, user3, user4, user5, name, key) VALUES (?, ?, ?, ?, ?, ?, ?)';
    }

    users.push(usernameSession);
    users.push(req.body.name);
    users.push(makeid(15));

    insertTeam(sql, users).then(res.send(true));
})

/*
*
*
*
VIEW CHATS
*
*
*
*/

function getTeams(req, res) {
    let sql = "SELECT * FROM teams WHERE user1=? OR user2=? OR user3=? OR user4=? OR user5=?";

    function success(res, rows) {
        res.send({allTeams:rows});
    }

    return new Promise((resolve, reject) => {
        db.all(sql, [usernameSession, usernameSession, usernameSession, usernameSession, usernameSession], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(success(res, rows));
            }
        });
    });
}

app.get('/api/teams', (req, res) => {
    getTeams(req, res).then(console.log('info on teams sent back'));
})

/*
*
*
*
CHAT ROOM 
*
*
*
*/

function writeMessage(req) {
    let sql = 'INSERT INTO messages VALUES (?, ?, ?)';

    return new Promise((resolve, reject) => {
        db.run(sql, [req.body.key, usernameSession, req.body.message], (err) => {
            if(err){
                reject(err);
            } else {
                resolve(console.log('message stored'));
            }
        })
    });
}

app.post('/api/writeMessage', (req, res) => {
    writeMessage(req).then(
        res.send(true)
    );
})

function sendMessages(req, res) {
    let sql = 'SELECT * FROM messages WHERE teamKey=?'

    function success(rows, res){
        res.send({messages: rows});
    }

    return new Promise((resolve, reject) => {
        db.all(sql, [req.body.key], (err, rows) => {
            if(err){
                reject(err);
            } else {
                resolve(success(rows, res));
            }
        });
    });
} 

app.post('/api/messages', (req, res) => {
    sendMessages(req, res).then(console.log('messages sent'));
});

app.listen(3000);
