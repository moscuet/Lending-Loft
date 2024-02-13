<p align="center">
  <img src="https://skillicons.dev/icons?i=react,redux,bootstrap,ts" />
  <br/>
  <a href="https://zealous-galileo-0290aa.netlify.app/"><kbd>🟢 Live App</kbd></a>
  <br/>
  <span>Netlify</span> | <span>JWT Authentication</span>
</p>

# Lending Loft

The front-end application of a full-stack library project, this application enhances the book borrowing experience with an interface built on TypeScript, React, Redux, and React-Bootstrap. It is integrated with a Node.js and Express backend and features secure JWT authentication, all supported by a MongoDB database.
Check it out at [Lending Loft](https://zealous-galileo-0290aa.netlify.app/)

<br/>

## 🔥 Features

- User Engagement: Users can browse books, add them to a cart, place borrow orders, and check the status of borrowed items.
- User Profile Management: Registered users have the ability to update their personal information post-login.
- Admin Capabilities: Admins can manage the entire book lifecycle, from adding new books and authors to handling borrowing statuses, and even removing users, books, or authors from the system.
  
<br/>

## 🛠 Tech Stack

- Developed using TypeScript, React, Redux, React-Bootstrap, Formik-Form, and Yup for form validation.
- Advanced state management with Redux, enhanced by Redux-thunk and Redux-saga for asynchronous actions and side effects.
- Navigation and routing handled by React-router.
- User authentication and security facilitated by JWT (JSON Web Token).
- Code formatting and consistency ensured with Prettier.
- Enforced coding standards and quality using ESLint for linting.
- Pre-commit hooks implemented with Husky and lint-staged to maintain code integrity.
- Backend: Integrated with Node.js and Express, MongoDBand, and uses JWT for secure authentication
<br/>


## 📸 Feature Highlights


User Dashboard: A snapshot of the user interface, displaying how users can manage their book borrowings and account information.

Admin Panel: Illustrates the administrative capabilities, such as managing the book catalog, user activities, and more.

Book Browsing and Borrowing: A view of the book selection and borrowing interface, highlighting ease of use.

Responsive Design: Demonstrates the app’s responsiveness across different devices.

## 🌐 Deployment

Deploy effortlessly on the Netlify Platform to achieve the best performance and scalability. The app is pre-configured for Netlify, enabling continuous deployment straight from the repository.
<br/>

## 📖 User Journey
For regular users, the app provides a personalized dashboard to manage their book borrowings and account information. For administrators, it offers comprehensive control over the library's catalog and user activity, making management tasks straightforward and efficient.

<br/>


## 🚀 Local Setup
Clone the project and start it locally with:
bash
```
yarn 
yarn start
Visit http://localhost:3000 to interact with the app.
```

<br/>

<br/>

## Future development:

- password reset
- Social Login / Federated authentication: Google, github
- display user photo in user account
- replace delete button in cart with delete icon
- feature: email confirmation of the order

  
#### Instruction for outdated package update:

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
     
  8. Try running npm ls webpack in your project folder.
     This will tell you which other package (apart from the expected react-scripts) installed webpack.
