<template>
    <nav class="bg-black bg-opacity-30 backdrop-blur-md text-white sticky top-0 z-50 transition-all duration-300" :class="{ 'shadow-lg': scrolled }">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <router-link to="/" class="flex items-center space-x-2 group">
              <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center transform group-hover:rotate-180 transition-all duration-300">
                <PlayIcon class="w-6 h-6 text-white transform group-hover:scale-110 transition-all duration-300" />
              </div>
              <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">PylexWatch</span>
            </router-link>
          </div>
          
          <div class="hidden md:flex items-center space-x-4">
            <NavLink v-for="item in navigation" :key="item.name" :item="item" />
          </div>
          
          <div class="flex items-center space-x-4">
            <SearchBar />
            <div class="relative" v-click-outside="closeDropdown">
              <button @click="toggleDropdown" class="flex items-center space-x-2 focus:outline-none group">
                <img src="https://github.com/nayskutzu.png" alt="Guest" class="w-8 h-8 rounded-full bg-gray-300 group-hover:ring-2 group-hover:ring-purple-500 transition-all duration-300">
                <span class="hidden md:inline-block group-hover:text-purple-400 transition-colors duration-300">Guest</span>
                <ChevronDownIcon v-if="!isDropdownOpen" class="w-4 h-4 group-hover:text-purple-400 transition-colors duration-300" />
                <ChevronUpIcon v-else class="w-4 h-4 group-hover:text-purple-400 transition-colors duration-300" />
              </button>
              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="opacity-0 translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition ease-in duration-150"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 translate-y-1"
              >
                <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-black bg-opacity-80 backdrop-blur-md rounded-md shadow-lg py-1 z-50">
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500 hover:text-white transition-colors duration-200">Profile</router-link>
                  <router-link to="/settings" class="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-500 hover:text-white transition-colors duration-200">Settings</router-link>
                  <button @click="logout" class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-500 hover:text-white transition-colors duration-200">Logout</button>
                </div>
              </transition>
            </div>
            <button @click="toggleMobileMenu" class="md:hidden focus:outline-none">
              <MenuIcon v-if="!isMobileMenuOpen" class="w-6 h-6" />
              <XIcon v-else class="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
      <transition
        enter-active-class="transition-all ease-in-out duration-300"
        enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-screen"
        leave-active-class="transition-all ease-in-out duration-300"
        leave-from-class="opacity-100 max-h-screen"
        leave-to-class="opacity-0 max-h-0"
      >
        <div v-if="isMobileMenuOpen" class="md:hidden bg-black bg-opacity-90 backdrop-blur-md overflow-hidden">
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-purple-500 transition-colors duration-200"
              @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
      </transition>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import { PlayIcon, ChevronDownIcon, ChevronUpIcon, MenuIcon, XIcon } from 'lucide-vue-next';
  import NavLink from '@/components/ui/NavLink.vue';
  import SearchBar from '@/components/ui/SearchBar.vue';
  
  const navigation = [
    { name: 'Home', href: '/home' },
    { name: 'Movies', href: '/movies' },
    { name: 'TV Shows', href: '/tv-shows' },
    { name: 'My List', href: '/my-list' },
  ];
  
  const isDropdownOpen = ref(false);
  const isMobileMenuOpen = ref(false);
  const scrolled = ref(false);
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  };
  
  const closeDropdown = () => {
    isDropdownOpen.value = false;
  };
  
  const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  };
  
  const logout = () => {
    // Implement logout logic here
    console.log('Logging out...');
    closeDropdown();
  };
  
  const handleScroll = () => {
    scrolled.value = window.scrollY > 0;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  </script>