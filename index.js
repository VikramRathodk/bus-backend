
const express = require("express")
const app = express()
const port = process.env.PORT || 3002

const busRoutes = require('./routes/busRoutes');
const cors = require('cors');
const authRoutes  = require("./routes/auth");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());



app.use('/api/buses', busRoutes);

app.use('/api/buses/auth',authRoutes)

app.get("/", (req, res) => {
    res.send("This is root page")
})
app.listen(port, () => {
    console.log("Server is running on port: " + port)
})