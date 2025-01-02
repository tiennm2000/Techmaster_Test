import fs from "fs";

fs.readFile("timestamp.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  //phân tích chuỗi JSON thành object
  data = JSON.parse(data);
  const result = data.timestamp
    .map((item) => {
      return JSON.stringify(item);
    })
    .join("\n");
  fs.writeFile("timestamp.txt", result, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Write file success");
  });
});
