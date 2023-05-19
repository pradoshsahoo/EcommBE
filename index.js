const express = require('express');
const {dbConn} = require('./config/db')
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user')
const cors = require('cors');
const app = express();
const port = 4001;
app.use(express.json());
app.use(cors());
app.use(productRoutes);
app.use('/user',userRoutes);
dbConn();
app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})