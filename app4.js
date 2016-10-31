var http = require('http');
var fs = require('fs');

const FIRST = process.argv[2];
const LAST = process.argv[3];
console.log("Downloading issues " + FIRST + " to " + LAST);

var asynch = require('async');


var download = function(url, dest, syncCallback) {
    var file = fs.createWriteStream(dest);
    var request = http.get(url,
        function(response) {
            response.pipe(file);
            file.on('finish', function() {
                file.close();
                syncCallback();
            });
        }
    );
}


try {
    // Query the entry
    stats = fs.statSync('_downloads');

    // Is it a directory?
    if (stats.isDirectory()) {

        for (i = FIRST; i <= LAST; i++) {
            try {

                var issue = require('./twd' + i);

                try {
                    stats = fs.statSync('./_downloads/' + issue.issueNo);
                } catch (e) {
                    // console.error("'_downloads' directory does not exist ... creating ...", e);
                    fs.mkdir('./_downloads/' + issue.issueNo);
                }

                asynch.eachOfSeries(issue.urls,
                    function(url, idx, callback) {

                        var pageNo = idx + 1;

                        // Perform operation on file here.
                        console.log('Processing issue #' + issue.issueNo + '  page #' + pageNo + " with URL " + url);
                        download(
                            url,
                            "./_downloads/" + issue.issueNo + "/" + pageNo + ".jpg",
                            callback);

                    },
                    function(err) {
                        // if any of the file processing produced an error, err would equal that error
                        if (err) {
                            // One of the iterations produced an error.
                            // All processing will now stop.
                            console.log('A file failed to process');
                        } else {
                            console.log('All files have been processed successfully');
                        }
                    });

            } catch (e) {
                console.error('Problem loading URLs for issue ' + i, e);
            }

        }
    }
} catch (e) {
    console.error("'_downloads' directory does not exist ... creating ...", e);
    fs.mkdir('_downloads');

}
