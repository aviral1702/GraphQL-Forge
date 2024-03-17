const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const url = "mongodb+srv://aviral:1702@cluster0.i2jaaun.mongodb.net/";
mongoose.connect(url)
.then((result) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log('Error connecting to the database');
});
const schema = require('./graphQLSchema');

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers
});

server.listen({port: 9000}).then(({url}) => console.log(`Server running at ${url}`));
mongoose.exports = mongoose;

