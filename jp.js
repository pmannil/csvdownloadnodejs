const { Parser } = require('json2csv');
const downloadCsv = require('download-csv');
const fs=require('fs');
var https = require('https');
 
var options = {
    host: 'api.github.com',
    path: '/users/rsp',
    headers: {'User-Agent': 'request'}
};

https.get(options, function (res) {
    var json = '';
    res.on('data', function (chunk) {
        json += chunk;
    });
    res.on('end', function () {
        if (res.statusCode === 200) {
            try {
                var data = JSON.parse(json);
                // data is available here:
                var fields=Object.keys(data);
                const json2csvParser = new Parser({ fields });
                const csv = json2csvParser.parse(data);
                console.log(csv)
                fs.writeFile('t.csv', csv, function(err) { //currently saves file to app's root directory
                 if (err) throw err;
                   console.log('file saved');
                  });
                
                console.log(Object.keys(data));
                console.log(data.html_url);
            } catch (e) {
                console.log('Error parsing JSON!');
            }
        } else {
            console.log('Status:', res.statusCode);
        }
    });
}).on('error', function (err) {
      console.log('Error:', err);
});
 
 
//console.log(csv)
//fs.writeFile('file.csv', csv, function(err) { //currently saves file to app's root directory

   //if (err) throw err;
   // console.log('file saved');
 // });
