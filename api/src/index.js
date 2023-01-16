import express from 'express';
import cors from 'cors';

import routes from './routes/index.js';

console.log('hello node')

//Express set up
const port = 3001;
const server = express();

//Server middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use(routes);


server.listen(port, () => {
    console.log(`server listening on port ${port}`);
});