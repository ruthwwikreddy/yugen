Here is the `ARCHITECTURE.md` file based on the provided analysis:

# Architecture: yugen

## System Components

The yugen platform is composed of the following system components:

### Frontend

* Built using React 18 and TypeScript
* Uses Vite for development and deployment
* Handles user interface and interaction with backend services

### Backend/Database

* Built using Firebase Firestore for data storage and Firebase Auth for user authentication
* Handles data storage, retrieval, and manipulation
* Provides backend services for user authentication and authorization

### Deployment

* Deployed on Vercel for scalability and reliability
* Uses Vercel's infrastructure for hosting and serving the application

## Data Flow

The yugen platform follows the following data flow:

1. User interaction with frontend
2. Frontend sends requests to backend services (Firebase Firestore and Firebase Auth)
3. Backend services process requests and store/retrieve data as needed
4. Backend services return responses to frontend
5. Frontend updates user interface with received data

## Key Modules & Responsibilities

The yugen platform has the following key modules and responsibilities:

### Registration Wizard

* Handles delegate registration and payment tracking
* Responsible for validating user input and processing payments

### Allocation System

* Handles committee allocation and mapping of delegates to countries/portfolios
* Responsible for generating committee matrices and allocating delegates accordingly

### Public Resources

* Provides centralized hub for background guides and event documentation
* Responsible for storing and serving public resources to users

## Security & Data Privacy

The yugen platform prioritizes security and data privacy:

* Uses Firebase Auth for user authentication and authorization
* Stores sensitive data in Firebase Firestore with proper encryption and access controls
* Follows best practices for secure coding and deployment

## Technical Debt & Constraints

The yugen platform has the following technical debt and constraints:

* Manual CSV import required for allocation
* Lack of automated revenue tracking
* Limited documentation for allocation system and revenue tracking features

Note: This is a high-level architecture document and may not cover all details and nuances of the yugen platform.