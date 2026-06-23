Manage tasks app

This is a simple task management mobile application built with React Native and Typescript

It contains features like:
Add tasks
Delete tasks
Mark tasks as complete or not complete 
View task details
Basic input validation
Search by title
Filter tasks by status
Local data persistence using AsyncStorage
Navigation using Expo Router
Public API integration using JSONPlaceholder

It also includes main screens:
List of tasks
Task details
Add task

Technologies used in this application:
React Native
Expo SDK 54
Typescript
Expo Router 
AsyncStorage

Installation:

Clone the repository
git clone https://github.com/artinapira/manage-tasks.git

Navigate to the project folder
cd manage-tasks

Install dependencies
npm install

Start the development server
npx expo start

Run the application
Scan the QR code using Expo Go on iOS or Android
Or run on an emulator/simulator

Project Structure
app/
assets/
components/
types/
utils/

API Used:
https://jsonplaceholder.typicode.com/todos

The API is used to demonstrate public API consumption

Short Explanation:

This project is a simple task management mobile application developed using React Native, Expo SDK 54 and Typescript
The application allows users to create, view and delete tasks. Tasks can be marked as completed or not completed and viewed in a dedicated details screen. Local persistence is implemented using AsyncStorage ensuring that tasks remain available after the application is restarted.
Additional functionality includes task search by title and task filtering based on completion status: All, Completed and Pending. Navigation between screens is handled using Expo Router.
A public API(JSONPlaceholder) was integrated to demonstrate API consumption as requested in the task requirements. 
The application was designed with reusable components and a clean user interface while following React Native and TypeScript best practices. 

Author
Artina Pira