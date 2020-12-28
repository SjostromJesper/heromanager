const mongoose = require('mongoose');
const User = require('./schemas/UserSchema.js')

const uri = "mongodb+srv://beppe:Gaffeltruck123@cluster0.0cwsl.gcp.mongodb.net/heromanager2020?retryWrites=true&w=majority";

module.exports = class MongoDB {

    startServer(startFunction) {
        mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }).then(result => {
            console.log("connected to db")
            startFunction()
        }).catch(error => {
            console.log(error)
        })
    }

    getUser(email, userCallback) {
        User.findOne({'local.email': email}, (err,result) => {
            console.log("THIS")
            console.log(result)
            userCallback(new User(result));
        });
    }

    getAllUsers() {
        User.find().then(result => {
            console.log(result)
        })
    }

    updateUser(user) {
        user.save().then(result => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }

    addTestUsers() {
        // TODO: fixa fälten

        const viktor = new User({
            local: {
                email: "aequonox@gmail.com",
                hash: "",
                salt: ""
            },
            name: "Viktor",
        })

        viktor.setPassword("Gaffeltruck123");

        viktor.save().then(result => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })

        const jesper = new User({
            local: {
                email: "jesper.t.sjostrom@gmail.com",
                hash: "",
                salt: ""
            },
            name: "Beppe"
        })
        jesper.setPassword("Gaffeltruck123");

        jesper.save().then(result => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }
}



