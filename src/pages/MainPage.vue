<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { toast } from 'vue-sonner'
</script>
<template>
    <div class="w-full box-border h-dvh flex justify-center relative">
        <header class="absolute top-0 left-0 right-0 z-10 h-16 bg-background/70 backdrop-blur-lg">
            <div class="mx-auto h-full w-full max-w-2xl flex items-center justify-between border-b">
                <h2 class="m-0 p-0">OneDrive Driver</h2>
                <div class="flex gap-1 box-border">
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="ghost" size="sm">About</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                About
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </header>
        <div class="w-full h-full max-w-2xl">
            <main class="w-full h-full pt-16 overflow-y-auto">
                <p v-for="item in 100">I am content</p>
            </main>
        </div>
    </div>
</template>
