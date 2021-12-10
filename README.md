# README

Status: In progress

# BooksWay

## Description

BooksWay is a web app to sell and trade books

## User Stories

- **404:** As a user I want to see a 404 not found if I try to reach a page that doesn't exist.
- **Homepage:** As an anonymous user or as an authenticated user, I can see the books that are being sold or traded in the application.
- **Signup:** As an anonymous user I can sign up for BooksWay to start selling or trading books.
- **Login:** As a user, I can create an account with a username, password, contact information, favorite book genres, and a profile picture.
- **Logout:** As a logged-in user I can log out from the application so no one else can use it.
- **Search:** As a logged-in user I can search books by title or I can select a genre from the drop-down menu that will bring up all the results that match by query.
- **Profile page:** As a logged-in user I can visit my profile page and see the books I'm selling or trading. I can also edit my profile.
- **Add book:** As a user, I can add a new book to the application. I can choose if the book is up for trade or for sale. I can set the price and add a picture.
- **Update book:** As a user, I can update the details of the books in my profile. I can change the picture, the condition and the price.
- **Delete book:** As a user, I can delete a book once I have sold it.
- **View book details:** As a user, I can click on a book on the homepage and view its details. I can see the condition of the book, as well as, the title, price (if applicable), and which user is selling it.
- **Add book to favorites:** As I user, I can save the books I'm interested in by clicking on the heart on the book details view.
- **View other users' profiles:** As a user I can click on other usernames in the book details and go to their profile pages. I can see their contact information and all the books they are selling or trading.

## Backlog

- Built-in chat using socket.io
- Dark theme

# Client / Frontend

## React Router Routes

| Path                   | Component       | Permissions                            | Behavior                                              |
| ---------------------- | --------------- | -------------------------------------- | ----------------------------------------------------- |
| `/login`               | LoginPage       | anonymous user only `<isAnon>`         | Login form navigates to the home page after login.    |
| ` /signup`             | SignupPage      | anonymous user only `<isAnon>`         | Signup form navigates to the login page after signup. |
| `/`                    | HomePage        | public                                 | Homepage                                              |
| `/user-profile`        | ProfilePage     | authenticated user only `<IsPrivate> ` | User profile for the current user                     |
| `/user-profile/edit`   | EditProfilePage | authenticated user only `<IsPrivate> ` | Edit user profile form.                               |
| ` /user/:userId`       | OtherUser       | authenticated user only `<IsPrivate> ` | Other users' profiles.                                |
| `/books/:bookId`       | BookDetails     | authenticated user only `<IsPrivate> ` | Book details for specific user                        |
| ` /books/add-book`     | AddBook         | authenticated user only `<IsPrivate> ` | Form to create a new book                             |
| ` /books/edit-book`    | EditBook        | authenticated user only `<IsPrivate> ` | Form to edit a new book                               |
| `/user-profiles/saved` | SavedBooks      | authenticated user only `<IsPrivate>`  | Current user saved books                              |

## Components

**Pages:**

- `LoginPage`
- `SignupPage`
- `HomePage`
- `ProfilePage`
- `EditProfilePage`
- `OtherUser`
- `BookDetails`
- `AddBook`
- `EditBook`
- `SavedBooks`

**Components:**

- `IsAnon`
- `IsPrivate`

# Server / Backend

## Models

### User Model

```jsx
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  imageUrl: { type: String, required: true },
  favoriteGenres: [{ type: String, required: true }],
  booksSaleTrade: [{ type: Schema.Types.ObjectId, ref: "Book" }],
  savedBooks: [{ type: Schema.Types.ObjectId, ref: "Book" }],
});
```

### Books Model

```jsx
const bookSchema = new Schema({
  title: { type: String, required: true },
  condition: { type: String, required: true },
  tradeOrSale: { type: String, enum: ["trade", "sale"], required: true },
  price: { type: Number },
  imageUrl: { type: String, required: true },
  genre: { type: String, required: true },
  userOwner: { type: Schema.Types.ObjectId, ref: "user" },
});
```

## API Endpoints (backend routes)

| HTTP Method | URL                       | Request body                                                  | Success status | Error status | Description                                                                                                                         |
| ----------- | ------------------------- | ------------------------------------------------------------- | -------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| POST        | `/auth/signup`            | `{username, email, password, profilePicture, favoriteGenres}` | 201            | 400          | Checks if fields not empty and if the user already exists , then create user with encrypted password.                               |
| POST        | `/auth/login`             | `{username, password}`                                        | 200            | 400          | Checks if fields are not empty; If the user exists and if the password matches. Then, attributes a authentication token to the user |
| GET         | `/auth/verify`            |                                                               | 200            | 400          | Verifies if the user has a token and if it is authenticated. Then it sends back the payload with user data.                         |
| GET         | `/api/books`              |                                                               | 200            | 200          | Get all the books                                                                                                                   |
| GET         | `/api/books/:bookId`      |                                                               | 200            | 400          | Get a specific book                                                                                                                 |
| POST        | `/api/books/:bookId`      |                                                               | 200            | 400          | Add specific book to favorites                                                                                                      |
| POST        | `/api/books`              | {title,condition, tradeOrSale, price,genre, image }           | 201            | 400          | Create a new book                                                                                                                   |
| PUT         | `/api/books/:bookId`      | {title,condition, tradeOrSale, price,genre, image }           | 200            | 400          | Edit a book                                                                                                                         |
| DELETE      | `/api/books/:bookId `     |                                                               | 204            | 400          | Delete a book                                                                                                                       |
| GET         | `/api/user/current `      |                                                               | 200            | 400          | Get current user's information                                                                                                      |
| PUT         | `/api/user/current `      | {username, email, profilePicture, favoriteGenres }            | 200            | 400          | Update user's profile                                                                                                               |
| GET         | `/api/user/current/saved` |                                                               | 200            | 400          | Get current user's saved books                                                                                                      |
| GET         | `/api/user/:userId`       |                                                               | 200            | 400          | Get other users' profile                                                                                                            |

## Links

### Git

[Client repository Link](https://github.com/telmarosario/books-way-client)

[Server repository Link](https://github.com/telmarosario/books-way-server)

Deployed Link
