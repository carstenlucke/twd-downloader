var http = require('http');
var fs = require('fs');
var sleep = require('process');
var sleep = require('sleep');

const FIRST = process.argv[2];
const LAST = process.argv[3];
console.log("Downloading issues " + FIRST + " to " + LAST);


var lstCallback = function (url, idx) {
    var issueNo = this.issueNo;
    var pageNo = idx+1;
    var dest = "./_downloads/" + issueNo + "/" + pageNo + ".jpg";

    console.log("Issue #" + issueNo + ", page #" + pageNo + " ... downloading.");
    this.download(url, dest);

    // sleep.usleep(125000);
    // var file = fs.createWriteStream("./_downloads/" + issueNo + "/" + pageNo + ".jpg");
    // var request = http.get(url, function(response) {
    //   response.pipe(file);
    // });

}


try {
    // Query the entry
    stats = fs.statSync('_downloads');

    // Is it a directory?
    if (stats.isDirectory()) {

        for (i=FIRST; i<=LAST; i++) {
            try {

                var issue = require('./twd'+i);
                issue.download = function(url, dest) {
                  var file = fs.createWriteStream(dest);
                  var request = http.get(url, function(response) {
                    response.pipe(file);
                    file.on('finish', function() {
                      file.close();
                    });
                  });
              };

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
