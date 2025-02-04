// scrap issues of top 8 repo of the topics section at github

let url = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./repoPage");

request(url, fetchData);

function fetchData(err, res, html) {
  if (err) {
    console.log(err);
  } else if (res.statusCode === 404) {
    console.log("Page not found");
  } else {
    getTopicsLink(html);
    // console.log(html)
  }
}

function getTopicsLink(html) {
  let $ = cheerio.load(html);

  let linkArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
  // console.log(linkArr);
  for (let i = 0; i < linkArr.length; i++) {
    let href = $(linkArr[i]).attr("href"); // get href of a tag of each topic
    console.log("href: " + href);

    let topicName = href.split("/").pop(); // split on basis of "/" and return last ele
    console.log("topicName: " + topicName);

    let fullLink = `https://github.com/${href}`; // full link to go to next page of a particular topic
    console.log("\nAll topics Link: \n" + fullLink);

    getReposPageHtml(fullLink, topicName);
  }
}

// // to get repos page of all topics
// function getReposPageHtml(link, topicName) {
//   request(link, (err, res, html) => {
//     if (err) {
//       console.log(err);
//     } else if (res.statusCode === 404) {
//       console.log("Page not found");
//     } else {
//       //   console.log(html);
//       getReposLink(html, topicName);
//     }
//   });

//   function getReposLink(html, topicName) {
//     let $ = cheerio.load(html);
//     let linkArr = $(".Link.text-bold.wb-break-word");
//     // console.log(linkArr);

//     console.log("\n\ntopicName: " + topicName);

//     // get top 8 repos of every topic
//     for (let i = 0; i < 8; i++) {
//       let href = $(linkArr[i]).attr("href");
//       //   console.log(href);

//       let fullLink = `https://github.com${href}/issues`;
//       console.log("\nAll Repos Link: \n" + fullLink);

//       let repoName = href.split("/").pop();
//       console.log("repoName :- ", repoName);

//       getIssuesPageHtmlOfRepo(fullLink, topicName, repoName);
//     }
//   }
// }

// // to get all issues of repos
// function getIssuesPageHtmlOfRepo(link, topicName, repoName) {
//   request(link, (err, res, html) => {
//     if (err) {
//       console.log(err);
//     } else if (res.statusCode === 404) {
//       console.log("Page not found");
//     } else {
//       getAllIssues(html, topicName, repoName);
//     }
//   });

//   function getAllIssues(html, topicName, repoName) {
//     let $ = cheerio.load(html);
//     let issuesArr = $(
//       ".TitleHeader-module__inline--rL27T.Title-module__anchor--SyQM6"
//     );
//     // console.log("issuesArr: " + issuesArr.length);
//     let arr = [];

//     console.log("\n\ntopicName : - ", topicName);
//     console.log("\n\nrepoName : - ", repoName);

//     for (let i = 0; i < issuesArr.length; i++) {
//       let link = $(issuesArr[i]).attr("href");
//       //   console.log("\nissue link : " + link);

//       arr.push(`https://github.com${link}`);
//     }

//     console.log(arr);

//     let folderPath = path.join(__dirname, topicName);
//     createDire(folderPath);

//     let filePath = path.join(folderPath, repoName + ".pdf");

//     let text = JSON.stringify(arr);
//     let pdfDoc = new pdfkit();
//     pdfDoc.pipe(fs.createWriteStream(filePath));
//     pdfDoc.text(text);
//     pdfDoc.end();
//   }
// }

// // create a directory to store issues files
// function createDire(folderPath) {
//   if (!fs.existsSync(folderPath)) {
//     fs.mkdirSync(folderPath);
//   }
// }

// /*

// Generating PDF Files in Node.js with PDFKit:-

// https://stackabuse.com/generating-pdf-files-in-node-js-with-pdfkit/

// */
