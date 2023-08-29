# Travel Log

## Intro

MERN stack app that enables users to keep track of their travel locations. Using authorization and react hook form with CRUD functionality, and mapbox to display user entries as pins and information popups.

## deployment

Deployed live on **[Vercel](https://travel-log-mern.vercel.app/)** .

## Some things to consider

server .env example

```sh
NODE_ENV='your value here'
ATLAS_URI='your value here'
REACT_APP_API_KEY='your value here'
```

client .env example

```sh
REACT_APP_MAPBOX_TOKEN='your value here'
REACT_APP_MAP_STYLE='your vallue here'
```

Features:

- Displays a popup with the title, description, user comment, location image, rating and date visited by the user.
- Clickable markers shows the users' destination details logged.
- Double click/tap the map to add a map destination entry.
- Uses Authorization to add a map destination entry.

## Screenshots

![travelogHome](https://github.com/fabdul88/TraveLog/assets/60126985/d4fb8dbc-9d7d-4401-aff5-18aa99d9f4cd)
![travelogMap](https://github.com/fabdul88/TraveLog/assets/60126985/ca662f27-1be1-49c7-b12a-0329b2986ae5)
