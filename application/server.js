const express = require('express');
const app = require('./v1/controller/index');

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})