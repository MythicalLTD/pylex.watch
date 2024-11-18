<template>
    <router-link :to="item.href"
        class="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-purple-500 hover:bg-opacity-50 transition-all duration-200">
        {{ item.name }}
    </router-link>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        required: true
    }
});
</script>