Page Body:
# Color Scheme

## Background Colors
- Background Color: Light Beige (`#FFFBF5`)
- Navbar Background Color: Dark Purple (`#7743DB`)
- Footer Background Color: Soft Lavender (`#C3ACD0`)
- Signup Form Background Color: Off-White (`#F7EFE5`)
- Buttons (Primary) Background Color: Dark Purple (`#7743DB`)
- Buttons (Secondary) Background Color: Soft Lavender (`#C3ACD0`)
- Hover State Background Color: Off-White (`#F7EFE5`)

## Text Colors
- General Text Color: Dark Gray (Suggested: `#333333` or `#4a4a4a`)
- Navbar Text Color: Light Beige (`#FFFBF5`)
- Footer Text Color: Light Beige (`#FFFBF5`)
- Form Field Text Color: Dark Gray (Suggested: `#333333` or `#4a4a4a`)
- Buttons (Primary) Text Color: Light Beige (`#FFFBF5`)
- Buttons (Secondary) Text Color: Light Beige (`#FFFBF5`)
- Headings/Links Color: Dark Purple (`#7743DB`)
- Hover State Text Color: Dark Purple (`#7743DB`)

## Additional Colors
- Alert Messages Color: Deep Red (`#D32F2F`)

# Lending Loft
Full stack library app to manage book borrowing service for a public library. App was developed independently from scratch including designing data structure. Main focus was developing React-redux and express app using typescript.
All features were not developed yet, work is on progress.
## Tech stacks:

### Frontend: Typescript, React, Redux, React-bootsrap, Formik-form, Yup validation, JWT

### Backend: Typescript, Express, mongoose

### Database: Mongodb

### Deploy: Backend to Heroku & Front End to Netlify

[Backend Repo](https://github.com/moscuet/library-server100)

## Live App [link](https://festive-albattani-cd3868.netlify.app/)
**Please be aware that the frontend app is currently not connected to the backend. This is due to recent changes in Heroku's free hosting policy, which led to the suspension of our server deployment.

# Library-App : Front-end

### Fast Track React app template with TypeScript & Redux 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
You should use either `npm` or `yarn` but not both. It's recommeded to use `yarn`

This template already comes with all needed packages. In case you want to install manually, check the dependencies in `package.json` file. To install, run:
```
yarn install
```

## Features
* Redux
* Redux-thunk
* Redux-saga
* React-router
* Prettier
* ESLint
* Husky & lint-staged

The template comes with ready-made code for a very simple working demo (products list). To play around with it, run:
```
yarn start
```

## Modify or add new features
Follow the file/folder structure as explained below to make necessary changes. For Redux, most of the time, you can copy existing files, modify something in there to make a new feature.

## Folder structure
* `src/components`: React components. For each component, it's better to put it in a separate folder. For example:
  ```
  src/components/Button/index.tsx
  src/components/Button/Button.scss
  src/components/Button/Button.stories.tsx
  src/components/Button/Button.test.tsx
  ```

* `src/hooks`: Custom hooks. For example:
  ```
  src/hooks/useCountries.ts
  src/hooks/useUser.ts
  ```

* `src/redux`: Everything (such as actions, reducers, sagas etc) related to Redux
  * `src/redux/actions`: For Redux actions
  * `src/redux/reducers`: For Redux reducers
  * `src/redux/sagas`: For Redux sagas
  * `src/redux/store.ts`: The Redux store

  If there are multiple un-related features, split action/reducer/saga into different files. For example:
  ```
  src/redux/actions/product.ts
  src/redux/actions/order.ts
  src/redux/actions/ui.ts
  ```
  ```
  src/redux/reducers/product.ts
  src/redux/reducers/order.ts
  src/redux/actions/ui.ts
  ```
  ```
  src/redux/sagas/product.ts
  src/redux/sagas/order.ts
  src/redux/sagas/ui.ts
  ```



* `src/pages`: Pages (or views) when using [React router](https://reacttraining.com/react-router/web/guides/quick-start). For example:
  ```
  src/pages/Home.tsx
  src/pages/Product.tsx
  ```
  If there are more files than just page's `*.tsx`, a folder structure can be used. For example:
  ```
  src/pages/Home/index.tsx
  src/pages/Home/Home.scss
  ```


* `src/types.ts`: TypeScript's type definitions. For small apps, you can put definitions of all types, interfaces etc and even Redux's actions, action creators, states here.

* `src/Routes.tsx`: Defines all the React router routes to different pages.

This template is suitable for rather small apps. For bigger apps, a better & more organized way is to split the folder structure into features, something like:
  ```
  sr/feature1
  --components
  --redux
  ----action.ts
  ----reducer.ts
  ----saga.ts

  src/feature2
  --components
  --redux
  ----action.ts
  ----reducer.ts
  ----saga.ts

  src/redux
  --action.ts
  --reducer.ts
  --saga.ts
  --store.ts
  ```




#############

To fix the dependency tree, try following the steps below in the exact order:

  1. Delete package-lock.json (not package.json!) and/or yarn.lock in your project folder.
  2. Delete node_modules in your project folder.
  3. Remove "webpack" from dependencies and/or devDependencies in the package.json file in your project folder.
  4. Run npm install or yarn, depending on the package manager you use.

In most cases, this should be enough to fix the problem.
If this has not helped, there are a few other things you can try:

  5. If you used npm, install yarn (http://yarnpkg.com/) and repeat the above steps with it instead.
     This may help because npm has known issues with package hoisting which may get resolved in future versions.

  6. Check if /Users/mostafizurrahman/Desktop/code/library-app/Lending-Loft/node_modules/webpack is outside your project directory.
     For example, you might have accidentally installed something in your home folder.

  7. Try running npm ls webpack in your project folder.
     This will tell you which other package (apart from the expected react-scripts) installed webpack.
