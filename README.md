# Pintereach-Back-End

### API: https://mighty-coast-53463.herokuapp.com/
### Front-End: https://elegant-blackwell-a93727.netlify.com/

> Test users created usernames: john || jane password: 12345678


## **DESCRIPTION**
---
Pitch: As a researcher, it's difficult to keep track of articles you want to read later. 
Pintereach helps you research by enabling you to save and organize articles in to categories to read later.

MVP
>- User can create update and delete boards
>- Get a list of boards created by others
>- Clickable links on the board to take them to the article
>- Other users can view boards of others.
>- Registration and authentication for users to sign up

Stretch 
>- Users can click the link to the study to read it.
>- Add a pagination system to limit boards used.
>- Ability to filter the boards based on category

### Scripts

>Tests all the endpoints and database methods. Test uses `Jest` and `Supertest`
Tests are located in the `Test Directory`
`npm run test`


## *Endpoints*
---


### **Authentication** 
---
---


**Method:** POST Register\
**URL:** `/api/register`

##### Request Body
```
{
    username: john
    first_name: John
    last_name: Doe
    email: johnd@example.com
    password: 12345678 //Length must be at least 8
}
```

##### Returns

```
{
    "user": [
        {
            "id": 3,
            "username": "larryB"
        }
    ],
    "message": "Created Successfully!"
}
```

**Method:** POST Login\
**URL:** `/api/login`

##### Request Body
```
{
    username: john
    password: 12345678 //Length must be at least 8
}
```

##### Returns

```
{
    "message": "logged in",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqb2huIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiaWF0IjoxNTYzNjU0NzI4LCJleHAiOjE1NjM2OTc5Mjh9.yKQQ9m7dO0ZJ-NS_Er7U2BoeDx77SniAaMBU96Q0wcY",
    "user": {
        "id": 1,
        "username": "john",
        "firstName": "John",
        "lastName": "Doe"
    }
}
```


---
### **Boards**
---
---

**Method:** GET All Boards\
**URL:** `api/boards/`\
**Requires:** Token for Authentication

##### Returns
```
[
    {
        "id": 5,
        "title": "I need to be more Productive",
        "url": "https://wwww.yahoo.com",
        "description": "I've gotten better at time management, but I need to achieve more.",
        "category": "Productivity",
        "notes": "",
        "created_by_id": 1,
        "created_by": "john",
        "created_at": "2019-07-20T17:48:00.519Z"
    },
    {
        "id": 7,
        "title": "Ancient Greece",
        "url": "https://www.bing.com",
        "description": "This article has some secrets from long ago. I think I'm on to something",
        "category": "Life",
        "notes": "",
        "created_by_id": 2,
        "created_by": "jane",
        "created_at": "2019-07-20T17:48:00.519Z"
    }
]
```
**Method:** GET Board\
**URL:** `api/boards/:id`\
**Requires:** Token for Authentication

##### Returns
```
{
    "id": 5,
    "title": "I need to be more Productive",
    "url": "https://www.msn.com",
    "description": "I've gotten better at time management, but I need to achieve more.",
    "category": "Productivity",
    "notes": "",
    "created_by_id": 1,
    "created_by": "john",
    "created_at": "2019-07-20T17:48:00.519Z"
}
```

**Method:** POST Board\
**URL:** `api/boards/`\
**Requires:** Token for Authentication

>*Note:* custom middleware decodes the token and populates the `created_by_id` and `created_by`


##### Request Body
```
{
    "title": "This is a new board.", //String max 255
    "url": "https://www.google.com", //String max 255
    "description": "This is a great search engine", //String max 255
    "category": "Life", //String
    "notes": "# Notes can be written in markdown" //Text max length 10485760
}
```

##### Returns
```
[
    {
        "id": 4,
        "title": "This is a new board.",
        "url": "https://www.google.com",
        "description": "This is a great search engine",
        "category": "Life",
        "notes": "# Notes can be written in markdown",
        "created_by_id": 1,
        "created_by": "john",
        "created_at": "2019-07-20T20:51:10.026Z"
    }
]

```

**Method:** PUT Board\
**URL:** `/api/boards/:id`\
**Requires:** Token for Authentication 

##### Request Body
```
{
    "title": "This is now an old board.", // This was changed
    "url": "https://www.google.com", // can leave this out 
    "description": "This is a great search engine", // can leave this out
    "category": "Life", // can leave this out
    "notes": "# Best Search Engine" // This was changed
}

```

##### Returns

```
[
    {
        "id": 4,
        "title": "This is now an old board.",
        "url": "https://www.google.com",
        "description": "This is a great search engine",
        "category": "Life",
        "notes": "# Best Search Engine",
        "created_by_id": 1,
        "created_by": "john",
        "created_at": "2019-07-20T20:51:10.026Z"
    }
]
```

**Method:** DELETE Board\
**URL:** `/api/boards/:id`\
**Requires:** Token for Authentication\
**Returns:** Status 204

---
### Users
----
---
**Method:** GET All Users\
**URL:** `api/users/`\
**Requires:** Token for Authentication

##### Returns
```
[
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "JohnD@example.com",
        "username": "john",
        "password": "$2a$10$cZrfkXGPUbGPB6of12wB4OBs4HF2A9.ATSUMe3pRT1L6EDWCDCq.6",
        "created_at": "2019-07-20T17:47:05.912Z"
    },
    {
        "id": 2,
        "first_name": "Jane",
        "last_name": "Roe",
        "email": "JaneR@example.com",
        "username": "jane",
        "password": "$2a$10$bG02LHAaSrrQQf4blIjsj.NCjWry4nKDEauAqhBLyZQpC18z1R//q",
        "created_at": "2019-07-20T17:47:05.912Z"
    },
]

```
**Method:** GET User\
**URL:** `api/users/:id`\
**Requires:** Token for Authentication\

##### Returns
```
{
    "id": 2,
    "first_name": "Jane",
    "last_name": "Roe",
    "email": "JaneR@example.com",
    "username": "jane",
    "password": "$2a$10$bG02LHAaSrrQQf4blIjsj.NCjWry4nKDEauAqhBLyZQpC18z1R//q",
    "created_at": "2019-07-20T17:47:05.912Z"
}

```
**Method:** PUT User\
**URL:** `api/users/:id`\
**Requires:** Token for Authentication

##### Request Body
```
{
    "first_name": "Jane",
    "last_name": "Roe",
    "email": "jr@example.com",
    "username": "jane",
}

```
##### Returns
```
1 // Number of records updated
```
**Method:** DELETE User\
**URL:** `/api/users/:id`\
**Requires:** Token for Authentication\
**Returns:** Status 204