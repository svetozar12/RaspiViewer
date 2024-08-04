# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the JAR file into the container at /app
COPY target/DeviceScript-1.0.jar /app/DeviceScript.jar

# Command to run the JAR file
CMD ["java", "-jar", "DeviceScript.jar"]
