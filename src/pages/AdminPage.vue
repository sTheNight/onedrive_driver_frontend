<script setup lang="ts">
/**
 * 未完成
 */
import { getCurrentUser } from "@/service/admin";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import InitAccount from "./admin/InitAccount.vue";
import Login from "./admin/Login.vue";
import SetOneDriveConfig from "./admin/SetOneDriveConfig.vue";

type AuthStatus = "loading" | "authenticated" | "unauthenticated" | "uninitialized";
const status = ref<AuthStatus>("loading");
const isLoading = computed(() => status.value == "loading");
const isAuthenticated = computed(() => status.value == "authenticated");
const isUnAuthenticated = computed(() => status.value == "unauthenticated")
const isUnInitialized = computed(() => status.value == "uninitialized")

function fetchLoginStatus() {
    status.value = "loading";
    getCurrentUser(
    ).then(() => {
        status.value = "authenticated";
    }).catch((err) => {
        if (!axios.isAxiosError(err)) {
            status.value = "unauthenticated";
            return;
        }
        if (err.response?.status === 409) {
            status.value = "uninitialized";
            return;
        }
        if (err.response?.status === 401) {
            status.value = "unauthenticated";
            return;
        }
        status.value = "unauthenticated";
    });
}

onMounted(() => {
    fetchLoginStatus();
});
</script>

<template>
    <div class="w-full h-full max-w-2xl">
        <main class="w-full h-full pt-20 overflow-y-auto scrollbar-hide text-sm">
            <div v-if="isLoading" class="w-full h-16 flex justify-center items-center">
                Loading...
            </div>
            <InitAccount @refresh="fetchLoginStatus" v-else-if="isUnInitialized" />
            <Login @refresh="fetchLoginStatus" v-else-if="isUnAuthenticated" />
            <SetOneDriveConfig v-else-if="isAuthenticated" />
        </main>
    </div>
</template>
<style lang="css" scoped></style>