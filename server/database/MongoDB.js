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

    getUser() {

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

    addNewUser() {
        // TODO: fixa fälten

        const user = new User({
            id: "karlsson"
        })

        user.save().then(result => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }
}



