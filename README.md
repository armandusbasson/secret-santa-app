# Secret Santa App

A festive web application for generating Secret Santa assignments with a modern, interactive interface. Built with React and Vite, featuring dark mode, confetti animations, and a user-friendly experience.

## Features

- **Easy Name Management**: Add, remove, and manage participant names
- **Random Assignment**: Automatically generates Secret Santa pairings
- **Privacy Controls**: Toggle visibility to reveal or hide gift recipients
- **Dark Mode**: Switch between light and dark themes
- **Confetti Animations**: Celebratory animations when generating assignments
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or higher)

## Installation with Docker Compose

### Quick Start

1. **Clone or download the repository**
   ```bash
   cd /path/to/secret-santa-app
   ```

2. **Build and run the application**
   ```bash
   docker-compose up -d
   ```

   This command will:
   - Build the Docker image using the multi-stage Dockerfile
   - Start the application container in detached mode
   - Map port 8888 on your host to port 80 in the container

3. **Access the application**

   Open your web browser and navigate to:
   ```
   http://localhost:8888
   ```

### Docker Compose Commands

- **Start the application**
  ```bash
  docker-compose up -d
  ```

- **Stop the application**
  ```bash
  docker-compose down
  ```

- **View logs**
  ```bash
  docker-compose logs -f
  ```

- **Rebuild the application** (after code changes)
  ```bash
  docker-compose up -d --build
  ```

- **Stop and remove containers, networks, and volumes**
  ```bash
  docker-compose down -v
  ```

## Local Development (without Docker)

If you prefer to run the application locally without Docker:

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
secret-santa-app/
├── src/
│   ├── App.jsx          # Main application component
│   └── index.jsx        # Application entry point
├── public/              # Static assets
├── Dockerfile           # Multi-stage Docker build configuration
├── docker-compose.yml   # Docker Compose configuration
├── nginx.conf           # Nginx server configuration
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite build configuration
└── README.md            # This file
```

## How to Use

1. **Add Participants**: Enter the names of all Secret Santa participants
2. **Generate Assignments**: Click the "Generate Secret Santa" button
3. **View Assignments**: Each participant can reveal their assigned recipient
4. **Privacy**: Use the eye icon to toggle visibility of assignments
5. **Start Over**: Click the refresh button to generate new assignments

## Technology Stack

- **Frontend**: React 18
- **Build Tool**: Vite 5
- **Icons**: Lucide React
- **Web Server**: Nginx (in production)
- **Containerization**: Docker & Docker Compose

## Configuration

### Port Configuration

By default, the application runs on port 8888. To change this, edit the [docker-compose.yml](docker-compose.yml) file:

```yaml
ports:
  - "YOUR_PORT:80"
```

### Nginx Configuration

The Nginx configuration can be customized in [nginx.conf](nginx.conf) for specific server requirements.

## Troubleshooting

### Port Already in Use

If port 8888 is already in use, you'll see an error. Either:
- Stop the service using port 8888
- Change the port in [docker-compose.yml](docker-compose.yml)

### Docker Build Issues

If you encounter build issues:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Application Not Loading

1. Check if the container is running:
   ```bash
   docker ps
   ```

2. Check container logs:
   ```bash
   docker-compose logs secret-santa
   ```

## License

This project is available for personal and commercial use.

## Contributing

Feel free to submit issues and enhancement requests.
