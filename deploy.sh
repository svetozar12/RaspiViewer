#!/bin/bash

# Define variables
IMAGE_NAME="sgospodinov02/device_script:latest"
CONTAINER_NAME="sgospodinov02/device_script"

# Function to install Docker
install_docker() {
    echo "Docker is not installed. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    sudo usermod -aG docker $USER
    newgrp docker
}

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    install_docker
else
    echo "Docker is already installed."
fi

# Pull the latest Docker image
docker pull $IMAGE_NAME

# Stop and remove any existing container
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Run the Docker container
docker run -d --name $CONTAINER_NAME --restart always $IMAGE_NAME

echo "Deployment complete. The Docker container is running as $CONTAINER_NAME."
