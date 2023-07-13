const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./server/schema/schema');
const connectDB = require('./server/config/db');
const port = process.env.PORT;
const path = require('path');

const app = express()
connectDB()
app.use(cors())
app.use(express.static(path.join(__dirname, './client/build')));

app.use('/graphql',
    graphqlHTTP({
        schema,
        graphiql: process.env.NODE_ENV === 'development'
    })
)
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, './client/build', 'index.html');
    res.sendFile(indexPath);
});
app.listen(port, console.log(`Server running on port ${port}`))