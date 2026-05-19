<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Input } from "@/components/ui/input";
import type { OnedriveConfig } from "@/models";
import { API_URL } from "@/service/api";
import axios from "axios";
import { onMounted, ref } from "vue";
import { toast } from "vue-sonner";

const onedriveConfig = ref<OnedriveConfig>({} as OnedriveConfig);

function saveConfig() {
    axios.put(`${API_URL}/admin/onedrive-config`, {
        onedriveRootPath: onedriveConfig.value.onedriveRootPath,
        onedriveClientId: onedriveConfig.value.onedriveClientId,
        onedriveClientSecret: onedriveConfig.value.onedriveClientSecret,
        onedriveRefreshToken: onedriveConfig.value.onedriveRefreshToken
    }).then(response => {
        toast.success("Saved")
    }).catch(err => {
        toast.error(err.response.data.message || "Save Failed")
    })
}

function getConfig() {
    axios.get(`${API_URL}/admin/onedrive-config`).then(response => {
        const remoteConfig = response.data as OnedriveConfig
        onedriveConfig.value = remoteConfig
    }).then(err => {

    })
}

onMounted(() => {
    getConfig()
})

</script>
<template>
    <div class="w-full  rounded-md border p-6">
        <div class="space-y-1">
            <h2 class="text-base font-medium">
                OneDrive API 配置
            </h2>
        </div>
        <div class="mt-6 space-y-4">
            <div class="space-y-2">
                <label for="root-path" class="text-sm font-medium leading-none">
                    ONEDRIVE_ROOT_PATH
                </label>
                <Input v-model="onedriveConfig.onedriveRootPath" id="root-path" />
            </div>
            <div class="space-y-2">
                <label for="client-id" class="text-sm font-medium leading-none">
                    ONEDRIVE_CLIENT_ID
                </label>
                <Input v-model="onedriveConfig.onedriveClientId" id="client-id" />
            </div>
            <div class="space-y-2">
                <label for="client-secret" class="text-sm font-medium leading-none">
                    ONEDRIVE_CLIENT_SECRET
                </label>
                <Input v-model="onedriveConfig.onedriveClientSecret" id="client-secret" />
            </div>
            <div class="space-y-2">
                <label for="refresh-token" class="text-sm font-medium leading-none">
                    ONEDRIVE_REFRESH_TOKEN
                </label>
                <Input v-model="onedriveConfig.onedriveRefreshToken" id="refresh-token" />
            </div>
        </div>
        <div class="mt-6 flex justify-end">
            <Button @click="saveConfig">
                保存
            </Button>
        </div>
    </div>
</template>