# Lyxa Product Service

A microservice for managing products with MongoDB database and RabbitMQ messaging.

## Setup Instructions

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- MongoDB (if running without Docker)
- RabbitMQ (accessible via network)

### Environment Setup

1. Clone the repository
2. Copy the environment template to create your .env file:

```bash
cp .env.example .env
```

3. The default configuration includes:
   - Application port: 4016
   - MongoDB connection: mongodb://mongodb:27017/lyxa_product_service
   - RabbitMQ connection: amqp://guest:guest@172.17.0.1:5672

### Running with Docker Compose

The easiest way to run the service is using Docker Compose:

```bash
docker compose up
```

This will:

- Build the Docker image for the application
- Start the application container
- Start a MongoDB container
- Configure networking between services
- Mount volumes for persistent data

To run in detached mode:

```bash
docker compose up -d
```

To rebuild the containers:

```bash
docker compose up --build
```

### Running Locally (Without Docker)

1. Install dependencies:

```bash
npm install
```

2. Make sure MongoDB is running and accessible
3. Edit the `.env` file to use the local MongoDB connection string:
   - Uncomment `DB_URL=mongodb://localhost:27017/lyxa_product_service`
   - Comment out the Docker MongoDB URL
4. Start the application:

```bash
npm run start:dev
```

## Inter-Service Communication Flow

This service communicates with other microservices using RabbitMQ for message queuing:

### RabbitMQ Configuration

- By default, the service connects to RabbitMQ at `amqp://guest:guest@172.17.0.1:5672`
- You can:
  - Use your local RabbitMQ instance by updating the RMQ_URL in .env
  - Run a separate RabbitMQ container and configure both services to use it

### Authentication Flow

1. When a protected endpoint is accessed, the UserAuthGuard intercepts the request
2. The guard extracts the Bearer token from the request headers
3. It sends an RPC request to the Auth service via RabbitMQ for token validation
4. The Auth service validates the token and returns the user information
5. If valid, the request proceeds with the user information attached
6. If invalid, an Unauthorized exception is thrown

### Message Publishing

The service can publish events to other services using the RabbitmqService:

- Events are published to specific exchanges with routing keys
- Other services can subscribe to these events

### Message Subscription

The service subscribes to events from other services:

- The ProductSubController manages message subscriptions
- It processes incoming messages and performs related business logic

## API Documentation

Once the service is running, you can access the API documentation at:

```
http://localhost:4016/api
```

## Project Structure

- `src/modules/product`: Product module with controllers, services, and DTOs
- `src/config`: Configuration modules for app settings and RabbitMQ
- `src/common`: Shared utilities, decorators, guards, and services
