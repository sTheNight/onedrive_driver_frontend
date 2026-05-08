<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/service/api";
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";

const emits = defineEmits(["refresh"]);

const username = ref("")
const password = ref("")
const confirmPassword = ref("")
function initialAccount() {
    if (username.value.trim() === "") {
        toast.error("Username could not be empty")
        return
    }
    if (password.value !== confirmPassword.value) {
        toast.error("Please confirm your password")
        return
    }
    axios.post(`${API_URL}/admin/init`, {
        username: username.value,
        password: password.value
    }).then(response => {
        toast.success("Initial Success")
        emits("refresh")
    }).catch(err => {
        toast.error(err.response.data.message || "Initial Failed")
    })
}
</script>
<template>
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
                    用户名
                </label>
                <Input v-model="username" id="account" placeholder="请输入用户名" />
            </div>
            <div class="space-y-2">
                <label for="password" class="text-sm font-medium leading-none">
                    密码
                </label>
                <Input v-model="password" id="password" type="password" placeholder="请输入密码" />
            </div>
            <div class="space-y-2">
                <label for="confirm-password" class="text-sm font-medium leading-none">
                    验证密码
                </label>
                <Input v-model="confirmPassword" id="confirm-password" type="password" placeholder="请二次输入密码" />
            </div>
        </div>
        <div class="mt-6 flex justify-end">
            <Button @click="initialAccount">
                创建账户
            </Button>
        </div>
    </div>
</template>