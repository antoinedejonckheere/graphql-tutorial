var express = require('express');
const Sequelize = require('sequelize')
var graphqlHTTP = require('express-graphql');
var {
  buildSchema,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString } = require('graphql');

const models = require('./models/index')
const defineSchema = require('./graphql/schemas')

// Construct a schema, using GraphQL schema language

// This class implements the RandomDie GraphQL type

// The root provides the top-level API endpoints

models.sequelize.sync({ force: true })
  .then(() => {
    console.log('Connection has been established successfully.');
    const app = express();
    app.use('/graphql', graphqlHTTP({
      schema: defineSchema,
      // rootValue: root,
      graphiql: true,
    }));
    app.listen(4000);
    models.place.create({
      name: 'dummy',
      description: 'even more dummy!'
    })
    console.log('Running a GraphQL API server at localhost:4000/graphql');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
