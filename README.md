# Air Quality Analyzer

This project is the backend service for an IoT-based air quality monitoring device that measures Kathmandu's air quality on a daily basis. It allows uploading and saving air quality reports, cleaning malformed data, and generating insights on the data.

## Features

- Upload a CSV file and save air quality reports in the database
- Clean malformed data before saving to the database
- View all records in the database including aqi reports and files uploaded
- Delete uploaded CSV files
- Generate a monthly report including:
  - Average AQI
  - Maximum and Minimum AQI
  - List of daily measured AQI for a specific month
- Generate a yearly report including:
  - Average AQI
  - Maximum and Minimum AQI

## Technology Stack

- **Framework**: Express.js (TypeScript)
- **Database**: MongoDB
- **Environment**: Node.js

## API Endpoints

1. **GET `/api/report/`**  
   Fetches all the air quality records stored in the database.

2. **POST `/api/report/add`**  
   Adds a new air quality record to the database.

   - **Request Body**: `{ aqi: number, day: number, month: string, year: number }`

3. **GET `/api/report/aqi`**  
   Fetches the air quality report for a specific month and year using query parameters.

   - **Example 1: Monthly Report**: `/api/report?month=jan&year=2024`
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
   - **Example 2: Yearly Report**: `/api/report?year=2024`
   - **Response Format**:
     ```json
     {
       "year": 2024,
       "avg": 150,
       "max": 200,
       "min": 50
     }
     ```

4. **GET `/api/file/`**  
   Fetches all the uploaded files records stored in the database including title and directory of the file.

5. **GET `/api/file/:id`**  
   Fetches details about the uploaded files based on the id passed.

6. **POST `/api/file/upload`**  
   Adds a detail about the new file and stores file in the disk storage.

   - **Request Body**: `{ title: string, file: File}`

7. **DELETE `/api/file/:id`**  
   Deletes the record of file and the file itself from the disk storage based on the id passed.

8. **POST `/api/file/process/:id`**  
   Process the file based on the provided id and saves the records in the file to the database.
   - **Request Body**: `{}`

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

- Implement Swagger for better API documentation
- Optimize and clean the code across the project
- Write unit tests
- Switch to PostgreSQL Database from MongoDB (imp)
