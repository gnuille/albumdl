
const YouTube = require("youtube-node");
const fs = require("fs");
var youtube = new YouTube();
youtube.setKey("AIzaSyDzdyGqZKGZOnKrGbx0v1OA7JH7KSbG7Nw");

youtube.search(process.argv[2],10,function(error, result){
  if(error){
    console.log(error);
  }else{
    let found = false;
    let i = 0;
    content = JSON.stringify(result, null, 2);
    fs.writeFile("phraseFreqs.json", content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
      let obj = JSON.parse(fs.readFileSync('phraseFreqs.json', 'utf8'));
      while(i<10 && !found){
        let tipo = obj.items[i].id.kind;
        if(tipo == "youtube#video"){
          found = true;
          let link = "https://www.youtube.com/watch?v="+obj.items[i].id.videoId;
          console.log(link);
          let exec = require('child_process').exec;
          exec("youtube-dl -q -x --audio-format mp3 "+ link);
        }else i++;
      }
    }
    );



  }
});
