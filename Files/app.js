const fs = require("fs");

fs.readdirSync("./").forEach((file) => {
  console.log(file);
});

fs.readdir("./", (err, files) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Result: ", files);
  }
});

fs.readFile("data.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("Data: ", data);
  }
});

fs.writeFile("data.txt", "Hello, world!", (err) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("File written!");
  }
});

fs.appendFile("data.txt", " This line will be appended to the file", (err) => {
  if (err) {
    console.log("Error: ", err);
  } else {
    console.log("File appended!");
  }
});
