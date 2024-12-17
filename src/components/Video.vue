<script setup>
import { computed, defineProps, ref } from 'vue';

const props = defineProps({
  videoFile: {
    type: String,
    required: true
  },
  videoPoster: {
    type: String,
    required: true
  }
});

// Use paths relative to the public directory
const videoPath = computed(() => `/videos/${props.videoFile}`);
const posterPath = computed(() => `/images/${props.videoPoster}`);

const videoElement = ref(null);
</script>

<template>
  <div class="video-container mx-auto max-w-6xl mt-0">
    <video ref="videoElement" class="w-full h-auto aspect-video" :poster="posterPath" controls playsinline
      style="object-fit: cover; object-position: center;">
      <source :src="videoPath" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>