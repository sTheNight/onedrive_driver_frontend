<script setup lang="ts">
import 'vue-sonner/style.css'
import { RouterView } from 'vue-router';
import { Toaster } from './components/ui/sonner';
</script>

<template>
    <div>
        <Transition>
            <RouterView v-slot="{ Component }">
                <component :is="Component" />
            </RouterView>
        </Transition>
        <Toaster position="top-center" />
    </div>
</template>

<style scoped></style>
