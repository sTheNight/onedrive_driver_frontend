<script setup lang="ts">
/**
 * 未完成
 */
import { getCurrentUser } from "@/service/admin";
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import Input from "@/components/ui/input/Input.vue";
import Button from "@/components/ui/button/Button.vue";

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
            <div v-else-if="isUnInitialized">
                <div class="w-full  rounded-md border p-6">
                    <div class="space-y-1">
                        <h2 class="text-base font-medium">
                            初始化
                        </h2>
                        <p class="text-sm text-muted-foreground">
                            创建初始管理员账户
                        </p>
                    </div>
                    <div class="mt-6 space-y-4">
                        <div class="space-y-2">
                            <label for="account" class="text-sm font-medium leading-none">
                                账号
                            </label>
                            <Input id="account" placeholder="请输入账号" />
                        </div>
                        <div class="space-y-2">
                            <label for="password" class="text-sm font-medium leading-none">
                                密码
                            </label>
                            <Input id="password" type="password" placeholder="请输入密码" />
                        </div>
                    </div>
                    <div class="mt-6 flex justify-end">
                        <Button>
                            创建账户
                        </Button>
                    </div>
                </div>
            </div>
            <div v-else-if="isUnAuthenticated">
                <div class="w-full rounded-md border p-6">
                    <div class="space-y-1">
                        <h2 class="text-base font-medium">
                            登陆
                        </h2>
                        <p class="text-sm text-muted-foreground">
                            登陆管理员账户
                        </p>
                    </div>
                    <div class="mt-6 space-y-4">
                        <div class="space-y-2">
                            <label for="account" class="text-sm font-medium leading-none">
                                账号
                            </label>
                            <Input id="account" placeholder="请输入账号" />
                        </div>
                        <div class="space-y-2">
                            <label for="password" class="text-sm font-medium leading-none">
                                密码
                            </label>
                            <Input id="password" type="password" placeholder="请输入密码" />
                        </div>
                    </div>
                    <div class="mt-6 flex justify-end">
                        <Button>
                            登陆
                        </Button>
                    </div>
                </div>
            </div>
            <div v-else-if="isAuthenticated">
                <div class="w-full rounded-md border p-6">
                </div>
            </div>
        </main>
    </div>
</template>
<style lang="css" scoped></style>