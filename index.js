
const YouTube = require("youtube-node");
const fs = require("fs");
var youtube = new YouTube();
youtube.setKey("AIzaSyDzdyGqZKGZOnKrGbx0v1OA7JH7KSbG7Nw");

youtube.search(process.argv[2],1,function(error, result){
  if(error){
    console.log(error);
  }else{
    content = JSON.stringify(result, null, 2);
    fs.writeFile("phraseFreqs.json", content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }

      var obj = JSON.parse(fs.readFileSync('phraseFreqs.json', 'utf8'));
      console.log(obj.items[0].id.videoId);

    });
  }
}
);
