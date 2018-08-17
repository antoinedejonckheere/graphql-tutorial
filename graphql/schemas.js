const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList } = require('graphql')
const { resolver,  attributeFields } = require('graphql-sequelize')

const models = require('../models/index')

const placeType = new GraphQLObjectType({
  name: 'Place',
  description: 'A user',
  fields: Object.assign({}, attributeFields(models.place))
});


let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      place: {
        type: placeType,
        // args will automatically be mapped to `where`
        args: {
          id: {
            description: 'id of the place',
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve: resolver(models.place)
      },
      placeSearch: {
        type: new GraphQLList(placeType),
        args: {
          query: {
            description: "Fuzzy-matched name of user",
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        resolve: resolver(models.place, {
          before: (findOptions, args) => {
            findOptions.where = {
              name: { "$like": `%${args.query}%` },
            };
            findOptions.order = [['name', 'ASC']];
            return findOptions;
          },

        })
      }
    }
  })
});

module.exports = schema
