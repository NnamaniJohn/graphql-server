import {ApolloServer} from "@apollo/server";
import {startStandaloneServer} from "@apollo/server/standalone";
import {typeDefs} from "./schema.js";
import {books, reviews} from "./data.js";

const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args) => books.find(book => book.id === Number(args.id)),
        reviews: () => reviews,
        review: (parent, args) => reviews.find(review => review.id === Number(args.id)),
    },
    Book: {
        reviews: (parent) => reviews.filter(review => review.book_id === parent.id)
    },
    Review: {
        book: (parent) => books.find(book => book.id === parent.book_id)
    },
    Mutation: {
        addBook: (parent, args) => {
            const newBook = {
                id: books.length + 1,
                title: args.book.title,
                author: args.book.author,
                year: args.book.year
            }
            books.push(newBook);
            return newBook;
        },
        addReview: (parent, args) => {
            const newReview = {
                id: reviews.length + 1,
                book_id: Number(args.review.book_id),
                rating: args.review.rating,
                comment: args.review.comment
            }
            reviews.push(newReview);
            return newReview;
        },
        editReview: (parent, args) => {
            const review = reviews.find(review => review.id === Number(args.id));
            review.rating = args.editReview.rating;
            review.comment = args.editReview.comment;
            return review;
        },
        deleteReview: (parent, args) => {
            const review = reviews.find(review => review.id === Number(args.id));
            reviews.splice(reviews.indexOf(review), 1);
            return review;
        },
        editBook: (parent, args) => {
            const book = books.find(book => book.id === Number(args.id));
            book.title = args.editBook.title;
            book.author = args.editBook.author;
            book.year = args.editBook.year;
            return book;
        },
        deleteBook: (parent, args) => {
            const book = books.find(book => book.id === Number(args.id));
            books.splice(books.indexOf(book), 1);
            return book;
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const {url} = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`🚀  Server ready at: ${url}`);
