<template>
  <div class="video-container mx-auto max-w-6xl mt-0">
    <video ref="videoElement" class="w-full h-auto aspect-video" :poster="posterPath" controls playsinline
      style="object-fit: cover; object-position: center;">
      <source :src="videoPath" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  videoFile: {
    type: String,
    required: true
  },
  videoPoster: {
    type: String,
    required: true
  }
})

const videoPath = computed(() => `/src/assets/${props.videoFile}`)
const posterPath = computed(() => `/src/assets/${props.videoPoster}`)

const videoElement = ref(null)
</script>

<style scoped>
/* Optional: Retain any browser-specific styles for video controls */
video::-webkit-media-controls {
  display: flex;
}
</style>