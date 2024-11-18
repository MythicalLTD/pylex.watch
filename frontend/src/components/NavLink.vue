<template>
    <a :href="item.href"
        class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-200">
        {{ item.name }}
    </a>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    }
})
</script>