const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server Run on port ' + PORT);
});
