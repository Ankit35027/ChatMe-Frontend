# ChatMe

This is a professional note-taking application that I built to help organize thoughts and tasks efficiently. It uses the MERN stack (MongoDB, Express, React, Node.js) to provide a fast and reliable experience.

## Understanding the Codebase

I designed this project with a clear separation between the frontend and the backend. Here is a simple breakdown of how it works:

### The Frontend (Client)
The `client` folder contains the user interface. This is what you see and interact with in the browser.
- **React & Vite**: I used React for building the interface and Vite to make the development experience fast.
- **Context API**: I used React Context to manage global state. There is an `AuthContext` to handle your login session and a `ThemeContext` to switch between Light and Dark modes.
- **Custom Styling**: Instead of using a library, I wrote custom CSS to ensure the design is clean, professional, and unique.

### The Backend (Server)
The `server` folder contains the logic that runs behind the scenes.
- **Express API**: This handles requests from the frontend. When you save a note or log in, the frontend talks to this API.
- **Authentication**: Security is handled using JWT (JSON Web Tokens). When you log in, the server issues a secure token that the frontend saves. This token is used to prove who you are for future requests.
- **Database Models**: I defined schemas for Users and Notes using Mongoose. This ensures that our data is structured and consistent before it goes into the database.

### The Database
The application connects to MongoDB to store all your data permanently. This includes your user account details and all the notes you create.

## Features
- **Secure Access**: You must log in to access your dashboard.
- **Note Management**: You can create, read, update, and delete notes.
- **Organization**: Features like search, filtering (for pinned notes), and sorting help you find what you need.
- **Dark Mode**: A built-in toggle to switch the color theme.
- **AI Summarization**: Instantly generate concise summaries of your notes using Google Gemini AI.
- **Responsive**: The layout adjusts to work on different screen sizes.

## How to Run the Project

1. **Setup the Server**:
   Navigate to the `server` directory. Run `npm install` to get the dependencies. Then run `npm run dev` to start the backend.
   *Note: Make sure your `.env` file has your MongoDB connection string and `GEMINI_API_KEY` for AI features.*

2. **Setup the Client**:
   Navigate to the `client` directory. Run `npm install` to get the dependencies. Then run `npm run dev` to start the frontend.

3. **Open in Browser**:
   Open the URL shown in your terminal (usually http://localhost:5173) to start using the app.
