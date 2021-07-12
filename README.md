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

2. Build and run docker containers:
```
docker-compose up
```

After this the app should be running on port 7000 and be accessible via url http://localhost:7000/

### How to run tests

1. Install dependencies
```
npm install
```
2. Run tests command
```
npm run test:auth
```

## Performance testing results:
### Express
![Screenshot from 2021-07-11 14-02-35](https://user-images.githubusercontent.com/6302086/125212129-f60cf600-e2b3-11eb-93ff-4771bd1f28de.png)


### Fastify
![Screenshot from 2021-07-11 13-54-08](https://user-images.githubusercontent.com/6302086/125212123-ee4d5180-e2b3-11eb-8877-7e2b7d799a39.png)
