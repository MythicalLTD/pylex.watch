<template>
  <br><br>
    <!-- Hero Section -->
    <section class="relative h-[85vh] overflow-hidden">
      <TransitionGroup name="fade" tag="div">
        <div v-for="(feature, index) in featuredContent" :key="feature.id" v-show="currentFeatureIndex === index"
          class="absolute inset-0">
          <img :src="feature.backdrop" :alt="feature.title" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div class="absolute bottom-0 left-0 p-12 space-y-6 max-w-2xl">
            <h1 class="text-6xl font-bold leading-tight">{{ feature.title }}</h1>
            <p class="text-xl">{{ feature.description }}</p>
            <div class="flex items-center space-x-4">
              <button @click="playContent(feature)"
                class="px-8 py-3 bg-pink-600 text-white rounded-full flex items-center space-x-2 hover:bg-pink-700 transition duration-300">
                <PlayIcon class="w-6 h-6" />
                <span>Play</span>
              </button>
              <button @click="openModal(feature)"
                class="px-8 py-3 bg-gray-800 text-white rounded-full flex items-center space-x-2 hover:bg-gray-700 transition duration-300">
                <InfoIcon class="w-6 h-6" />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </section>
    <br><br>
    <!-- Content Sections -->
    <div class="px-12 space-y-12 pb-12">
      <!-- Recently Watched -->
      <section>
        <h2 class="text-3xl font-semibold mb-6">Recently Watched</h2>
        <div class="relative group">
          <button @click="scroll('recent', -1)"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70">
            <ChevronLeftIcon class="w-6 h-6" />
          </button>
          <div ref="recentContainer" class="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth">
            <div v-for="item in recentlyWatched" :key="item.id" class="flex-none w-[400px]">
              <div class="relative aspect-video rounded-lg overflow-hidden cursor-pointer group/item"
                @click="openModal(item)">
                <img :src="item.thumbnail" :alt="item.title"
                  class="w-full h-full object-cover transition duration-300 group-hover/item:scale-105" />
                <div
                  class="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <PlayIcon class="w-16 h-16" />
                </div>
                <div class="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                  <div class="h-full bg-pink-600" :style="{ width: `${item.progress}%` }" />
                </div>
              </div>
              <h3 class="mt-2 text-lg font-medium">{{ item.title }}</h3>
            </div>
          </div>
          <button @click="scroll('recent', 1)"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70">
            <ChevronRightIcon class="w-6 h-6" />
          </button>
        </div>
      </section>

      <!-- Trending Now -->
      <section>
        <h2 class="text-3xl font-semibold mb-6">Trending Now</h2>
        <div class="relative group">
          <button @click="scroll('trending', -1)"
            class="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70">
            <ChevronLeftIcon class="w-6 h-6" />
          </button>
          <div ref="trendingContainer" class="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth">
            <div v-for="item in trending" :key="item.id" class="flex-none w-[200px]">
              <div class="relative aspect-[2/3] rounded-lg overflow-hidden cursor-pointer group/item"
                @click="openModal(item)">
                <img :src="item.thumbnail" :alt="item.title"
                  class="w-full h-full object-cover transition duration-300 group-hover/item:scale-105" />
                <div
                  class="absolute inset-0 bg-black/60 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <PlayIcon class="w-12 h-12" />
                </div>
              </div>
              <h3 class="mt-2 text-lg font-medium">{{ item.title }}</h3>
            </div>
          </div>
          <button @click="scroll('trending', 1)"
            class="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70">
            <ChevronRightIcon class="w-6 h-6" />
          </button>
        </div>
      </section>
    </div>

    <!-- Modal -->
    <Transition name="modal" >
      <div v-if="isModalOpen"  class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80"
        @click="closeModal">
        <div
          class="bg-gradient-to-br from-gray-900 to-purple-900 rounded-xl max-w-3xl w-full overflow-hidden shadow-2xl"
          @click.stop>
          <div class="relative aspect-video">
            <img :src="selectedItem?.backdrop || selectedItem?.thumbnail" :alt="selectedItem?.title"
              class="w-full h-full object-cover" />
            <button @click="closeModal"
              class="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300">
              <XIcon class="w-6 h-6" />
            </button>
          </div>
          <div class="p-6 space-y-4">
            <h2 class="text-3xl font-bold">{{ selectedItem?.title }}</h2>
            <div class="flex items-center space-x-4 text-sm">
              <span class="flex items-center">
                <StarIcon class="w-4 h-4 text-yellow-500 mr-1" />
                <span class="font-semibold">8.5</span>
              </span>
              <span class="flex items-center">
                <ClockIcon class="w-4 h-4 mr-1" />
                {{ selectedItem?.duration }}
              </span>
              <span class="flex items-center">
                <CalendarIcon class="w-4 h-4 mr-1" />
                {{ selectedItem?.year }}
              </span>
              <span class="px-2 py-1 bg-pink-600 rounded-full text-xs font-bold">
                {{ selectedItem?.rating }}
              </span>
            </div>
            <p class="text-gray-300">{{ selectedItem?.description }}</p>
            <div>
              <h3 class="text-lg font-semibold mb-2">Cast</h3>
              <p class="text-gray-300">{{ selectedItem?.cast }}</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-2">Genres</h3>
              <div class="flex flex-wrap gap-2">
                <span v-for="genre in selectedItem?.genres" :key="genre"
                  class="px-3 py-1 bg-gray-700 rounded-full text-sm">
                  {{ genre }}
                </span>
              </div>
            </div>
            <button @click="playContent(selectedItem)"
              class="w-full py-3 bg-pink-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-pink-700 transition duration-300">
              <PlayIcon class="w-6 h-6" />
              <span>Play</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PlayIcon, InfoIcon, ChevronLeftIcon, ChevronRightIcon, XIcon, StarIcon, ClockIcon, CalendarIcon } from 'lucide-vue-next'
