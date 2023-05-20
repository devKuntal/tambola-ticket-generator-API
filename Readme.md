# Tambola ticket generator API

This API allow you to generate unique Tambola tickets.(No of tickets is variable not a fixed number)

All Tickets routs are protected and you have to register first to generate tickets

## All Authentication routes

### POST /Register

```
http://localhost:5000/auth/register
```

### POST /login

```
http://localhost:5000/auth/login
```

### GET /logout

```
http://localhost:5000/auth/logout
```

## Ticket Generation routes

### Create POST /tickets

```
http://localhost:5000/tickets
```

### Read GET /tickets

```
http://localhost:5000/tickets
```

### Delete DELETE /tickets

```
http://localhost:5000/tickets/:id
```

## How to Test ?

MongoDB & Node has to be locally installed (on your computer)

Clone or Download it as a zip file then extract it

```bash
npm i
npm start
```

create ticket response with number 3

```json
{
  "tickets": {
    "number": 3,
    "tickets": [
      [
        [8,13,0,0,42,0,66,70,0],
        [9,0,28,36,0,0,0,72,80],
        [0,15,0,0,48,54,68,0,82]
      ],
      [
        [3,11,0,0,0,0,66,72,81],
        [0,18,27,0,0,55,0,75,82],
        [8,0,29,35,48,0,68,0,0]
      ],
      [
        [1,12,0,37,40,0,0,0,82],
        [0,18,28,0,43,50,67,0,0],
        [7,0,0,0,0,57,68,78,84]
      ]
    ],
    "author": "6467ba55c56c56105a26487c",
    "_id": "646810e8ac0d67e02bf55a95",
    "__v": 0
  }
```
