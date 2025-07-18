# SchoolMangmtWithGraphqlAndNodejs

# 🎓 School Management Backend (TypeScript + Express + GraphQL + MongoDB + Redis)

A scalable, production-ready backend for a school management system using:

- Node.js (Express)
- TypeScript
- MongoDB (via Mongoose)
- Redis
- REST APIs + GraphQL
- Docker support

---

## 🚀 Features

- Modular architecture
- Authentication (JWT)
- REST APIs for students, teachers, courses, classes
- GraphQL API for flexible querying
- Redis caching ready
- Docker + Docker Compose setup

---

## 📦 Technologies

- TypeScript
- Node.js (Express)
- MongoDB + Mongoose
- Redis
- GraphQL (Apollo Server)
- Docker & Docker Compose

---

# School Management Backend

This project is built with **TypeScript**, **Node.js**, **MongoDB**, **Redis**, **REST**, **GraphQL**, and **Docker**.

To start the project, follow these steps:

- Clone the repository:  
  ```bash
  git clone https://github.com/your-username/school-management-ts.git
  cd school-management-ts


# Install dependencies:
npm install

# Create a .env file in the root directory and add the following environment variables:
PORT=4000
MONGODB_URI=mongodb://localhost:27017/schooldb
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key



# Run the development server with hot reload:
npm run dev
The server will run at http://localhost:4000


# To build for production:
npm run build


# To start the production server:
npm start


# Alternatively, run the entire app (including MongoDB and Redis) using Docker:
docker-compose up --build


# REST API Endpoints (prefix /api)

POST /api/auth/register — Register a new user

POST /api/auth/login — Login user and receive JWT token

GET /api/students — Fetch all students

POST /api/students — Create a new student

GET /api/students/:id — Fetch a student by ID

PUT /api/students/:id — Update student details

DELETE /api/students/:id — Delete a student

Similar endpoints exist for teachers, courses, and classes.



# GraphQL API
Available at: http://localhost:4000/graphql

Example query to fetch users:
query {
  users {
    id
    name
    email
  }
}

# run kafka with:
docker-compose up -d zookeeper kafka

Testing Kafka Integration
Start Kafka + Zookeeper via Docker

Launch your app with KafkaJS init

Call REST API POST /api/students to create a student

Observe console:

RabbitMQ writes to MongoDB

KafkaJS logs message:

Kafka message on student-events: {"event":"STUDENT_CREATED",...}





# testing nginx:
Testing the setup
Open your browser or Postman.

Access http://localhost/api/your-rest-route — should proxy to Node app.

Access http://localhost/graphql — should proxy your GraphQL endpoint.

Your Node app logs will be visible in Docker output.

Mongo and Redis services run in the background


# for Ci/cd:
🧭 Step 1: Prepare Your Server
Ensure your server (EC2 or similar) has:

Git, Docker, Docker Compose (or Node.js with PM2)

Your repository is cloned (if using Docker, no need; CI will build image)

Docker Compose file at project root

SSH access with a key

🧰 Step 2: Add SSH Key as GitHub Secret
On your server, generate an SSH key:
ssh-keygen -t rsa -b 4096 -f deploy_key


Add the public key (deploy_key.pub) to your server user’s ~/.ssh/authorized_keys.

In GitHub repo → Settings → Secrets → Actions, add:

SERVER_HOST → server IP or domain

SERVER_USER → SSH user (e.g., ec2-user)

SERVER_SSH_KEY → private key from deploy_key

SERVER_SSH_PORT → typically 22

 Step 3: Create GitHub Actions Workflow
Create .github/workflows/deploy.yml in your repo with this content:

name: 🚀 Deploy on Merge to Main

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v3

    - name: Set up Node
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Build Docker Compose services
      run: docker-compose build

    - name: Deploy via SSH
      uses: appleboy/ssh-action@v0.1.6
      with:
        host: ${{ secrets.SERVER_HOST }}
        username: ${{ secrets.SERVER_USER }}
        key: ${{ secrets.SERVER_SSH_KEY }}
        port: ${{ secrets.SERVER_SSH_PORT }}
        script: |
          cd /path/to/your/project
          git pull origin main
          docker-compose up -d --build




⚙️ Step 4: What Happens When PR Is Merged
Code is pushed to main.

GitHub Actions triggers:

Checks out code.

Builds Docker images locally (checks build issues early).

SSHs into your server:

Navigates to your project dir.

Pulls latest code.

Runs docker-compose up -d --build to launch containers.

Your app redeploys with updated code automatically.



