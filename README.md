# NextJS Redux Authentication Boilerplate

Shows how to use NextJS with Redux to create an authenticated web app that uses an OAuth2 API. This is essentially a fork of the NextJS Redux example, with `redux-persist` and authentication implemented.

> There is some minimal use of Material UI. Feel free to drop it out and just use regular elements. This is also ready with `next-css` so you can import any CSS file into your component 👍

## Highlights

* The use of `compose()` from 'recompose/compose' to combine multiple component HOCs like `connect()`, and Material UI's `withStyles()`.
* Redux state is persisted by `redux-perist`
* Example of dynamic routing and passing URL params in `server.js`

## How it works

### Redux + Redux-Persist

The way **NextJS** renders content is by using "page" components from the pages directory, and placing them in a wrapper component, as well as rendering them into a document (`react-dom` style). And **Redux** requires you to wrap your application in a **Provider** using React's Context API, and which you later connect your components to using **Consumers**. 

The way we wrap our app in NextJS is by creating a `_app.js` file in the pages directory. Here we use render props to pass through our route component that's getting rendered with it's props. And in that render prop component, we can add wrap any other components around our route/page - like our Redux store -- and our `<PersistGate>` from `redux-persist` that holds our app in place until the Redux store is rehydrated. The `<PersistGate>` accepts a Loading component that displays while the app is rehydrating the store, I left it `null`.

### Authentication

There are Redux actions, reducers, and constants in place for all the necessary Authentication services (logging in a user, logging out, etc). This was based off the `react-redux-registration-login-example-master` by [Jason Watmore](http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example). When the user is logged in by dispatching the login action (`dispatch(userActions.login(username, password));`), whatever user data is transferred by the API as a response is stored in the Redux store under `authentication.user`.


## Stack

* NextJS
* ReactJS
* Redux
* NodeJS
* Express
* Isomorphic-Fetch (for SSR API calls)

## Development

`npm run dev`

Deploys an Express server, configured in the `server.js` file in project root, and builds the project using Next.

> I highly recommend getting the Redux DevTools extension to browse the Redux store and state changes easily.

### Admin / Organizer Access

This app uses JWT-style authentication and expects an access token that gets stored in localStorage and Redux for use in authenticated API calls later (through Redux actions or otherwise). 

> This is currently designed to use Laravel's Passport OAuth2 API, but it can be fit to any API that sends back a token. 

Spin up a development server, create a new account, and use those login details in this app. `AuthService` class assumes dev server is located at `http://localhost/`, but also accepts any URL when you make a "new" class (`new AuthService('http://localhost:4849')`). See the [seshsource-api](https://github.com/whoisryosuke/seshsource-api) repo for more details.

## Deployment

`npm run build`

## Todo

* [✅] - Redux implemented with NextJS
* [✅] - Redux store persisted across reloads (redux-persist)
* [✅] - Dynamic routing using Express
* [✅] - Login Authentication using OAuth2.0 / JWT tokens
* [✅] - Protected/Authenticated Routes using HOCs (supporting SSR!)