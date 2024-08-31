const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoDb = require("./db");

const app = express();
const port = process.env.PORT || 5000;

mongoDb();
app.use(cors());
app.use(express.json());
app.use('/api', require("./routes/CreateUser"));
app.use('/api', require("./routes/LoginUser"));
app.use('/api', require("./routes/DisplayData"));
app.use('/api', require("./routes/OrderData"));
app.use('/api', require("./routes/MyOrder"));
app.use('/api', require("./routes/AdminControl"));
app.use('/api', require("./routes/ContactData"));
app.use('/api', require("./routes/TrackData"));
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

