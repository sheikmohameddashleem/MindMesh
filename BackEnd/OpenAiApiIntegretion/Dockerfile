#
# Build stage
# 

FROM maven:3.8.3-openjdk-17 As build
WORKDIR /app
COPY target/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]

