const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit");

// to get all issues of repos
function getIssuesPageHtmlOfRepo(link, topicName, repoName) {
  request(link, (err, res, html) => {
    if (err) {
      console.log(err);
    } else if (res.statusCode === 404) {
      console.log("Page not found");
    } else {
      getAllIssues(html, topicName, repoName);
    }
  });

  function getAllIssues(html, topicName, repoName) {
    let $ = cheerio.load(html);
    let issuesArr = $(
      ".TitleHeader-module__inline--rL27T.Title-module__anchor--SyQM6"
    );
    // console.log("issuesArr: " + issuesArr.length);
    let arr = [];

    console.log("\n\ntopicName : - ", topicName);
    console.log("\n\nrepoName : - ", repoName);

    for (let i = 0; i < issuesArr.length; i++) {
      let link = $(issuesArr[i]).attr("href");
      //   console.log("\nissue link : " + link);

      arr.push(`https://github.com${link}`);
    }

    console.log(arr);

    let folderPath = path.join(__dirname, topicName);
    createDire(folderPath);

    let filePath = path.join(folderPath, repoName + ".pdf");

    let text = JSON.stringify(arr);
    let pdfDoc = new pdfkit();
    pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.text(text);
    pdfDoc.end();
  }
}

// create a directory to store issues files
function createDire(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

module.exports = getIssuesPageHtmlOfRepo;

/*
  
  Generating PDF Files in Node.js with PDFKit:-
  
  https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit/
  
  */
