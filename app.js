var http = require('http');
var fs = require('fs');
var sleep = require('sleep');

const FIRST = 1;
const LAST = 2;

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// } // await sleep(1000)

var lstCallback = function (url, idx) {
    var issueNo = this.issueNo;
    var pageNo = idx+1;
    console.log("Issue #" + issueNo + ", page #" + pageNo + " ... downloading.");
    
    sleep.usleep(125000);
    var file = fs.createWriteStream("./_downloads/" + issueNo + "/" + pageNo + ".jpg");
    var request = http.get(url, function(response) {
      response.pipe(file);
    });

}


try {
    // Query the entry
    stats = fs.statSync('_downloads');

    // Is it a directory?
    if (stats.isDirectory()) {

        for (i=FIRST; i<=LAST; i++) {
            try {

                var issue = require('./twd'+i);

                try {
                    stats = fs.statSync('./_downloads/' + issue.issueNo);
                } catch (e) {
                    console.error("'_downloads' directory does not exist ... creating ...", e);
                    fs.mkdir('./_downloads/' + issue.issueNo);
                }

                issue.urls.forEach(lstCallback, issue);

            } catch (e) {
                console.error('Problem loading URLs for issue ' + i, e);
            }

        }
    }
}
catch (e) {
    console.error("'_downloads' directory does not exist ... creating ...", e);
    fs.mkdir('_downloads');

}
