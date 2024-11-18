<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white font-sans">
    <div class="stars"></div>
    <div class="twinkling"></div>
    <Navbar />
    <main class="container mx-auto px-4 py-8 relative z-10">
      <!-- Your page content will go here -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="in-out">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer class="relative z-20"> </Footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/ui/Navbar.vue';
import Footer from '@/components/ui/Footer.vue';

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

body {
  font-family: 'Poppins', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.stars {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
}

@keyframes move-twink-back {
  from {background-position: 0 0;}
  to {background-position: -2000px 1000px;}
}
.stars {
  background: url('https://www.transparenttextures.com/patterns/stardust.png') repeat;
  z-index: 0;
  animation: move-stars-back 60s linear infinite;
}

@keyframes move-stars-back {
  from {background-position: 0 0;}
  to {background-position: -2000px 1000px;}
}

</style>