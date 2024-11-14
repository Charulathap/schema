## Project Title :: Segment Builder

### Overview
   This project consists of both a frontend and backend, designed to manage and display segment data. This README provides the setup instructions, dependencies, and usage details to run the project locally.

## Prerequisites
  Before setting up the project, ensure you have the following installed:
    i) Node.js (includes npm)
   ii) npm (Node Package Manager)

### Getting Started
## Backend Setup

1. **Navigate to the Backend Directory**

   Open a terminal in the root directory and navigate to the backend folder:
    
   ```bash
   cd backend

2. **Install Required Dependencies**

   Install the backend dependencies:
   ```bash
   npm install express cors node-fetch
        
3. **Start the Backend Server**

    Run the backend server:
    ```bash
    node server.js
    
Keep this terminal open to maintain the backend server running.

## Frontend Setup

1. **Navigate to the Project Root Directory**

   Open a new terminal or PowerShell window in the project’s root directory.
   
2. **Start the Frontend Server**

   Run the following command to start the frontend:
   ```bash
   npm start
   
3. **Running the Project**

  *Important:* Always start the backend server before the frontend to ensure connectivity.
  Once both servers are running, open the project in your browser as directed by the frontend server output.

## Features
**Saving a Segment**

* After adding a segment in the frontend interface, click the Save Segment button.
* This will send the segment data to a predefined webhook URL, which can be accessed to view the data.

 **Viewing the Saved Segment**

    Visit the webhook URL (https://webhook.site/#!/view/bad71faa-86a3-4bce-b4c8-96d40fc024a3/8ff555c4-98b4-4230-a46a-af4dd94a1985/1) to see the saved segment in JSON format.

## Notes
  * Run the backend server first, followed by the frontend server.
  * Keep both terminals open to ensure the servers stay active.

  



     
