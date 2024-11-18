<template>
    <div class="relative group">
        <input type="text" placeholder="Search movies, TV shows..."
            class="bg-gray-800 bg-opacity-50 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition-all duration-300 placeholder-gray-400">
        <button
            class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-white transition-colors duration-200">
            <SearchIcon class="w-5 h-5" />
        </button>
    </div>
</template>

<script setup>
import { SearchIcon } from 'lucide-vue-next';
</script>