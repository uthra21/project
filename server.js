const express = require('express');
const path = require('path');
const cors = require('cors'); // Add this line
const app = express();

app.use(cors()); // Add this line
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
