const imageSearch = require("image-search-google");

const uuid = require("uuid");

var fs = require("fs"),
  http = require("http"),
  https = require("https");

var Stream = require("stream").Transform;

var downloadImageToUrl = (url, filename, callback) => {
  var client = http;
  if (url.toString().indexOf("https") === 0) {
    client = https;
  }

  client
    .request(url, function (response) {
      var data = new Stream();

      response.on("data", function (chunk) {
        data.push(chunk);
      });

      response.on("end", function () {
        fs.writeFileSync(filename, data.read());
      });
    })
    .end();
};

const client = new imageSearch(
  "b56c855d526d04ec1",
  " AIzaSyAIcQi51luFVOjTSYXTYtywVapioAfF6WE "
);

const options = { page: 1 };

const searchClient = function (searchName) {
    const fileName = "";
  client
    .search(searchName, options)
    .then((images) => {
      // [{
      //     'url': item.link,
      //     'thumbnail':item.image.thumbnailLink,
      //     'snippet':item.title,
      //     'context': item.image.contextLink
      // }]
      images.forEach((image, index) => {
        if (index <= 0) {
          fileName = uuid.v4() + ".jpg";
          downloadImageToUrl(image.url, `./static/test/${fileName}`);
          console.log(index + " downloaded " + image.url);
          
        }
      });
    })
    .catch((error) => console.log(error));
    return fileName;
};

module.exports = searchClient;

// searchClient("RTX 3090")
