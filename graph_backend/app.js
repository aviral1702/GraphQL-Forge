const bodyParser = require('body-parser');
const express  = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server');
const { default: mongoose } = require('mongoose');
const url = "mongodb+srv://aviral:1702@cluster0.i2jaaun.mongodb.net/mygraphqldata?retryWrites=true&w=majority";
const schema = require('./graphQLSchema');

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});

server.listen({port: 9000}).then(({url}) => console.log(`Server running at ${url}`));


