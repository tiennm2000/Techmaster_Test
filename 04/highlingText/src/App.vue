<template>
  <div>
    <h1>Audio Highlighter</h1>
    <AudioPlayer @update-time="updateCurrentTime" />
    <Highlighter :dialogue="dialogue" :indexedHighlight="highlightIndexWord" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import Highlighter from "./components/Highlighter.vue";

const dialogue = ref([]); // Lưu nội dung hội thoại
const timestamps = ref([]); // Lưu thông tin timestamp
const highlightIndexWord = ref(-1); // Lưu index của từ đang được highlight

// Load dữ liệu từ file
const loadData = async () => {
  //đọc file output_AB.txt
  let lines = await fetch("/src/assets/output_AB.txt");
  lines = await lines.text();
  lines = lines.split("\n");

  //tách người nói A và B và nội dung hội thoại
  lines = lines.map((line) => {
    const [speaker, dialogue] = line.split(":");
    return {
      speaker,

      dialogue,
    };
  });

  //tách nội dung hội thoại thành từng chữ bao gồm cả dấu câu
  lines = lines.map((line) => {
    const words = line.dialogue
      .trim()
      .replace(/([.,!?;])/g, " $1 ")
      .trim()
      .split(/\s+/);

    return { speaker: line.speaker, words };
  });

  //thêm index vào mỗi từ để đồng bộ với timestamp
  let count = 1;
  lines = lines.map((line) => {
    const words = line.words.map((word) => {
      return { word, index: count++ };
    });

    return { speaker: line.speaker, words };
  });
  dialogue.value = lines;

  // Lấy thời gian bắt đầu và thời lượng từ file timestamp.txt
  let fetchedTimestamps = await fetch("/src/assets/timestamp.txt");
  fetchedTimestamps = await fetchedTimestamps.text();
  fetchedTimestamps = fetchedTimestamps
    .split("\n")
    .map((line) => JSON.parse(`[${line}]`));

  // Thay đổi index của timestamp và lưu vào `timestamps.value`
  timestamps.value = fetchedTimestamps.map((timestamp, index) => {
    return {
      start: timestamp[0][0],
      duration: timestamp[0][1],
      index: index + 1,
    };
  });
};

//gọi ham load data khi component được tạo
loadData();

// lấy thời gian hiện tại của audio
const updateCurrentTime = (currentTime) => {
  //tìm index của timestamp hiện tại

  timestamps.value.forEach((timestamp) => {
    if (
      currentTime * 1000 >= timestamp.start &&
      currentTime * 1000 <= timestamp.start + timestamp.duration
    ) {
      //lưu index của từ đang được highlight

      highlightIndexWord.value = timestamp.index;
    }
  });
};
</script>
