<script setup lang="ts">
import { ref } from 'vue';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuPortal, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
import { MoreVertical } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { useRouter } from 'vue-router';
const router = useRouter()

function openLink(url: string) {
    window.open(url)
}
const isABoutDialogOpen = ref(false)

</script>
<template>
    <div class="w-full box-border h-dvh flex justify-center relative px-4">
        <header class="absolute top-0 left-0 right-0 z-10 h-16 bg-background/70 backdrop-blur-lg px-4">
            <div class="mx-auto h-full w-full max-w-2xl flex items-center justify-between border-b">
                <h2 class="m-0 p-0 cursor-pointer" @click="router.push('/')">OneDrive Driver</h2>
                <div class="flex gap-1 box-border">
                    <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                            <Button variant="ghost">
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Github</DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem
                                            @click="openLink('https://github.com/sTheNight/onedrive_driver_rs')">Backend
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            @click="openLink('https://github.com/sTheNight/onedrive_driver_frontend')">
                                            Frontend
                                        </DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem @click="router.push('/@admin')">
                                Admin Panel
                            </DropdownMenuItem>
                            <DropdownMenuItem @click="isABoutDialogOpen = true">
                                About
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
        <RouterView />
    </div>
    <Dialog v-model:open="isABoutDialogOpen">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>About</DialogTitle>
                <DialogDescription>
                    This project is developed by
                    <Button variant="link" @click="openLink('https://github.com/sTheNight')">重鉻酸鈉</Button>
                    and is open-source
                    under the AGPL 3.0 license.
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
</template>
<style lang="css" scoped></style>