# FinTrack - Personal Finance Management Application

A full-stack financial tracking application with React frontend and Spring Boot backend.

## Features

- **User Authentication**: Register and login with secure session management
- **Goal Management**: Create, view, update, and delete financial goals
- **Transaction Tracking**: Add income and expense transactions
- **Goal Progress**: Track progress towards savings goals
- **Expense Analytics**: View expense breakdowns and categories
- **Dashboard**: Overview of balance, goals, and recent activity

## Architecture

- **Frontend**: React 18 with Vite, React Router, and modern CSS
- **Backend**: Spring Boot 3 with Spring Security, JPA/Hibernate
- **Database**: H2 (development) / MySQL (production)
- **Authentication**: Session-based with Spring Security

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- npm or yarn
- Docker and Docker Compose (for containerized deployment)

## Running with Docker (Recommended)

### Production Setup

1. **Build and run all services:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: `http://localhost` (port 80)
   - Backend API: `http://localhost:8080`
   - Database: MySQL on `localhost:3306`

### Development Setup with Docker

1. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Access the application:**
   - Frontend: `http://localhost:5173` (with hot reloading)
   - Backend API: `http://localhost:8080`
   - Database: MySQL on `localhost:3306`

The development setup includes:
- Hot reloading for React frontend
- Volume mounts for code changes
- Development database

### Manual Setup (Local Development)

### Backend Setup

1. **Start the Spring Boot application:**
   ```bash
   # From the root directory
   ./mvnw spring-boot:run
   # or on Windows
   mvnw.cmd spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

2. **Database**: The application uses H2 in-memory database by default. You can access the H2 console at `http://localhost:8080/h2-console` (if enabled in development)

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

### Running Both Together (Manual)

For the full application experience:

1. **Terminal 1** - Start the backend:
   ```bash
   ./mvnw spring-boot:run
   ```

2. **Terminal 2** - Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application** at `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login (form-data)
- `POST /api/auth/logout` - Logout

### Goals
- `GET /api/goals` - Get all goals for current user
- `POST /api/goals` - Create a new goal
- `GET /api/goals/{id}` - Get goal by ID
- `PUT /api/goals/{id}` - Update goal
- `DELETE /api/goals/{id}` - Delete goal

### Transactions
- `GET /api/transactions` - Get all transactions for current user
- `POST /api/transactions` - Create a new transaction
- `GET /api/transactions/{id}` - Get transaction by ID
- `GET /api/transactions/goal/{goalId}` - Get goal transactions
- `DELETE /api/transactions/{id}` - Delete transaction

## Usage

1. **Register** a new account or **Login** with existing credentials
2. **Dashboard**: View your balance and goals overview
3. **Goals**: Create savings goals with target amounts
4. **Transactions**: Add income and expense transactions
5. **Goal Details**: Add money to specific goals and track progress
6. **Expenses**: View expense analytics and category breakdowns

## Data Structure

### Frontend Goal Structure
```javascript
{
  id: number,
  name: string,
  target: number,
  current: number,
  icon: string,
  category: string
}
```

### Frontend Transaction Structure
```javascript
{
  id: number,
  name: string,
  amount: number, // positive for income, negative for expenses
  date: string,
  type: 'income' | 'expense',
  category: string
}
```

## Development Notes

- **CORS**: Configured to allow requests from `localhost:5173` (Vite dev server)
- **Authentication**: Uses session cookies for maintaining login state
- **Error Handling**: Frontend includes error states and loading indicators
- **Data Transformation**: API responses are transformed to match frontend expectations
- **Docker Networking**: In production, nginx proxies API requests to the backend
- **Environment Variables**: API URLs automatically adjust based on environment

## Docker Services

### Production (`docker-compose.yml`)
- **frontend**: Nginx serving built React app with API proxy
- **app**: Spring Boot backend
- **db**: MySQL database

### Development (`docker-compose.dev.yml`)
- **frontend**: Vite dev server with hot reloading
- **app**: Spring Boot with code hot reloading
- **db**: MySQL database

## API Testing

The project includes a Postman collection (`FinTrack_API.postman_collection.json`) for testing the API endpoints directly.

## Docker Commands

```bash
# Production build and run
docker-compose up --build

# Development build and run
docker-compose -f docker-compose.dev.yml up --build

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose build frontend
docker-compose build app

# Remove volumes (reset database)
docker-compose down -v
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test both frontend and backend
5. Submit a pull request

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure backend is running on port 8080 and frontend on 5173
2. **Authentication Issues**: Clear browser cookies and try logging in again
3. **Build Errors**: Make sure all dependencies are installed with `npm install`
4. **Database Issues**: Restart the backend to reset the database
5. **Docker Issues**: 
   - Run `docker-compose down -v` to reset volumes
   - Check logs with `docker-compose logs`
   - Ensure ports 80, 8080, and 3306 are not in use

### Backend Logs
Check the Spring Boot console output for any errors or authentication issues.

### Frontend Network Tab
Use browser dev tools to inspect API calls and responses for debugging.

### Docker Logs
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f app
docker-compose logs -f db
``` 