# Home Library Service

[RS School NodeJS 2023 Q2 - Final Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)

## Usage

### Installation

- Install with `npm install`

### Configuration via .env

Create `.env` and specify port on which you want to run the server. Example `.env.example` is provided for reference. If `.env` is missing and environment variable `PORT` is undefined, server will use default port `4000`.

### Starting application

There are three different modes of operation:

- Run with `npm run start` to launch single server instance
- Run with `npm run start:dev` to launch single server instance in development mode
- Run with `npm run start:prod` to launch single server instance in production mode

### Running tests

Use `npm run test` to run provided e2e tests

### OpenAPI/Swagger

After starting the app on port (`4000` as default) you can open
in your browser **OpenAPI** documentation by typing `http://localhost:4000/docs/.`
For more information about **OpenAPI/Swagger** please visit `https://swagger.io/.`

## API

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

### User

Body of ** POST** request **must be** in the following format:

- `login` — user's login (`string`, **required**)
- `password` — user's password (`number`, **required**)

Body of ** PUT** request **must be** in the following format:

- `oldPassword` — user's old password (`string`, **required**)
- `newPassword` — user's new password (`string`, **required**)

### Artist

Bodies of ** POST** or **PUT** requests **must be** in the following format:

- `name` — artist's username (`string`, **required**)
- `grammy` — the presence of a grammy (`boolean`, **required**)

### Track

Bodies of ** POST** or **PUT** requests **must be** in the following format:

- `name` — name of the track (`string`, **required**)
- `artistId` — id of the artist of this track (`string` or `null`, format: `UUID`, **required**)
- `albumId` — id of the album of this track (`string` or `null`, format: `UUID`, **required**)
- `duration` — duration of this track (`number`, **required**)

### Album

Bodies of ** POST** or **PUT** requests **must be** in the following format:

- `name` — name of the album (`string`, **required**)
- `year` — album release year (`number`, **required**)
- `artistId` — id of the artist of this album (`string` or `null`, format: `UUID`, **required**)
- `duration` — duration of this track (`number`, **required**)
