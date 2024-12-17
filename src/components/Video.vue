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
import { ref } from 'vue';

// Import video and poster files dynamically
import posterFile from '../assets/promonium-cover4.png';
import videoFile from '../assets/promonium-logistics.mp4';


const videoPath = videoFile;
const posterPath = posterFile;

const videoElement = ref(null);
</script>

<style scoped>
/* Optional: Retain any browser-specific styles for video controls */
video::-webkit-media-controls {
  display: flex;
}
</style>
