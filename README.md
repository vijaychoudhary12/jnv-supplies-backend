# JNV Supplies Backend

This is the backend for the JNV Supplies Dashboard, built with Node.js, Express, and MongoDB. It provides the API endpoints for managing schools, tenders, products, contacts, and other relevant data for the JNV uniform and supplies business.

## Features (Phase 1 MVP)

- User Authentication (Registration, Login) using JWT.
- Role-based Authorization (Admin, Team Member).
- CRUD operations for core entities (Schools, Tenders, Products, Bids, Contacts, Vendors, Logistics).
- Refined data models with relationships between entities.
- API endpoint for uploading and importing data from CSV files.
- Basic error handling and input validation.

## Prerequisites

- Node.js installed (v14 or higher recommended)
- npm (Node Package Manager)
- MongoDB Atlas account and cluster, or a local MongoDB instance.

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd jnv-supplies-backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory of the backend project. Add the following environment variables:
    ```env
    PORT=5000 # Or any other port you prefer
    MONGODB_URI=your_mongodb_atlas_connection_string # e.g., mongodb+srv://<user>:<password>@cluster.mongodb.net/jnv-supplies?retryWrites=true&w=majority
    JWT_SECRET=your_super_secret_jwt_key # Replace with a strong, random string
    # Other potential variables like CLOUD_NAME, API_KEY, API_SECRET for file uploads if using cloud storage later
    ```
    Replace `your_mongodb_atlas_connection_string` with your actual connection string from MongoDB Atlas. Replace `your_super_secret_jwt_key` with a strong, unique secret.
4.  **Start the server:**
    * For development (with auto-restarts):
        ```bash
        npm run dev
        ```
    * For production:
        ```bash
        npm start
        ```

The server should now be running and connected to your MongoDB database.

## API Endpoints

(Document your API endpoints here, e.g.)

-   `POST /api/auth/register` - Register a new user
-   `POST /api/auth/login` - Login a user
-   `GET /api/auth/me` - Get current user data (Protected)
-   `GET /api/schools` - Get all schools (Protected)
-   `POST /api/schools` - Create a new school (Protected, Admin)
-   `GET /api/schools/:id` - Get a single school (Protected)
-   `PUT /api/schools/:id` - Update a school (Protected, Admin)
-   `DELETE /api/schools/:id` - Delete a school (Protected, Admin)
-   `POST /api/import/schools` - Import schools from CSV (Protected, Admin)
-   ... (List other endpoints for tenders, products, etc.)

## Folder Structure

jnv-supplies-backend/
├── src/
│   ├── models/       # Mongoose schemas
│   ├── routes/       # Express routes
│   ├── middleware/   # Authentication middleware
│   ├── controllers/  # Logic for routes
│   ├── utils/        # Helper functions (password, csv parsing)
│   └── server.js     # Entry point
├── .env              # Environment variables
├── package.json      # Project dependencies and scripts
└── README.md         # Project documentation


## Future Development

- Implement advanced filtering, sorting, and pagination.
- Add image/file upload capabilities (e.g., for tender documents).
- Integrate with external tender portals (future phase).
- Implement detailed Bid Analytics.
- Develop Inventory management logic (stock levels, reorder alerts).
- Build out the Order and Shipment tracking modules.
- ... (Refer to the full project roadmap)