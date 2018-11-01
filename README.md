This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information about dependencies used, why they were chosen and what further changes or improvements could be implemented in the future.

## Directory structure

Files created by create-react-app are in the root of the project. Others are grouped into directories by purpose: components, redux, assets.

Assets are under src because create-react-app doesn't allow files loaded by Webpack to be outside src.

Tests are collocated with files they are testing, using test.js extension and the same file name.

## Running and testing

In the project directory, you can run:

### `npm start`

or

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

or

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.


## Supported Browsers

By default, a create-react-app project uses the latest version of React.

An attempt was made to make JavaScript and CSS compatible as far back as IE10, but react-dom uses features which require polyfills which cannot be properly loaded without ejecting. As a result, the app will only work in IE11 and modern browsers.

## Dependencies

The following packages were chosen to satisfy the needs of the app:

* **@​bitchcraft/keyconst** - nice alternative to commonly used keymirror which doesn't require us to type null for every key when defining Redux actions and similar constants.

* **axios** - XHR library. Not a big fan of Fetch API. 

* **date-fns** - A lightweight functional alternative to moment that works with native Date objects. Downside: no date format localization support.

* **enzyme** - React component testing library. Not great but difficult to replace.

* **prop-types** - Lightweight type checking for React components. Also makes components self-documenting. Great for those who don't like full-blown typing like TypeScript or Flow.

* **react-spinner** - Nice, easy to use and modify. Never really knew how to make one of those from scratch.

* **redux-thunk** - The natural way of implementing async action creators in Redux. Less testable than redux-saga, but doesn't require buy-in into generators and doesn't add a new kind of file to the project (sagas). Also should be more performant.

## Other choices

* The form uses an uncontrolled input instead of the recommended controlled input. Opted for this because of the emphasis on performance, and I'm not sure how slow constant state updates and rerenders during typing would be. It's not too bad for simple forms but made it more difficult to test with Enzyme.

* Redux store implementation makes use of memoized selectors, again, for performance reasons.

* User identity is simplified down to a name and hardcoded as a property of window object.

* Responsive styles without media queries except for the background image. Easier to maintain.

* Tests were written for components, reducers, selectors. Action creators are usually too simple to properly test.

* If message log is scrolled to the bottom when a new message is received, it stays scrolled to the bottom. Otherwise it stays at the same scroll position, allowing user to continue reading the past message they were reading.