# Air Quality Analyzer (Version 0.0.1)

This project is the backend service for an IoT-based air quality monitoring device that measures Kathmandu's air quality on a daily basis. It allows uploading and saving air quality reports, cleaning malformed data, and generating insights on the data.

## Features

- Upload and save air quality reports in CSV format (to be implemented)
- Clean malformed data before saving to the database
- View all records in the database
- Generate a monthly report including:
  - Average AQI
  - Maximum and Minimum AQI
  - List of daily measured AQI for a specific month

## Technology Stack

- **Framework**: Express.js (TypeScript)
- **Database**: MongoDB
- **Environment**: Node.js

## API Endpoints

1. **GET `/api/`**  
   Fetches all the air quality records stored in the database.

2. **POST `/api/add`**  
   Adds a new air quality record to the database.

   - **Request Body**: `{ aqi: number, day: number, month: string, year: number }`

3. **GET `/api/report`**  
   Fetches the air quality report for a specific month and year using query parameters.
   - **Example**: `/api/report?month=jan&year=2024`
   - **Response Format**:
     ```json
     {
       "month": "jan",
       "year": 2024,
       "avg": 150,
       "max": 200,
       "min": 50,
       "list": [
         {
           "date": "01/01/2024",
           "aqi": 50
         }
       ]
     }
     ```

## Project Setup

### Prerequisites

- Node.js
- MongoDB
- Nodemon (globally installed)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/noxiousghost/air-quality-analyzer.git
   cd air-quality-analyzer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Rename `.env.example` to `.env` and configure the environment variables.

4. Build the project:

   ```bash
   npm run build
   ```

5. Start the project:

   ```bash
   npm start
   ```

6. To run in development mode:
   ```bash
   npm run dev
   ```

### Seeding the Database

1. Navigate to the `/src/seed/` directory.
2. Update the `airReport.seed.ts` file with valid air quality values as needed.
3. Run the seeder:
   ```bash
   npm run seed
   ```

## To-Do

- Implement CSV file upload functionality
- Add more test cases and validation rules
- Generate Yearly reports as well
- Write unit tests
