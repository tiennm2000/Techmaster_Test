import fs from "fs";
import xml2js from "xml2js";

function extractTextFromSsml() {
  // Đọc file ssml.xml
  fs.readFile("ssml.xml", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    // Parse file xml to json
    const parser = new xml2js.Parser();
    parser.parseString(data, (err, result) => {
      if (err) {
        console.log(err);
        return;
      }

      // Lấy nội dung text từ json và biến đổi thành chuỗi có xuống dòng

      const content = result.speak.voice
        .map((voice) => {
          //thêm nhãn A: hoặc B: trước mỗi đoạn text tương ứng với giọng A hoặc B
          const text =
            voice.$.name === "en-US-AndrewMultilingualNeural" ? "A: " : "B: ";
          return text + voice._;
        })
        .join("\n");

      //Ghi nội dung text vào file output.txt

      fs.writeFile("output_AB.txt", content, (err) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log("Extracted text from ssml.xml and saved to output.txt");
      });
    });
  });
}

extractTextFromSsml();
