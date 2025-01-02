<template>
  <div>
    <!-- render ra từng dòng trong đoạn hội thoại -->
    <p
      v-for="(line, index) in dialogue"
      :key="index"
      :class="`speaker-${line.speaker}`"
    >
      <span :class="{ 'has-space': true }">{{ line.speaker }}</span>
      <!--tên người nói-->
      <span :class="{ 'has-space': true }">:</span>
      <!-- render ra từng từ trong dòng hội thoại -->
      <span v-for="(word, index) in line.words" :key="index">
        <span
          :class="{
            'no-space': isPunctuation(word.word),
            'has-space': !isPunctuation(word.word),
            'is-highlight': word.index === indexedHighlight,
          }"
          >{{ word.word }}</span
        >
      </span>
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  dialogue: Array, // Nội dung hội thoại
  indexedHighlight: Number, // từ có index này sẽ được highlight
});

// Kiểm tra xem từ đó có phải là dấu câu không

const isPunctuation = (word) => {
  const punctuation = [".", ",", "!", "?", ";"];
  return punctuation.includes(word);
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 10px;
}

.has-space {
  margin-left: 5px;
}

.no-space {
  margin-left: 0;
}

.speaker-B {
  color: blue;
}

.is-highlight {
  background-color: yellow;
}
</style>
