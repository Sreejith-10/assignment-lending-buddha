Assignment

## Run Locally

Clone the project

bash

```
git clone https://github.com/Sreejith-10/assignment-lending-buddha.git
```

Go to the project directory

bash

```
cd my-project
```

Client side installation

bash

```
cd client
npm install
npm run dev
```

Sever side installation

bash

```
cd server
npm install
npm start
```

Now the project will be running on http://localhost:5173

## ENVIRONMENT VARIABLE SETUP

Setup necesseary environment variables in the server folder

- PORT
- MONGO_URI
- JWT_SECRET

## API Reference

#### Get all users

```
http
GET /api/user/get-all-users
```

#### Get single user

```
http
GET /api/user/get-user/${id}
```

| Parameter | Type   | Description                     |
| :-------- | :----- | :------------------------------ |
| id        | string | _Required_. Id of item to fetch |

#### Create user

```
http
POST /api/user/create-user
```

| Parameter | Type   | Description                          |
| :-------- | :----- | :----------------------------------- |
| name      | string | _Required_. name of the user         |
| email     | string | _Required_. email of the user        |
| token     | string | _Required_. token for authentication |

#### Update user

```
http
PUT /api/user/update-user
```

| Parameter | Type   | Description                              |
| :-------- | :----- | :--------------------------------------- |
| id        | string | _Required_. id of the user to be updated |
| name      | string | _Optional_. name toe be updated          |
| email     | string | _Optional_. email to be updated          |
| token     | string | _Required_. token for authentication     |

#### Delete user

```
http
POST /api/user/delete-user
```

| Parameter | Type   | Description                              |
| :-------- | :----- | :--------------------------------------- |
| id        | string | _Required_. id of the user to be removed |
| token     | string | _Required_. token for authentication     |

#### Register user

```
http
POST /api/auth/signup
```

| Parameter | Type   | Description                           |
| :-------- | :----- | :------------------------------------ |
| name      | string | _Required_. name of the user          |
| email     | string | _Required_. email of the user         |
| passowrd  | string | _Required_. passoword for the account |

#### Login user

```
http
POST /api/auth/login
```

| Parameter | Type   | Description                          |
| :-------- | :----- | :----------------------------------- |
| email     | string | _Required_. email of the account     |
| passowrd  | string | _Required_. passoword of the account |
