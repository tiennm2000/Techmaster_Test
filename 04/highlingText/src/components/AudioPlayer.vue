<template>
  <div>
    <audio
      ref="audioElement"
      :src="audioSrc"
      controls
      @play="onPlay"
      @pause="onPause"
      @input="onSliderChange"
    ></audio>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Phát sự kiện updateTime
const emit = defineEmits(["update-time"]);

const audioSrc = "/audio.opus";

// Tham chiếu đến thẻ audio
const audioElement = ref(null);

// Biến để lưu id của setInterval
let intervalId = null;

// Hàm cập nhật thời gian khi đang phát
const updateCurrentTime = () => {
  const currentTime = audioElement.value.currentTime;
  emit("update-time", currentTime);
};

// Hàm gọi mỗi khi bắt đầu phát âm thanh
const onPlay = () => {
  // Kiểm tra thời gian mỗi 10ms
  intervalId = setInterval(updateCurrentTime, 10); // Cập nhật mỗi 10ms
};

// Hàm gọi khi slider thay đổi
const onSliderChange = () => {
  console.log("slider change");
  emit("update-time", audioElement.value.currentTime); // Gửi thời gian cho component cha khi slider thay đổi
};

//Hàm gọi mỗi khi dừng phát âm thanh
const onPause = () => {
  clearInterval(intervalId); // Dừng khi audio tạm dừng
};
</script>

<style scoped>
audio {
  width: 100%;
  margin-bottom: 20px;
}
</style>
