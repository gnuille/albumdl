
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
    fs.writeFile("./tmp/searchResult.json", content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
      let obj = JSON.parse(fs.readFileSync('./tmp/searchResult.json', 'utf8'));
      while(i<10 && !found){
        let tipo = obj.items[i].id.kind;
        if(tipo == "youtube#video"){ //first video found
          found = true;
          let link = "https://www.youtube.com/watch?v="+obj.items[i].id.videoId; //calculate the link


          var songname = process.argv[3];
          if(songname == undefined) songname =  process.argv[2]; //filename

          let exec = require('child_process').exec;             //execute download
          exec("youtube-dl -q -o \"./album/"+songname+".%(mp3)s\" -x --audio-format mp3 "+ link);
        }else i++;
      }
    }
    );



  }
});
