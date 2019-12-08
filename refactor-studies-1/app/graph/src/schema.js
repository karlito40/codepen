const { gql } = require('micro/mods/Graph');

module.exports = gql`
"Included scalars"
scalar JSON

type Auth {
  token: String!
  user: User!
}

input LoginInput {
  pseudo: String!
  password: String!
}

type User {
  id: ID!
  pseudo: String
}

input UserInput {
  pseudo: String!
  password: String!
}

type Kast {
  id: ID!
  title: String!
  color: String!
  backgroundUrl: String
  slides: [Slide]
  nbParticipant: Int
}

input KastInput {
  title: String!
  color: String!
  userId: ID!
}

"TODO: trouver un moyen de le transformer en kast (on recoit que les champs update)"
type KastUpdatedEvent {
  id: ID!
  title: String
  color: String
  backgroundUrl: String
  nbParticipant: Int
  _changes_: [String]
}

type Slide {
  id: ID!
  title: String!
  color: String
  duplicating: Boolean
}

type SlideUpdatedEvent {
  kastId: ID!
  slide: Slide!
}

type Query {
  getMe(token: String!): User
  getKasts(userId: ID!): [Kast]
  getKast(kastId: ID!): Kast
}

type Mutation {
  duplicateKast (kastId: ID!): Kast
  createKast (input: KastInput!): Kast
  registerAuth (input: UserInput!): Auth
  login (input: LoginInput!): Auth
}


type Subscription {
  kastUpdated(kastId: ID!): KastUpdatedEvent!
  slideUpdated(kastId: ID!): SlideUpdatedEvent!
}
`;
