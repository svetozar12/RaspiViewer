# Use an official OpenJDK runtime as a parent image
FROM openjdk:8-jre-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container at /app
COPY target/your-project-name-1.0-SNAPSHOT.jar /app/your-project-name.jar

# Command to run the JAR file
CMD ["java", "-jar", "your-project-name.jar"]
