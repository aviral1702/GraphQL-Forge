const express  = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const schema = require('./graphQLSchema');
const url = "mongodb+srv://aviral:1702@cluster0.i2jaaun.mongodb.net/";
mongoose.connect(url)
.then((result) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database');
});

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});

server.listen({port: 9000}).then(({url}) => console.log("Server is running"));
mongoose.exports = mongoose;