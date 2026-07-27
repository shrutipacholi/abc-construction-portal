# Multi-stage build for Railway / Render
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
RUN chmod +x mvnw
RUN ./mvnw -q -B dependency:go-offline

COPY src ./src
RUN ./mvnw -q -B -DskipTests package

FROM eclipse-temurin:21-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

ENV PORT=5000
EXPOSE 5000

ENTRYPOINT ["sh", "-c", "java -jar app.jar --server.port=${PORT}"]
