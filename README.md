# Adlite AI

This project is a full-stack MERN (MongoDB, Express, React, Node.js) application. Consisting of a backend server built with Express and a frontend client built with React, it is an AI-powered ad optimization platform that leverages edge computing and sentiment analysis to deliver highly personalized ads

## Project Structure

```
my-mern-app
├── backend          # Backend server
│   ├── src
│   │   ├── controllers  # Business logic for routes
│   │   ├── models       # Mongoose models
│   │   ├── routes       # API routes
│   │   └── app.js       # Entry point for the backend
│   ├── package.json     # Backend dependencies and scripts
│   └── README.md        # Documentation for the backend
├── frontend         # Frontend client
│   ├── public
│   │   └── index.html   # Main HTML file for the React app
│   ├── src
│   │   ├── components    # React components
│   │   ├── App.js        # Main App component
│   │   ├── index.js      # Entry point for the React app
│   │   └── styles.css     # CSS styles for the frontend
│   ├── package.json      # Frontend dependencies and scripts
│   └── README.md         # Documentation for the frontend
└── README.md            # Overview of the entire project
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/my-mern-app.git
   cd Adlite AI
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Features

- RESTful API for data management
- Responsive frontend built with React
- MongoDB for data storage

### License

This project is licensed under the MIT License.
