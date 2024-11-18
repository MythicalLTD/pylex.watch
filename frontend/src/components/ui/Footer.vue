<template>
    <footer class="bg-black bg-opacity-30 backdrop-blur-md text-white py-6 mt-12">
        <div class="container mx-auto px-4">
            <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div class="flex items-center space-x-2">
                    <PlayIcon class="w-6 h-6 text-purple-500" />
                    <span
                        class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">PylexWatch</span>
                </div>
                <nav class="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
                    <router-link to="/about"
                        class="text-gray-400 hover:text-white transition-colors duration-200">About</router-link>
                    <router-link to="/contact"
                        class="text-gray-400 hover:text-white transition-colors duration-200">Contact</router-link>
                    <router-link to="/faq"
                        class="text-gray-400 hover:text-white transition-colors duration-200">FAQ</router-link>
                    <router-link to="/terms"
                        class="text-gray-400 hover:text-white transition-colors duration-200">Terms</router-link>
                </nav>
                <div class="flex space-x-4">
                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                        <FacebookIcon class="w-5 h-5" />
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                        <TwitterIcon class="w-5 h-5" />
                    </a>
                    <a href="#" class="text-gray-400 hover:text-white transition-colors duration-200">
                        <InstagramIcon class="w-5 h-5" />
                    </a>
                </div>
            </div>
            <div class="mt-6 text-center text-xs text-gray-500">
                <p>&copy; {{ currentYear }} PylexWatch. All rights reserved.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { computed } from 'vue';
import { PlayIcon, FacebookIcon, TwitterIcon, InstagramIcon } from 'lucide-vue-next';

const currentYear = computed(() => new Date().getFullYear());
</script>