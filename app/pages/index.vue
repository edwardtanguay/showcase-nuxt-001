<script setup lang="ts">
interface WelcomeMessage {
  title: string;
  subtitle: string;
  timestamp: Date;
}

const message: WelcomeMessage = {
  title: 'Welcome to this site.',
  subtitle: 'See the various pages to explore different features.',
  timestamp: new Date()
};
</script>

<template>
  <div>
    <p>{{ message.title }}</p>
    <p>{{ message.subtitle }}</p>
    <p class="text-2xl text-red-900">
      Loaded at: {{ message.timestamp.toLocaleTimeString() }}
    </p>
  </div>
</template>