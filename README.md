# Secret Family Recipes Cookbook API

## API URL

https://family-recipes-cookbook.herokuapp.com

## API Documentation

### General Principles

#### Requests
This Web API follows the REST principles:
- resources are accessed using standard HTTPS requests
- HTTP requests are made to distinct API endpoints
- use HTTP verbs (GET, POST, PUT, DELETE, etc) based on the action taken

#### HTTP Methods and their roles
- GET - Retrieves existing resources
- POST - Creates a new resource
- PUT - Updates an existing resource
- DELETE - Deletes resources

## API Endpoints
- All data is returned in JSON format

**ALL of the following requests do NOT require an authorization token**

## Users

### POST /user/register
Required fields:
{
    "username": "UniqueUsername", (128 character max, unique)
    "firstname": "FirstName", (128 character max)
    "lastname": "LastName", (128 character max)
    "email": "email@email.com", (256 character max)
    "password": "password" (128 character max)
}
---
Returns:
    {
     "user_id: 1,
     "username": "UniqueUsername"
    }

### POST /user/login
Required fields:
{
    "username": "UniqueUsername",
    "password": "password"
}
---
Returns:
 {
     "user": {
             "user_id: 1,
             "username": "UniqueUsername"
        },
        "token": "Authentication Token"
 }

**All of the following requests REQUIRE an authorization token in the header**

## Users
### GET /user/:id
- Get Recipes by User ID

Returns an array of recipe objects:
[
    {
        "recipe_id": 1,
        "title": "Recipe Title",
        "category": "category(ex. chicken, dinner, etc.)",
        "source": "Recipe Source",
        "ingredients": "All ingredients",
        "instructions": "All instructions",
        "user_id": 1
    }
]

\\

## Recipes

### POST /recipe
-Add Recipe

Required fields:
{
    "title": "Recipe Title", (128 character max)
    "category": "category(ex. chicken, dinner, etc.)", (128 character max)
    "source": "Recipe Source", (128 character max)
    "ingredients": "All ingredients", (300 character max)
    "instructions": "All instructions", (300 character max)
    "user_id": 1 (integer)
}
---
Returns New Recipe Object with recipe_id included.

### PUT /recipe/:id
- Update Recipe

Required fields:
{
    "title": "Recipe Title", (128 character max)
    "category": "category(ex. chicken, dinner, etc.)", (128 character max)
    "source": "Recipe Source", (128 character max)
    "ingredients": "All ingredients", (300 character max)
    "instructions": "All instructions" (300 character max)
}
---
Returns Updated Recipe Object with both recipe_id and user_id

### DELETE /recipe/:id
- Delete Recipe

Returns number of deleted objects

### GET /recipe/:id
- Get Recipe By Recipe ID

Returns Recipe Object

### GET /recipe/?search=$titleORcategory
- Get Recipe by Searching for Title or Category

Requires:
replace $titleORcategory with desired search (ex. pizza, piz, dinner, din)

Returns Array of Recipes that contain desired search input