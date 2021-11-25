const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/")));

app.post("/signup", (req, res) => {
  const { fullName, email, comment } = req.body;

  if (!fullName || !email || !comment) {
    res.redirect("/fail.html");
    return;
  }

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fullName,
          COMMENT: comment,
        },
      },
    ],
  };

  const postData = JSON.stringify(data);

  const options = {
    url: "https://us5.api.mailchimp.com/3.0/lists/523306341a",
    method: "POST",
    headers: {
      Authorization: "auth a1213e141876815ad08373f8c168da2d-us5",
    },
    body: postData,
  };

  request(options, (error, response, body) => {
    if (error) {
      res.redirect("/fail.html");
    } else {
      if (response.statusCode === 200) {
        res.redirect("/success.html");
      } else {
        res.redirect("/fail.html");
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));
