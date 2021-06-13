## How to run the app in Docker containers

1. Setup in terminal
```
git clone https://github.com/ellankz/rss-nodejs
```
```
cd rss-nodejs
```
```
git checkout Task-6-Docker-basics
```

2. Create .env file in the project folder with following data:
```
NODE_ENV=development
PORT=8080
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres

```
3. Build and run docker containers:
```
docker-compose up
```

After this the app should be running on port 8080 and be accessible via url http://localhost:8080/

!! If you want to test whether app is restarted upon crash you can send a GET request via Postman to http://localhost:8080/exit (Don't do this in browser, it will keep repeating the request after each app restart).
