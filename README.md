# Notes App

This is a simple notes application.

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/Shubham7276/notes-app
    ```

2. Set up environment variables:

   - **Backend:**
     - Create a `.env` file in the `backend` directory.
     - Add the following environment variables to the `.env` file:

       ```plaintext
       PORT=5000
       DB=mongodb://localhost:27017/notes_db
       ```

   - **Frontend:**
     - Create a `.env` file in the root directory (`notes-app`).
     - Add the following environment variable to the `.env` file:

       ```plaintext
       REACT_APP_API_URL=http://localhost:5000/api
       ```

3. Start the frontend:

    ```bash
    cd notes-app
    npm start
    ```

4. Start the backend:

    ```bash
    cd backend
    npm start
    ```

## Usage

- Once both frontend and backend servers are running, you can access the application by visiting `http://localhost:3000` in your web browser.
- You can create, read, update, and delete notes using the application.

