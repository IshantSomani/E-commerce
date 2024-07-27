
# E-Commerce Glory

Build a complete Ecommerce Responsive MERN stack application using ReactJS, Redux, Node.js, MongoDB, and Express.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:

### Backend
      MONGODB_URI=your_mongodb_connection_string      
      SECRET_KEY=your_jwt_secret_key 
      FRONTEND_URL=your_frontend_url 
      BACKEND_URL=your_backend_url 
      STRIPE_SECRET_KEY=your_stripe_secret_key

### Frontend
    VITE_API_URI=your_backend_api_url
    VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key


## Key Libraries Used

### Backend
- express
- mongoose
- cors
- dotenv
- bcrypt
- jsonwebtoken
- multer
- stripe

### Frontend
- react-router-dom
- react-icons
- axios
- @mui/material
- @mui/icons-material
- @mui/x-data-grid
- @reduxjs/toolkit
- react-redux
- jwt-decode
- @stripe/stripe-js

## Database
- MongoDB

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

**Database:** MongoDB

**Payment Processing:** Stripe



## Run Locally

Clone the project:

```bash
git clone https://github.com/IshantSomani/E-commerce.git
cd e-commerce-glory
```

Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```
Set up environment variables as described above.

Start the backend server:
```bash
cd backend
npm start
```

In a new terminal, start the frontend development server:

```bash
cd frontend
npm run dev
```

#### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.