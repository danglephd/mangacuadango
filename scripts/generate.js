const fs = require('fs');
const path = require('path');

const CONTENT_DIR = "./public";
const OUTPUT_DIR = "./public";
const TEMPLATE_PATH = "./templates/index.html";
const MAIN_TEMPLATE_PATH = "./templates/public_index.html";

// đọc template
const template = fs.readFileSync(TEMPLATE_PATH, "utf-8");
const mainTemplate = fs.readFileSync(MAIN_TEMPLATE_PATH, "utf-8");

// duyệt series
const allItems = fs.readdirSync(CONTENT_DIR);
const seriesList = [];

allItems.forEach(series => {
  const seriesPath = path.join(CONTENT_DIR, series);
  if (!fs.statSync(seriesPath).isDirectory()) return;

  seriesList.push(series);

  const outputSeriesPath = path.join(OUTPUT_DIR, series);
  fs.mkdirSync(outputSeriesPath, { recursive: true });

  const chapters = fs.readdirSync(seriesPath);

  const data = {};

  chapters.forEach(chap => {
    const chapPath = path.join(seriesPath, chap);
    if (!fs.statSync(chapPath).isDirectory()) return;

    const images = fs.readdirSync(chapPath)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

    data[chap] = images.map(img =>
      `${img}`
    );
  });

  // ghi data.js
  const dataContent = `const DATA = ${JSON.stringify(data, null, 2)};`;
  fs.writeFileSync(path.join(outputSeriesPath, "data.js"), dataContent);

  // copy index.html
  fs.writeFileSync(
    path.join(outputSeriesPath, "index.html"),
    template
  );

  console.log(`Generated series: ${series}`);
});

// Generate main index.html in /public
const seriesArray = JSON.stringify(seriesList, null, 2);
const mainIndexContent = mainTemplate.replace(
  /const series = \[[\s\S]*?\];/,
  `const series = ${seriesArray};`
);

fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), mainIndexContent);
console.log("Generated main index.html");