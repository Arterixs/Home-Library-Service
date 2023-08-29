<h1 align="center">Home Library Service</h1>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#configuration">Configuration via .env</a></li>
        <li><a href="#starting">Starting application</a></li>
        <li><a href="#migrations">Migrations</a></li>
        <li><a href="#running-scan">Running scan for security vulnerabilities</a></li>
        <li><a href="#running-tests">Running tests</a></li>
        <li><a href="#openapi">OpenAPI/Swagger</a></li>
      </ul>
    </li>
    <li>
      <a href="#api">API</a>
      <ul>
        <li><a href="#auth">Auth</a></li>
        <li><a href="#user">User</a></li>
        <li><a href="#track">Track</a></li>
        <li><a href="#artist">Artist</a></li>
        <li><a href="#album">Album</a></li>
        <li><a href="#favs">Favs</a></li>
      </ul>
    </li>
    <li>
      <a href="#data-transfer-object-dto">Data Transfer Object</a>
       <ul>
        <li><a href="#auth-1">Auth</a></li>
        <li><a href="#user-1">User</a></li>
        <li><a href="#artist-1">Artist</a></li>
        <li><a href="#track-1">Track</a></li>
        <li><a href="#album-1">Album</a></li>
      </ul>
    </li>
  </ol>
</details>

## About the project

[RS School NodeJS 2023 Q2 - Final Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)

This project is a home library service that stores users, as well as their favorite tracks, track, albums and artists.

### Built With

This section lists all the main tools with which this project was built.

- Node.js
- Nest
- TypeScript
- Typeorm
- PostgresQL
- Docker
- Swagger
- Bcrypt.js

### Features

This section describes the functionality of the application.

- [x] CRUD REST API with router paths `/user`, `/track`, `/artist`, `/album`, `/favs`, `/doc`, `/auth`
- [x] Documentation API with OpenAPI/Swagger
- [x] Connecting the application using TopeORM to the PostgresQL database
- [x] Create running migration with TypeORM
- [x] Containerizing an application with docker
- [x] Create custom logger in application
- [x] Create authentication and authorization in application

## Getting Started

### Installation

- Install with `npm ci`

### Configuration via .env

Create `.env` and specify port on which you want to run the server. Example `.env.example` is provided for reference. If `.env` is missing and environment variable `PORT` is undefined, server will use default port `4000`.

### Starting application

There are three different modes of operation:

Run with `docker compose up` to create images docker and start app with database, then `npm run migration:run` for run migration in db.

### Migrations

Use `npm run migration:generate` to generate migration
Use `npm run migration:run` to start migration
Use `npm run migration:revert` to revert migration

### Running scan for security vulnerabilities

Use `npm run scan` to locate vulnerabilities docker contaiter

### Running tests

Use `npm run test:auth` to run provided e2e tests

### OpenAPI/Swagger

After starting the app on port (`4000` as default) you can open
in your browser **OpenAPI** documentation by typing `http://localhost:4000/docs/.`
For more information about **OpenAPI/Swagger** please visit `https://swagger.io/.`

## API

### Auth

- **POST** `auth/signup` - create new user
  
  - Server answer with `status code` **200** and corresponding message if dto is valid
  - Server answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
    
