
const YouTube = require("youtube-node");
const fs = require("fs");
var youtube = new YouTube();
youtube.setKey("AIzaSyDzdyGqZKGZOnKrGbx0v1OA7JH7KSbG7Nw");

youtube.search(process.argv[2],10,function(error, result){
  if(error){
    console.log(error);
  }else{
    let i = 0;
    content = JSON.stringify(result, null, 2);
    console.log(content);
    fs.writeFile("phraseFreqs.json", content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }

      let obj = JSON.parse(fs.readFileSync('phraseFreqs.json', 'utf8'));

      let link = "https://www.youtube.com/watch?v="+obj.items[0].id.videoId;

      let exec = require('child_process').exec;
      exec("youtube-dl -q -x --audio-format mp3 "+ link);

    });
  }
}
);
