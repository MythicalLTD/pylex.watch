<template>


    <!-- Main Content -->
    <main class="pt-20 pb-16 px-4">
        <!-- Hero Section -->
        <div class="max-w-7xl mx-auto mt-16 text-center">
            <div class="relative">
                <div class="absolute inset-0 flex items-center justify-center blur-3xl opacity-20">
                    <div class="w-96 h-96 bg-green-500 rounded-full"></div>
                </div>

                <h1 class="text-5xl font-bold text-white mb-6 relative">
                    Register, Discover and Track
                    <span class="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">
                        Your Favorite Movies & Shows
                    </span>
                </h1>

                <div class="relative mt-8 max-w-xl mx-auto">
                    <SearchBar size="large" />
                </div>

                <div class="mt-12">
                    <button
                        class="group relative px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300">
                        <span class="relative z-10 text-white font-medium">View Full Site</span>
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 -z-10">
                        </div>
                    </button>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="max-w-7xl mx-auto mt-24">
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard v-for="feature in features" :key="feature.title" :title="feature.title"
                    :description="feature.description" :icon="feature.icon" />
            </div>
        </div>
    </main>

</template>

<script setup>
import { PlayCircleIcon, FilmIcon, TvIcon, GlobeIcon } from 'lucide-vue-next'
import SearchBar from '@/components/ui/SearchBar.vue'
import FeatureCard from '@/components/FeatureCard.vue'

const features = [
    {
        title: 'Extensive Library',
        description: 'Access thousands of movies and TV shows from various genres and countries.',
        icon: FilmIcon
    },
    {
        title: 'Track Your Shows',
        description: 'Keep track of what you\'re watching and never miss an episode.',
        icon: TvIcon
    },
    {
        title: 'Global Content',
        description: 'Enjoy content from around the world with our diverse collection.',
        icon: GlobeIcon
    }
]
</script>

<style>
.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }

    33% {
        transform: translate(30px, -50px) scale(1.1);
    }

    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }

    100% {
        transform: translate(0px, 0px) scale(1);
    }
}
</style>