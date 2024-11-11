# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/TymchenkoA/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install
```

## PORT setup
PORT value is stored in .env.example file
Rename .env.example file to .env file

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## General project description
This project is a Home Library Service! Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!

### API Endpoints

Users  (/user route)
1. GET /user is used to get all users
2. GET /user/:id is used to retrieve a user by ID.
3. POST /user is used to create record about new user and store it in database
    Following DTO should be used:
    interface CreateUserDto {
        login: string;
        password: string;
    }
4. PUT /user/:id is used to update user's password
    Following DTO should be used:
    interface UpdatePasswordDto {
        oldPassword: string; // previous password
        newPassword: string; // new password
    }
5. DELETE /user/{userId} is used to delete existing user from database

Tracks (/track route)
1. GET /track is used to get all tracks
2. GET /track/:id is used to retrieve a track by ID.
3. POST /track is used to create record about new track and store it in database
4. PUT /track/:id is used to update track info
5. DELETE /track/:id is used to delete existing track from database

Artists (/artist route)
1. GET /artist is used to get all artists
2. GET /artist/:id is used to retrieve an artist by ID.
3. POST /artist is used to create record about new artist and store it in database
4. PUT /artist/:id is used to update artist info
5. DELETE /artist/:id is used to delete existing artist from database

Albums (/album route)
1. GET /album is used to get all albums
2. GET /album/:id is used to retrieve an album by ID.
3. POST /album is used to create record about new album and store it in database
4. PUT /album/:id is used to update album info
5. DELETE /album/:id is used to delete existing album from database

Favorites
1. GET /favs is used to get all favourites
2. POST /favs/track/:id is used to add track to the favourites
3. DELETE /favs/track/:id is used to delete track from favourites
4. POST /favs/album/:id is used to add album to the favourites
5. DELETE /favs/album/:id is used to delete album from favourites
6. POST /favs/artist/:id is used to add artist to the favourites
7. DELETE /favs/artist/:id is used to delete artist from favourites

### Error handling
The API returns appropriate status codes and error messages:

200 OK: Request was successful.
201 Created: A new resource was created successfully.
204 No Content: Resource was deleted successfully.
400 Bad Request: Validation failed.
404 Not Found: Resource not found.
500 Internal Server Error: An unexpected error occurred.
