<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/service/api";
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";

const rootPath = ref("")
const clientId = ref("")
const clientSecret = ref("")
const refreshToken = ref("")

function saveConfig() {
    axios.put(`${API_URL}/admin/onedrive-config`, {
        onedriveRootPath: rootPath.value,
        onedriveClientId: clientId.value,
        onedriveClientSecret: clientSecret.value,
        onedriveRefreshToken: refreshToken.value
    }).then(response => {
        toast.success("Saved")
    }).catch(err => {
        toast.error(err.response.data.message || "Save Failed")
    })
}

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
                <label for="username" class="text-sm font-medium leading-none">
                    ONEDRIVE_ROOT_PATH
                </label>
                <Input v-model="rootPath" id="username" />
            </div>
            <div class="space-y-2">
                <label for="password" class="text-sm font-medium leading-none">
                    ONEDRIVE_CLIENT_ID
                </label>
                <Input v-model="clientId" id="password" />
            </div>
            <div class="space-y-2">
                <label for="password" class="text-sm font-medium leading-none">
                    ONEDRIVE_CLIENT_SECRET
                </label>
                <Input v-model="clientSecret" id="password" />
            </div>
            <div class="space-y-2">
                <label for="password" class="text-sm font-medium leading-none">
                    ONEDRIVE_REFRESH_TOKEN
                </label>
                <Input v-model="refreshToken" id="password" />
            </div>
        </div>
        <div class="mt-6 flex justify-end">
            <Button @click="saveConfig">
                保存
            </Button>
        </div>
    </div>
</template>