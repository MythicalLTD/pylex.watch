<!-- frontend/src/views/List.vue -->
<template>
    <div class="min-h-screen bg-black text-white">
      <!-- Hero Section -->
      <section class="relative h-[80vh]">
        <transition-group name="fade">
          <div v-for="(feature, index) in featuredContent" :key="feature.id" v-show="currentFeatureIndex === index" class="absolute inset-0">
            <img :src="feature.backdrop" :alt="feature.title" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div class="absolute bottom-0 left-0 p-8 space-y-4 max-w-2xl">
              <div class="flex items-center space-x-2">
                <span class="text-red-600 font-bold">P SERIES</span>
                <span class="border px-1 text-sm">{{ feature.rating }}</span>
              </div>
              <img :src="feature.titleImage" :alt="feature.title" class="w-96 max-w-full" />
              <p class="text-lg text-gray-200">{{ feature.description }}</p>
              <div class="flex items-center space-x-4">
                <button class="px-8 py-2 bg-white text-black rounded flex items-center hover:bg-white/90 transition">
                  <PlayIcon class="w-6 h-6 mr-2" />
                  Play
                </button>
                <button class="px-8 py-2 bg-gray-500/50 text-white rounded flex items-center hover:bg-gray-500/70 transition">
                  <InfoIcon class="w-6 h-6 mr-2" />
                  More Info
                </button>
              </div>
            </div>
          </div>
        </transition-group>
      </section>
  
      <!-- Content Sections -->
      <div class="space-y-8 -mt-32 relative z-10">
        <ContentSection title="Continue Watching for Guest" :items="continueWatching" sectionKey="continue" />
        <ContentSection title="Trending Now" :items="trendingNow" sectionKey="trending" />
        <ContentSection title="Recently Added" :items="recentlyAdded" sectionKey="recent" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { PlayIcon, InfoIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next';
  
  const currentFeatureIndex = ref(0);
  const scrollContainers = ref({});
  
  const featuredContent = [
    {
      id: 1,
      title: "Fake Profile",
      titleImage: "https://placeholder.pics/svg/400x200",
      backdrop: "https://placeholder.pics/svg/1920x1080",
      description: "In this thrilling series, a woman's search for love becomes a dangerous game of deception and lies.",
      rating: "16+"
    },
    {
      id: 2,
      title: "Money Heist",
      titleImage: "https://placeholder.pics/svg/400x200",
      backdrop: "https://placeholder.pics/svg/1920x1080",
      description: "Eight thieves take hostages and lock themselves in the Royal Mint of Spain as a criminal mastermind manipulates the police to carry out his plan.",
      rating: "18+"
    },
    {
      id: 3,
      title: "Stranger Things",
      titleImage: "https://placeholder.pics/svg/400x200",
      backdrop: "https://placeholder.pics/svg/1920x1080",
      description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      rating: "16+"
    }
  ];
  
  const continueWatching = [
    { id: 1, title: "Corpse Bride", thumbnail: "https://placeholder.pics/svg/320x180", progress: 45 },
    { id: 2, title: "Scream 2", thumbnail: "https://placeholder.pics/svg/320x180", progress: 30 },
    { id: 3, title: "Money Heist", thumbnail: "https://placeholder.pics/svg/320x180", progress: 70 },
    { id: 4, title: "The Claus Family", thumbnail: "https://placeholder.pics/svg/320x180", progress: 20 },
    { id: 5, title: "Time Cut", thumbnail: "https://placeholder.pics/svg/320x180", progress: 60 },
    { id: 6, title: "Ice Age 3", thumbnail: "https://placeholder.pics/svg/320x180", progress: 80 }
  ];
  
  const trendingNow = [
    { id: 1, title: "Breaking Bad", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 2, title: "The Crown", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 3, title: "Dark", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 4, title: "Ozark", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 5, title: "Narcos", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 6, title: "Better Call Saul", thumbnail: "https://placeholder.pics/svg/300x450" }
  ];
  
  const recentlyAdded = [
    { id: 1, title: "The Witcher", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 2, title: "Wednesday", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 3, title: "1899", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 4, title: "Alice in Borderland", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 5, title: "Shadow and Bone", thumbnail: "https://placeholder.pics/svg/300x450" },
    { id: 6, title: "Squid Game", thumbnail: "https://placeholder.pics/svg/300x450" }
  ];
  
  let featureInterval;
  
  onMounted(() => {
    featureInterval = setInterval(() => {
      currentFeatureIndex.value = (currentFeatureIndex.value + 1) % featuredContent.length;
    }, 30000);
  });
  
  onUnmounted(() => {
    if (featureInterval) clearInterval(featureInterval);
  });
  
  const scroll = (section, direction) => {
    const container = scrollContainers.value[section];
    if (container) {
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };
  </script>
  
  <style scoped>
  .scrollbar-hide {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  