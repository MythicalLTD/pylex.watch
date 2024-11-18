<template>
    <div
        class="min-h-screen flex items-center justify-center text-white px-4">
        <div class="text-center">
            <h1 class="text-6xl font-bold mb-4 animate-pulse">
                <span class="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">404</span>
            </h1>
            <p class="text-2xl mb-8">Oops! This page has vanished into the void.</p>
            <div class="mb-8">
                <FileQuestionIcon class="w-24 h-24 mx-auto text-purple-500 animate-bounce" />
            </div>
            <router-link to="/"
                class="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full inline-flex items-center space-x-2 hover:from-purple-600 hover:to-blue-600 transition-all duration-300">
                <HomeIcon class="w-5 h-5" />
                <span>Return to Home</span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { FileQuestionIcon, HomeIcon } from 'lucide-vue-next';
</script>