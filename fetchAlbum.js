const musicAPI = require('music-api');
const fs = require("fs");


musicAPI.searchAlbum('netease', {
  key: process.argv[2],
  limit: 10,
  page: 1,
})
  .then(res =>
  musicAPI.getAlbum('netease', {
    id:res.albumList[0].id
  })
  .then(res => download(res))
  .catch(err => console.log(err))
  )
  .catch(err => console.log(err))

function download(res)
{
  
  var s = "Album name: "+res.name+"\n"+"Artist: " + res.artist.name +"\n";

  for(let i = 0; i < res.songList.length; ++i){
    s+="Track "+(i+1)+": "+res.songList[i].name +" "+res.artist.name+"\n";

    getSong(res.songList[i].name, res.artist.name);
  }
  fs.writeFile("./tmp/albuminfo.txt",s, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}

function getSong(name, artist){
  console.log("Query: node downloadSearch2 \""+name+" "+artist+"\"")
  let exec = require('child_process').exec;
  exec("node downloadSearch2 \""+name+" "+artist+"\"");
}
