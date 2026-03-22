const express = require("express");
const path = require("path");

const app = express();

// 정적 파일만 제공 (체스 앱)
app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
