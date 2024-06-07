const router = require("../src/Routess").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
    return (
        new Sitemap(router)
            .build("https://www.humanrightsdossier.com")
            .save("./public/sitemap.xml")
    );
}

generateSitemap();
