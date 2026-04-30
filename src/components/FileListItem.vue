<script setup lang="ts">
import type { FileListItem as FileListItemModel } from "@/models";
import { Button } from "@/components/ui/button";
import {
    Download,
    File,
    FileArchive,
    FileAudio,
    FileCode,
    FileImage,
    FileText,
    FileVideo,
    Folder,
} from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps<{
    item: FileListItemModel;
    isLast?: boolean;
}>();

const emit = defineEmits<{
    open: [item: FileListItemModel];
    download: [item: FileListItemModel];
}>();

const icon = computed(() => {
    if (props.item.itemType === "folder") {
        return Folder;
    }

    const mimeType = props.item.mimeType ?? "";
    if (mimeType.startsWith("image/")) return FileImage;
    if (mimeType.startsWith("video/")) return FileVideo;
    if (mimeType.startsWith("audio/")) return FileAudio;
    if (mimeType.includes("zip") || mimeType.includes("compressed") || mimeType.includes("archive")) return FileArchive;
    if (mimeType.includes("json") || mimeType.includes("javascript") || mimeType.includes("typescript") || mimeType.includes("xml")) {
        return FileCode;
    }
    if (mimeType.startsWith("text/") || mimeType.includes("pdf") || mimeType.includes("document")) return FileText;

    return File;
});

const itemMeta = computed(() => {
    if (props.item.itemType === "folder") {
        return `${props.item.childCount ?? 0} items`;
    }

    return formatFileSize(props.item.size);
});

const lastModified = computed(() => {
    if (!props.item.lastModified) {
        return "";
    }

    const date = new Date(props.item.lastModified);
    if (Number.isNaN(date.getTime())) {
        return props.item.lastModified;
    }

    return new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
});

const canDownload = computed(() => props.item.itemType === "file" && Boolean(props.item.downloadUrl));

function formatFileSize(size: number) {
    if (!Number.isFinite(size) || size <= 0) {
        return "0 B";
    }

    const units = ["B", "KB", "MB", "GB", "TB"];
    const unitIndex = Math.min(Math.floor(Math.log(size) / Math.log(1024)), units.length - 1);
    const value = size / 1024 ** unitIndex;

    return `${value.toFixed(value >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function handleOpen() {
    emit("open", props.item);
}

function handleDownload() {
    emit("download", props.item);
}
</script>

<template>
    <div class="group grid min-h-16 w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 px-2 py-2 transition-colors hover:bg-muted/50 select-none"
        :class="{ 'border-b': !isLast }"
        role="button" tabindex="0" @click="handleOpen" @keydown.enter.prevent="handleOpen"
        @keydown.space.prevent="handleOpen">
        <div class="flex size-10 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground"
            :class="{ 'text-sky-600': item.itemType === 'folder' }">
            <component :is="icon" class="size-5" />
        </div>

        <div class="min-w-0">
            <div class="truncate text-sm font-medium leading-5">
                {{ item.name }}
            </div>
            <div class="mt-0.5 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                <span>{{ itemMeta }}</span>
                <span v-if="item.mimeType" class="truncate">{{ item.mimeType }}</span>
                <span v-if="lastModified">{{ lastModified }}</span>
            </div>
        </div>

        <Button v-if="canDownload" type="button" variant="ghost" size="icon"
            class="opacity-70 transition-opacity group-hover:opacity-100" title="Download" aria-label="Download"
            @click.stop="handleDownload">
            <Download class="size-4" />
        </Button>
    </div>
</template>
