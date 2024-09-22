import express from "express";

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.json({
        "status": 200,
        "message": "request ok"
    })
})

app.listen(port, () => {
    console.log(`server running on ${port}`);
})