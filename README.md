## How to run the app in Docker containers

1. Setup in terminal
```
git clone https://github.com/ellankz/rss-nodejs
```
```
cd rss-nodejs
```
```
git checkout Task-9
```

```
2. Build and run docker containers:
```
docker-compose up
```

After this the app should be running on port 8080 and be accessible via url http://localhost:8080/

### How to run tests

1. Install dependencies
```
npm install
```
2. Run tests command
```
npm run test:auth
```