import axios from 'axios'

const latestMovies = "https://vidsrc.xyz/movies/latest/page-1.json";

const latestMoviesData = ref([])

const fetchLatestMovies = async () => {
  try {
    const response = await axios.get(latestMovies)
    latestMoviesData.value = response.data.result
    localStorage.setItem('latestMovies', JSON.stringify(response.data))
  } catch (error) {
    console.error('Error fetching latest movies:', error)
  }
}

onMounted(() => {
  fetchLatestMovies()
})

const currentFeatureIndex = ref(0)
const isModalOpen = ref(false)
const selectedItem = ref(null)
const recentContainer = ref(null)
const trendingContainer = ref(null)

const featuredContent = [
  {
    id: 1,
    title: "Cosmic Odyssey",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    description: "Embark on an interstellar journey through time and space in this mind-bending sci-fi epic.",
    rating: "PG-13",
    year: 2023,
    duration: "2h 15m",
    cast: "Emma Stone, John Boyega, Oscar Isaac",
    genres: ["Sci-Fi", "Adventure", "Drama"]
  },
  {
    id: 2,
    title: "Neon Nights",
    backdrop: "/placeholder.svg?height=1080&width=1920",
    description: "Dive into a cyberpunk world where reality and virtual realms collide in a neon-soaked thriller.",
    rating: "R",
    year: 2023,
    duration: "1h 58m",
    cast: "Margot Robbie, Idris Elba, Rami Malek",
    genres: ["Thriller", "Sci-Fi", "Action"]
  },
]

const recentlyWatched = [
  {
    id: 1,
    title: "Echoes of Eternity",
    thumbnail: "/placeholder.svg?height=225&width=400",
    progress: 45,
    description: "A haunting tale of love that transcends lifetimes, blending historical drama with supernatural elements.",
    rating: "PG-13",
    year: 2022,
    duration: "2h 5m",
    cast: "Saoirse Ronan, Timothée Chalamet, Cate Blanchett",
    genres: ["Drama", "Romance", "Fantasy"]
  },
  {
    id: 2,
    title: "Quantum Quandary",
    thumbnail: "/placeholder.svg?height=225&width=400",
    progress: 30,
    description: "A mind-bending journey through parallel universes as a physicist tries to find her way home.",
    rating: "PG-13",
    year: 2023,
    duration: "2h 22m",
    cast: "Brie Larson, Daniel Kaluuya, Mahershala Ali",
    genres: ["Sci-Fi", "Mystery", "Adventure"]
  },
]

const trending = [
  {
    id: 1,
    title: "Whispers in the Wind",
    thumbnail: "/placeholder.svg?height=300&width=200",
    description: "A gripping psychological thriller set in a remote coastal town where secrets are carried by the breeze.",
    rating: "R",
    year: 2023,
    duration: "2h 7m",
    cast: "Florence Pugh, Anya Taylor-Joy, Willem Dafoe",
    genres: ["Thriller", "Mystery", "Drama"]
  },
  {
    id: 2,
    title: "Neon Dynasty",
    thumbnail: "/placeholder.svg?height=300&width=200",
    description: "In a futuristic Tokyo, a street-smart hacker becomes entangled in a web of corporate espionage and artificial intelligence.",
    rating: "R",
    year: 2023,
    duration: "2h 18m",
    cast: "Hiroyuki Sanada, Karen Fukuhara, Mads Mikkelsen",
    genres: ["Sci-Fi", "Action", "Thriller"]
  },
]

let featureInterval

onMounted(() => {
  featureInterval = setInterval(() => {
    currentFeatureIndex.value = (currentFeatureIndex.value + 1) % featuredContent.length
  }, 10000)
})

onUnmounted(() => {
  if (featureInterval) clearInterval(featureInterval)
})

const scroll = (section, direction) => {
  const container = section === 'recent' ? recentContainer.value : trendingContainer.value
  if (container) {
    const scrollAmount = container.clientWidth * 0.8
    container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' })
  }
}

const openModal = (item) => {
  selectedItem.value = item
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const playContent = (item) => {
  console.log('Playing:', item.title)
  // Implement play functionality here
}
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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>