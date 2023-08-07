const express = require('express');
require('./db/dbConnect');

const app = express();
const userRouter = require('./routers/userRoutes');
const managerRouter = require('./routers/managerRoutes');
const staffRouter = require('./routers/staffRoutes');
const foodRouter = require('./routers/foodRoutes');

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.use(userRouter);
app.use(managerRouter);
app.use(staffRouter);
app.use(foodRouter);

app.listen(4000, function () {
    console.log(`[+] Server is running at port 4000...`);
});