- **POST** `auth/login` - get access token and refresh token
  
  - Server answer with `status code` **200** and corresponding message if dto is valid
  - Server answer with `status code` **400** and corresponding message if dto is invalid (no `login` or `password`, or they are not a `strings`)
  - Server answer with `status code` **403** and corresponding message if authentication failed (no user with such `login`, `password` doesn't match actual one, etc.)
    
- **POST** `auth/refresh` - get new pair of access token and refresh token

  - Server answer with `status code` **200** and corresponding message if dto is valid
  - Server answer with `status code` **401** and corresponding message if dto is invalid (no refreshToken in body)
  - Server answer with `status code` **403** and corresponding message if authentication failed (refresh token is invalid or expired)


### User

- **GET** `/user` - get all users
  - Server answer with `status code` **200** and all users records
- **GET** ` /user/:id` - get single user by id

  - Server answer with `status code` **200** and and record with `id === userId` if it exists
  - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === userId` does not exist

- **POST** `/user` - create user (following DTO should be used)

  - Server answer with `status code` **201** and newly created record if request is valid
  - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

- **PUT** ` /user/:id` - update user's password

  - Server answer with` status code` **200** and updated record if request is valid
  - Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
  - Server answer with` status code` **403** and corresponding message if `oldPassword` is wrong

- **DELETE** ` /user/:id` - delete user

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Track

- **GET** ` /track` - get all tracks
  - Server answer with `status code` **200** and all tracks records
- **GET**` /track/:id` - get single track by id

  - Server answer with `status code` **200** and and record with `id === trackId` if it exists
  - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

- **POST**` /track` - create new track

  - Server answer with `status code` **201** and newly created record if request is valid
  - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

- **POST** `/track/:id` - update track

  - Server answer with` status code` **200** and updated record if request is valid
  - Server answer with` status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
  - Server answer with` status code` **404** and corresponding message if record with `id === trackId` doesn't exist

- **DELETE** `/track/:id` - delete track

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === trackId` doesn't exist

### Artist

- **GET** `/artist` - get all artists
  - Server answer with `status code` **200** and all artists records
- **GET** `/artist/:id` - get single artist by id
  - Server answer with `status code` **200** and and record with `id === artistId` if it exists
  - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist
- **POST** `/artist` - create new artist

  - Server answer with `status code` **201** and newly created record if request is valid
  - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

- **PUT** `/artist/:id` - update artist info

  - Server answer with` status code` **200** and updated record if request is valid
  - Server answer with` status code` **400** and corresponding message if `artist` is invalid (not `uuid`)
  - Server answer with` status code` **404** and corresponding message if record with `id === artistId` doesn't exist

- **DELETE** `/artist/:id` - delete album

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === artistId` doesn't exist

### Album

- **GET** `/album` - get all albums
  - Server answer with `status code` **200** and all albums records
- **GET** `/album/:id` - get single album by id

  - Server answer with `status code` **200** and and record with `id === albumId` if it exists
  - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

- **POST** `/album` - create new album

  - Server answer with `status code` **201** and newly created record if request is valid
  - Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

- **PUT** `/album/:id` - update album info

  - Server answer with` status code` **200** and updated record if request is valid
  - Server answer with` status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
  - Server answer with` status code` **404** and corresponding message if record with `id === albumId` doesn't exist

- **DELETE** `/album/:id` - delete album

  - Server answer with `status code` **204** if the record is found and deleted
  - Server answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
  - Server answer with `status code` **404** and corresponding message if record with `id === albumId` doesn't exist

### Favs

- **GET** ` /favs` - get all favorites
  - Server should answer with `status code` **200** and all favorite records (**not their ids**), split by entity type:
- **POST** `/favs/track/:id` - add track to the favorites

  - Server should answer with `status code` **201** and corresponding message if track with `id === trackId` exists
  - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
  - Server should answer with `status code` **422** and corresponding message if track with `id === trackId` doesn't exist

- **DELETE**` /favs/track/:id` - delete track from favorites

  - Server should answer with `status code` **204** if the track was in favorites and now it's deleted id is found and deleted
  - Server should answer with `status code` **400** and corresponding message if `trackId` is invalid (not `uuid`)
  - Server should answer with `status code` **404** and corresponding message if corresponding track is not favorite

- **POST** `/favs/album/:id` - add album to the favorites

  - Server should answer with `status code` **201** and corresponding message if album with `id === albumId` exists
  - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
  - Server should answer with `status code` **422** and corresponding message if album with `id === albumId` doesn't exist

- **DELETE** `/favs/album/:id` - delete album from favorites

  - Server should answer with `status code` **204** if the album was in favorites and now it's deleted id is found and deleted
  - Server should answer with `status code` **400** and corresponding message if `albumId` is invalid (not `uuid`)
  - Server should answer with `status code` **404** and corresponding message if corresponding album is not favorite

- **POST** `/favs/artist/:id` - add artist to the favorites

  - Server should answer with `status code` **201** and corresponding message if artist with `id === artistId` exists
  - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
  - Server should answer with `status code` **422** and corresponding message if artist with `id === artistId` doesn't exist

- **DELETE** `/favs/artist/:id` - delete artist from favorites

  - Server should answer with `status code` **204** if the artist was in favorites and now it's deleted id is found and deleted
  - Server should answer with `status code` **400** and corresponding message if `artistId` is invalid (not `uuid`)
  - Server should answer with `status code` **404** and corresponding message if corresponding artist is not favorite

## Data Transfer Object (DTO)

### Auth

Body of **POST** path `auth/signup` request **must be** in the following format:

- `login` — user's login (`string`, **required**)
- `password` — user's password (`number`, **required**)

Body of **POST** path `auth/refresh` request **must be** in the following format:

- `refreshToken` — refresh token (`tokenJWT`, **required**)

### User

Body of **POST** request **must be** in the following format:

- `login` — user's login (`string`, **required**)
- `password` — user's password (`number`, **required**)

Body of **PUT** request **must be** in the following format:

- `oldPassword` — user's old password (`string`, **required**)
- `newPassword` — user's new password (`string`, **required**)

### Artist

Bodies of **POST** or **PUT** requests **must be** in the following format:

- `name` — artist's username (`string`, **required**)
- `grammy` — the presence of a grammy (`boolean`, **required**)

### Track

Bodies of **POST** or **PUT** requests **must be** in the following format:

- `name` — name of the track (`string`, **required**)
- `artistId` — id of the artist of this track (`string` or `null`, format: `UUID`, **required**)
- `albumId` — id of the album of this track (`string` or `null`, format: `UUID`, **required**)
- `duration` — duration of this track (`number`, format: in seconds, **required**)

### Album

Bodies of **POST** or **PUT** requests **must be** in the following format:

- `name` — name of the album (`string`, **required**)
- `year` — album release year (`number`, **required**)
- `artistId` — id of the artist of this album (`string` or `null`, format: `UUID`, **required**)
- `duration` — duration of this track (`number`, format: in seconds, **required**)
