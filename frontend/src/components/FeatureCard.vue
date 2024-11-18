<template>
    <div
        class="group relative overflow-hidden rounded-2xl p-6 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
        <div
            class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300">
        </div>

        <component :is="icon" class="w-12 h-12 text-green-500 mb-4" />

        <h3 class="text-xl font-semibold text-white mb-2">{{ title }}</h3>
        <p class="text-gray-400">{{ description }}</p>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: Object,
        required: true
    }
})
</script>