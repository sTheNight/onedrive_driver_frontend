<script setup lang="ts">
import FileListItem from '@/components/FileListItem.vue';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import type { FileListItem as FileListItemModel } from '@/models';
import { getFileList } from '@/service/api';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter, type RouteLocationNormalizedLoaded } from 'vue-router';
import { toast } from 'vue-sonner'
import { Home, MoreVertical, RefreshCw } from 'lucide-vue-next';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSub, DropdownMenuPortal, DropdownMenuSubTrigger, DropdownMenuSubContent } from '@/components/ui/dropdown-menu';
const route = useRoute()
const router = useRouter()
const path = ref("")
const list = ref<FileListItemModel[]>([])
const isLoading = ref(false)
const pendingDownloadItem = ref<FileListItemModel | null>(null)
const isDownloadDialogOpen = ref(false)
const isABoutDialogOpen = ref(false)
let requestId = 0

const pathSegments = computed(() => {
    const segments = path.value.split("/").filter(Boolean)

    return segments.map((name, index) => ({
        name,
        path: segments.slice(0, index + 1).join("/"),
    }))
})

function normalizePath(value: string) {
    return value.replace(/^\/+|\/+$/g, "")
}

function getPathFromRoute(currentRoute: RouteLocationNormalizedLoaded) {
    const pathMatch = currentRoute.params.pathMatch

    if (Array.isArray(pathMatch)) {
        return normalizePath(pathMatch.join("/"))
    }

    if (typeof pathMatch === "string") {
        return normalizePath(pathMatch)
    }

    return ""
}

function getRoutePath(value: string) {
    const normalizedPath = normalizePath(value)

    if (!normalizedPath) {
        return "/"
    }

    return `/${normalizedPath.split("/").map(encodeURIComponent).join("/")}`
}

function goToPath(value: string) {
    const normalizedPath = normalizePath(value)
    if (getPathFromRoute(route) === normalizedPath) {
        console.log("return")
        return
    }

    router.push(getRoutePath(normalizedPath))
}

function scrollBreadcrumb(event: WheelEvent) {
    const element = event.currentTarget

    if (!(element instanceof HTMLElement) || Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        return
    }

    if (element.scrollWidth <= element.clientWidth) {
        return
    }

    event.preventDefault()
    element.scrollLeft += event.deltaY
}

function getList(targetPath = path.value) {
    const currentRequestId = ++requestId
    isLoading.value = true
    getFileList(targetPath)
        .then(response => {
            if (currentRequestId !== requestId) {
                return
            }

            list.value = response.data
        })
        .catch(err => {
            if (currentRequestId !== requestId) {
                return
            }

            toast.error(err.message)
        })
        .finally(() => {
            if (currentRequestId !== requestId) {
                return
            }

            isLoading.value = false
        })
}
function openItem(item: FileListItemModel) {
    if (item.itemType === "folder") {
        const nextPath = [path.value, item.name]
            .filter(Boolean)
            .join("/")
            .replace(/^\/+|\/+$/g, "")

        goToPath(nextPath)
    } else if (item.itemType === "file") {
        pendingDownloadItem.value = item
        isDownloadDialogOpen.value = true
    }
}

function downloadItem(item: FileListItemModel) {
    if (!item.downloadUrl) {
        return
    }

    window.open(item.downloadUrl, "_blank")
}

function confirmDownload() {
    if (!pendingDownloadItem.value) {
        return
    }

    downloadItem(pendingDownloadItem.value)
    isDownloadDialogOpen.value = false
    pendingDownloadItem.value = null
}

function openLink(url: string) {
    window.open(url)
}

watch(
    () => route.fullPath,
    () => {
        const routePath = getPathFromRoute(route)
        path.value = routePath
        getList(routePath)
    },
    { immediate: true },
)
</script>
<template>
    <div class="w-full box-border h-dvh flex justify-center relative px-4">
        <header class="absolute top-0 left-0 right-0 z-10 h-16 bg-background/70 backdrop-blur-lg px-4">
            <div class="mx-auto h-full w-full max-w-2xl flex items-center justify-between border-b">
                <h2 class="m-0 p-0">OneDrive Driver</h2>
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
                                            Frontend</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                            <DropdownMenuItem @click="isABoutDialogOpen = true">
                                About
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
        <div class="w-full h-full max-w-2xl">
            <main class="w-full h-full pt-16 overflow-y-auto scrollbar-hide">
                <div class="flex w-full min-h-full flex-col gap-4 pt-4">
                    <div class="flex gap-2 items-center">
                        <div class="min-w-0 flex-1 overflow-hidden rounded-md border bg-background px-3 py-2">
                            <Breadcrumb class="min-w-0 select-none">
                                <BreadcrumbList
                                    class="w-full flex-nowrap overflow-x-auto whitespace-nowrap break-normal scrollbar-hide"
                                    @wheel="scrollBreadcrumb">
                                    <BreadcrumbItem class="shrink-0">
                                        <BreadcrumbPage v-if="pathSegments.length === 0"
                                            class="inline-flex items-center gap-1.5">
                                            <Home class="size-4" />
                                            Root
                                        </BreadcrumbPage>
                                        <BreadcrumbLink v-else as="button" type="button"
                                            class="inline-flex items-center gap-1.5" @click="goToPath('')">
                                            <Home class="size-4" />
                                            Root
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>

                                    <template v-for="(segment, index) in pathSegments" :key="segment.path">
                                        <BreadcrumbSeparator class="shrink-0" />
                                        <BreadcrumbItem class="shrink-0">
                                            <BreadcrumbPage v-if="index === pathSegments.length - 1"
                                                class="max-w-40 truncate sm:max-w-64" :title="segment.name">
                                                {{ segment.name }}
                                            </BreadcrumbPage>
                                            <BreadcrumbLink v-else as="button" type="button"
                                                class="max-w-40 truncate sm:max-w-64" :title="segment.name"
                                                @click="goToPath(segment.path)">
                                                {{ segment.name }}
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                    </template>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                        <Button size="icon-sm" variant="ghost" class="shrink-0" :disabled="isLoading" title="Refresh"
                            aria-label="Refresh" @click="() => getList()">
                            <RefreshCw :class="['size-4', isLoading ? 'animate-spin' : '']" />
                        </Button>
                    </div>

                    <div class="relative min-h-16 w-full overflow-hidden rounded-md border select-none">
                        <FileListItem v-for="(item, index) in list" :key="item.id" :item="item"
                            :is-last="index === list.length - 1" @open="openItem" @download="downloadItem" />
                        <div v-if="!isLoading && list.length == 0"
                            class="w-full min-h-16 flex justify-center items-center">
                            No items
                        </div>
                        <Transition name="state-fade" mode="out-in">
                            <div v-if="isLoading"
                                class="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-xs">
                                Loading...
                            </div>
                        </Transition>
                    </div>
                </div>
            </main>
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

        <Dialog v-model:open="isDownloadDialogOpen">
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{{ pendingDownloadItem?.name }}</DialogTitle>
                    <DialogDescription>
                        Do you want to download this file?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button :disabled="!pendingDownloadItem?.downloadUrl" @click="confirmDownload">
                        Download
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
<style lang="css" scoped>
.state-fade-enter-active,
.state-fade-leave-active {
    transition: opacity .15s;
}

.state-fade-enter-from,
.state-fade-leave-to {
    opacity: 0;
}
</style>
