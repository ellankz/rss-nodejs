## How to run the app in Docker containers

1. Setup in terminal
```
git clone https://github.com/ellankz/rss-nodejs
```
```
cd rss-nodejs
```
```
git checkout Task-7-PostgreSQL-Typeorm
```

2. Create .env file in the project folder with following data:
```
NODE_ENV=development
PORT=8080
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_HOST=localhost
PGDATA=/var/lib/postgresql/data/pgdata

```
3. Build and run docker containers:
```
docker-compose up
```

4. In the second terminal window install 'ts-node' package.
```
npm install ts-node
```
5. Generate migrations. 
```
npm run migration:generate
```
6. Run migrations.
```
npm run migration:run
```
7. Change POSTGRES_HOST in .env to 'postgres'
```
POSTGRES_HOST=postgres
```
8. Restart docker compose
```
docker-compose down
```
```
docker-compose up
```

After this the app should be running on port 8080 and be accessible via url http://localhost:8080/

