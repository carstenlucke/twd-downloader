var http = require('http');
var fs = require('fs');

var asynch = require('async');
const LIMIT = 5;

var download = function(url, dest) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close();
    });
  });
}


var urls = require('./twd1.js').urls;
asynch.eachOfSeries(urls,
    function(url, idx, callback) {

        var pageNo = idx+1;

        // Perform operation on file here.
        console.log('Processing page ' + pageNo + " with URL " + url);
        download(url, "__app2test/"+pageNo+".jpg");
        callback();

    }, function(err) {
        // if any of the file processing produced an error, err would equal that error
        if( err ) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('A file failed to process');
        } else {
          console.log('All files have been processed successfully');
        }
    });
