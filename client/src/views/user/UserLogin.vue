<script setup lang="ts">
import { Lock, Position, User } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const loading = ref(false)
const rememberMe = ref(false)

const loginForm = reactive({
    username: '',
    password: ''
})

const handleLogin = async () => {
    if (!loginForm.username || !loginForm.password) {
        ElMessage.warning('请填写完整信息')
        return
    }

    loading.value = true
    try {
        // 这里添加实际的登录逻辑
        console.log('登录信息:', loginForm)
        await new Promise(resolve => setTimeout(resolve, 1000))
        ElMessage.success('登录成功')
        router.push('/user/profile')
    } catch (error) {
        ElMessage.error('登录失败，请重试')
    } finally {
        loading.value = false
    }
}
</script>
<template>
    <div class="login-card">
        <div class="card-right">
            <div class="form-header">
                <h2>欢迎回来</h2>
                <p>请登录您的账号</p>
            </div>

            <el-form :model="loginForm" class="login-form">
                <el-form-item>
                    <el-input v-model="loginForm.username" placeholder="用户名" :prefix-icon="User" size="large" />
                </el-form-item>

                <el-form-item>
                    <el-input v-model="loginForm.password" type="password" placeholder="密码" :prefix-icon="Lock"
                        size="large" show-password />
                </el-form-item>

                <div class="form-options">
                    <el-checkbox v-model="rememberMe">记住我</el-checkbox>
                    <el-button link type="primary">忘记密码？</el-button>
                </div>

                <el-button type="primary" size="large" :loading="loading" class="submit-btn" @click="handleLogin">
                    登录
                </el-button>

                <div class="divider">
                    <span>或</span>
                </div>

                <div class="social-login">
                    <el-button class="social-btn">
                        <el-icon>
                            <Position />
                        </el-icon>
                        微信登录
                    </el-button>
                </div>

                <div class="register-link">
                    还没有账号？
                    <router-link to="/user/register">立即注册</router-link>
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
        }

        .submit-btn {
            width: 100%;
            height: 48px;
            font-size: 1.1rem;
        }

        .divider {
            text-align: center;
            margin: .5rem 0;
            position: relative;

            &::before,
            &::after {
                content: '';
                position: absolute;
                top: 50%;
                width: 45%;
                height: 1px;
                background: rgba(238, 238, 238, 0.5);
            }

            &::before {
                left: 0;
            }

            &::after {
                right: 0;
            }

            span {
                background: transparent;
                color: rgba(102, 102, 102, 0.8);
            }
        }

        .social-login {
            margin-bottom: 1.5rem;

            .social-btn {
                width: 100%;
                height: 48px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background: rgba(255, 255, 255, 0.6);
                backdrop-filter: blur(5px);

                .el-icon {
                    margin-right: 0.5rem;
                    font-size: 1.2rem;
                }

                &:hover {
                    background: rgba(255, 255, 255, 0.8);
                    border-color: rgba(255, 255, 255, 0.4);
                }
            }
        }

        .register-link {
            text-align: center;
            color: #666;

            a {
                color: var(--el-color-primary);
                text-decoration: none;
                margin-left: 0.5rem;

                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
}
</style>