<script setup lang="ts">
import { Lock, User, Message } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const agreeTerms = ref(false)

const registerForm = reactive({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const handleRegister = async () => {
    if (!registerForm.username || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
        ElMessage.warning('请填写完整信息')
        return
    }

    if (!agreeTerms.value) {
        ElMessage.warning('请同意用户协议')
        return
    }

    if (registerForm.password !== registerForm.confirmPassword) {
        ElMessage.error('两次输入的密码不一致')
        return
    }

    loading.value = true
    try {
        // 这里添加实际的注册逻辑
        console.log('注册信息:', registerForm)
        await new Promise(resolve => setTimeout(resolve, 1000))
        ElMessage.success('注册成功')
        router.push('/user/login')
    } catch (error) {
        ElMessage.error('注册失败，请重试')
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="login-card">
        <div class="card-right">
            <div class="form-header">
                <h2>创建账号</h2>
                <p>开启您的健康之旅</p>
            </div>

            <el-form :model="registerForm" class="login-form">
                <el-form-item>
                    <el-input v-model="registerForm.username" placeholder="用户名" :prefix-icon="User" size="large" />
                </el-form-item>

                <el-form-item>
                    <el-input v-model="registerForm.email" placeholder="电子邮箱" :prefix-icon="Message" size="large" />
                </el-form-item>

                <el-form-item>
                    <el-input v-model="registerForm.password" type="password" placeholder="密码" :prefix-icon="Lock"
                        size="large" show-password />
                </el-form-item>

                <el-form-item>
                    <el-input v-model="registerForm.confirmPassword" type="password" placeholder="确认密码"
                        :prefix-icon="Lock" size="large" show-password />
                </el-form-item>

                <div class="form-options">
                    <el-checkbox v-model="agreeTerms">
                        我同意
                        <el-button link type="primary" class="terms-link">用户协议</el-button>
                        和
                        <el-button link type="primary" class="terms-link">隐私政策</el-button>
                    </el-checkbox>
                </div>

                <el-button type="primary" size="large" :loading="loading" class="submit-btn" @click="handleRegister">
                    注册
                </el-button>

                <div class="login-link">
                    已有账号？
                    <router-link to="/user/login">立即登录</router-link>
                </div>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="less">
.card-right {
    flex: 1;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .form-header {
        text-align: center;
        margin-bottom: 2rem;

        h2 {
            font-size: 2rem;
            color: rgba(44, 62, 80, 0.9);
            text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
            margin-bottom: 0.5rem;
        }

        p {
            color: rgba(102, 102, 102, 0.8);
            font-size: 1.1rem;
        }
    }

    .login-form {
        width: 100%;
        max-width: 360px;
        margin: 0 auto;

        .el-input {
            --el-input-height: 48px;
            margin-bottom: 1rem;
            --el-input-bg-color: rgba(255, 255, 255, 0.6);
            --el-input-border-color: rgba(255, 255, 255, 0.2);
            --el-input-hover-border-color: rgba(255, 255, 255, 0.4);

            .el-input__wrapper {
                backdrop-filter: blur(5px);
                box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;

                &:hover {
                    background: rgba(255, 255, 255, 0.7);
                }

                &.is-focus {
                    background: rgba(255, 255, 255, 0.8);
                }
            }
        }

        .form-options {
            margin: 1rem 0 1.5rem;

            .terms-link {
                padding: 0 2px;
            }
        }

        .submit-btn {
            width: 100%;
            height: 48px;
            font-size: 1.1rem;
            margin-bottom: 1rem;
        }

        .login-link {
            text-align: center;
            color: rgba(102, 102, 102, 0.8);
            margin-top: 1rem;

            a {
                color: var(--el-color-primary);
                text-decoration: none;
                margin-left: 0.5rem;
                font-weight: 500;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>
