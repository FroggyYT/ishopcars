const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(`${__dirname}/dist`));

// Used for React Router
app.get('*', (req, res) => {
    console.log("Requesting: " + req.url);
    res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost${PORT != 80 ? ":" + PORT : ""}/`);
});
