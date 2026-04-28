<script setup lang="ts">
import FileListItem from '@/components/FileListItem.vue';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import type { FileListItem as FileListItemModel } from '@/models';
import { getFileList } from '@/service/api';
import { ref } from 'vue';
import { toast } from 'vue-sonner'
const path = ref("")
const list = ref<FileListItemModel[]>([])
const isLoading = ref(false)

function getList() {
    isLoading.value = true
    getFileList(path.value)
        .then(response => {
            list.value = response.data
            toast.success("success")
        })
        .catch(err => {
            toast.error(err.message)
        })
        .finally(() => {
            isLoading.value = false
        })
}

function openItem(item: FileListItemModel) {
    if (item.itemType === "folder") {
        path.value = [path.value, item.name]
            .filter(Boolean)
            .join("/")
            .replace(/^\/+|\/+$/g, "")
        getList()
    }
}

function downloadItem(item: FileListItemModel) {
    if (!item.downloadUrl) {
        return
    }

    window.open(item.downloadUrl, "_blank")
}
</script>
<template>
    <div class="w-full box-border h-dvh flex justify-center relative px-4">
        <header class="absolute top-0 left-0 right-0 z-10 h-16 bg-background/70 backdrop-blur-lg px-4">
            <div class="mx-auto h-full w-full max-w-2xl flex items-center justify-between border-b">
                <h2 class="m-0 p-0">OneDrive Driver</h2>
                <div class="flex gap-1 box-border">
                    <Dialog>
                        <DialogTrigger as-child>
                            <Button variant="ghost">About</Button>
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
            <main class="w-full h-full pt-16 overflow-y-auto scrollbar-hide">
                <div class="flex w-full min-h-full flex-col gap-4 pt-4">
                    <div class="flex gap-2 items-center">
                        <Input type="text" placeholder="Path" v-model="path" @keydown.enter="getList" />
                        <Button size="sm" class="shrink-0" :disabled="isLoading" @click="getList">
                            {{ isLoading ? "Loading" : "Fetch" }}
                        </Button>
                    </div>

                    <div class="w-full overflow-hidden rounded-md border">
                        <FileListItem v-for="item in list" :key="item.id" :item="item" @open="openItem"
                            @download="downloadItem" />

                        <div v-if="!isLoading && list.length === 0"
                            class="px-4 py-10 text-center text-sm text-muted-foreground">
                            No files
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
