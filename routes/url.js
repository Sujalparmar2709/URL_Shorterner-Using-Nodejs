const express = require("express");
const URL = require("../models/url");

const { handleGenerateNewShortURL, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();

router.get("/", async (req, res) => {
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,
    });
});

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router;