<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/service/api";
import axios from "axios";
import { ref } from "vue";
import { toast } from "vue-sonner";

const emits = defineEmits(["refresh"]);

const username = ref("")
const password = ref("")

function login() {
    if (username.value.trim() === "") {
        toast.error("Username could not be empty")
        return
    }
    axios.post(`${API_URL}/admin/login`, {
        username: username.value,
        password: password.value
    }).then(response => {
        toast.success("Login Success")
        emits("refresh")
    }).catch(err => {
        toast.error(err.response.data.message || "Login Failed")
    })
}
</script>
<template>
    <div class="w-full  rounded-md border p-6">
        <div class="space-y-1">
            <h2 class="text-base font-medium">
                登录
            </h2>
            <p class="text-sm text-muted-foreground">
                登录管理员账户
            </p>
        </div>
        <div class="mt-6 space-y-4">
            <div class="space-y-2">
                <label for="username" class="text-sm font-medium leading-none">
                    账号
                </label>
                <Input v-model="username" id="username" placeholder="请输入账号" />
            </div>
            <div class="space-y-2">
                <label for="password" class="text-sm font-medium leading-none">
                    密码
                </label>
                <Input v-model="password" id="password" type="password" placeholder="请输入密码" />
            </div>
        </div>
        <div class="mt-6 flex justify-end">
            <Button @click="login">
                登录
            </Button>
        </div>
    </div>
</template>