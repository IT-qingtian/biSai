<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const logoUrl = ref('/logo.png') // 请确保在 public 目录下放置 logo 图片

</script>

<template>
    <header class="header">
        <div class="header-content">
            <div class="logo-container" @click="router.push('/')">
                <img :src="logoUrl" alt="青梦团队 Logo" class="logo">
                <div class="logo-text">
                    <h1 class="logo-cn">青梦团队</h1>
                    <span class="logo-en">Dream Team</span>
                </div>
            </div>
            <nav class="nav-menu">
                <router-link to="/" class="nav-item">首页</router-link>
                <router-link to="/about" class="nav-item">关于我们</router-link>
                <router-link to="/services" class="nav-item">服务项目</router-link>
                <router-link to="/news" class="nav-item">新闻动态</router-link>
                <router-link to="/contact" class="nav-item">联系我们</router-link>
                <router-link to="/user" class="nav-item user-profile">
                    <el-icon class="user-icon">
                        <User />
                    </el-icon>
                    <span>我的</span>
                </router-link>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.header {
    background-color: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
    height: var(--header-height);
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo-container {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.logo {
    height: 40px;
    width: auto;
}

.logo-text {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.logo-cn {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
    line-height: 1.2;
}

.logo-en {
    font-size: 0.9rem;
    color: var(--text-color-light);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.nav-menu {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav-item {
    color: var(--text-color);
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s;
    padding: 0.5rem 0;
    position: relative;
}

.nav-item:hover {
    color: var(--primary-color);
}

.nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s;
}

.nav-item:hover::after {
    width: 100%;
}

.router-link-active {
    color: var(--primary-color);
}

.router-link-active::after {
    width: 100%;
}

/* 新增用户图标样式 */
.user-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    background-color: rgba(74, 144, 226, 0.05);
    transition: all 0.3s ease;
}

.user-profile:hover {
    background-color: rgba(74, 144, 226, 0.1);
}

.user-icon {
    font-size: 1.2rem;
    transition: transform 0.3s ease;
}

.user-profile:hover .user-icon {
    transform: scale(1.1);
}

/* 移除用户图标的下划线效果 */
.user-profile::after {
    display: none;
}
</style>