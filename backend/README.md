# Backend Documentation

This is the backend part of the MERN stack application. It is built using Node.js, Express, and MongoDB.

## Getting Started

To get started with the backend, follow these steps:

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd my-mern-app/backend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root of the backend directory and add your MongoDB connection string:
   ```
   MONGODB_URI=<your_mongodb_connection_string>
   PORT=5000
   ```

4. **Run the application**:
   ```
   npm start
   ```

The backend server will start on the specified port (default is 5000).

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/items` - Retrieve all items
- `POST /api/items` - Create a new item
- `PUT /api/items/:id` - Update an existing item
- `DELETE /api/items/:id` - Delete an item

## Folder Structure

- **src/**: Contains the source code for the backend application.
  - **controllers/**: Contains the business logic for handling requests.
  - **models/**: Contains the Mongoose models for the application.
  - **routes/**: Contains the route definitions for the API.
  - **app.js**: The entry point of the application.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose

## License

This project is licensed under the MIT License.