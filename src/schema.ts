export const typeDefs = `#graphql

type Book{
    id: ID!
    title: String!
    author: String!
    year: Int!
    reviews: [Review!]
}

type Review {
    id: ID!
    book: Book!
    rating: Int!
    comment: String!
}

type Query {
    books: [Book!]!
    book(id: ID!): Book!
    reviews: [Review!]!
    review(id: ID!): Review!
}

type Mutation {
    addBook(book: BookInput): Book!
    addReview(review: ReviewInput): Review!
    editReview(editReview: EditReviewInput, id: ID!): Review!
    deleteReview(id: ID!): Review!
    editBook(editBook: EditBookInput, id: ID!): Book!
    deleteBook(id: ID!): Book!
}

input BookInput {
    title: String!
    author: String!
    year: Int!
}

input ReviewInput {
    book_id: ID!
    rating: Int!
    comment: String!
}

input EditReviewInput {
    rating: Int!
    comment: String!
}

input EditBookInput {
    title: String!
    author: String!
    year: Int!
}

`;