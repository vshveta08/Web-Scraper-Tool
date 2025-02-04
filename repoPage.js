const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtmlOfRepo = require("./issuesPage");

// to get repos page of all topics
function getReposPageHtml(link, topicName) {
  request(link, (err, res, html) => {
    if (err) {
      console.log(err);
    } else if (res.statusCode === 404) {
      console.log("Page not found");
    } else {
      //   console.log(html);
      getReposLink(html, topicName);
    }
  });

  function getReposLink(html, topicName) {
    let $ = cheerio.load(html);
    let linkArr = $(".Link.text-bold.wb-break-word");
    // console.log(linkArr);

    console.log("\n\ntopicName: " + topicName);

    // get top 8 repos of every topic
    for (let i = 0; i < 8; i++) {
      let href = $(linkArr[i]).attr("href");
      //   console.log(href);

      let fullLink = `https://github.com${href}/issues`;
      console.log("\nAll Repos Link: \n" + fullLink);

      let repoName = href.split("/").pop();
      console.log("repoName :- ", repoName);

      getIssuesPageHtmlOfRepo(fullLink, topicName, repoName);
    }
  }
}

module.exports = getReposPageHtml;
