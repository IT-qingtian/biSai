<script setup lang="ts">
import { Back, HomeFilled } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue';

// 健康提示数据
const healthTips = ref([
    { icon: 'Sunny', text: '每天晒晒太阳，补充维生素D' },
    { icon: 'Timer', text: '规律作息，保持充足睡眠' },
    { icon: 'Apple', text: '多吃水果蔬菜，营养均衡' },
    { icon: 'Cloudy', text: '适量运动，保持好心情' }
])

const isLoaded = ref(false)

onMounted(() => {
    isLoaded.value = true
})
</script>

<template>
    <div class="error-page">
        <!-- 动态背景 -->
        <div class="animated-background">
            <!-- 太阳 -->
            <div class="sun">
                <div class="sun-rays"></div>
            </div>
            <!-- 白云 -->
            <div class="clouds">
                <div class="cloud cloud-1"></div>
                <div class="cloud cloud-2"></div>
                <div class="cloud cloud-3"></div>
            </div>
            <!-- 飞鸟 -->
            <div class="birds">
                <div class="bird bird-1"></div>
                <div class="bird bird-2"></div>
            </div>
            <!-- 草地 -->
            <div class="grass">
                <!-- 添加花朵 -->
                <div class="flowers">
                    <div class="flower flower-1"></div>
                    <div class="flower flower-2"></div>
                    <div class="flower flower-3"></div>
                </div>
            </div>
            <!-- 蝴蝶 -->
            <div class="butterflies">
                <div class="butterfly butterfly-1"></div>
                <div class="butterfly butterfly-2"></div>
            </div>
        </div>

        <!-- 主要内容 -->
        <div class="error-content" :class="{ 'loaded': isLoaded }">
            <div class="left-section">
                <h1>404</h1>
                <h2>抱歉，页面走丢了~</h2>
                <p>别担心，让我们一起回到阳光大道吧！</p>
                <div class="actions">
                    <el-button type="primary" @click="$router.push('/')">
                        <el-icon>
                            <HomeFilled />
                        </el-icon>
                        返回首页
                    </el-button>
                    <el-button @click="$router.go(-1)">
                        <el-icon>
                            <Back />
                        </el-icon>
                        返回上页
                    </el-button>
                </div>
            </div>

            <div class="right-section">
                <div class="health-tips">
                    <h3>今日健康小贴士</h3>
                    <div class="tips-container">
                        <div v-for="(tip, index) in healthTips" :key="index" class="tip-card"
                            :style="{ animationDelay: `${index * 0.1}s` }">
                            <el-icon>
                                <component :is="tip.icon" />
                            </el-icon>
                            <span>{{ tip.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.error-page {
    height: calc(100vh - var(--header-height));
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 100%);
    padding: 2rem;
    position: relative;
    overflow: hidden;
}

// 动态背景
.animated-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}

// 太阳效果
.sun {
    overflow: hidden;
    position: absolute;
    top: 50px;
    right: 100px;
    width: 100px;
    height: 100px;
    background: #FFD700;
    border-radius: 50%;
    box-shadow: 0 0 50px #FFD700;
    animation: sunGlow 3s infinite alternate;

    &-rays {
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        background: radial-gradient(circle, transparent 40%, #FFD700 60%);
        animation: rotate 20s linear infinite;
    }
}

// 云朵效果
.clouds {
    position: absolute;
    width: 100%;
    height: 100%;

    .cloud {
        position: absolute;
        background: white;
        border-radius: 50px;
        animation: float 20s infinite linear;
        opacity: 0.9;

        &::before,
        &::after {
            content: '';
            position: absolute;
            background: inherit;
            border-radius: 50%;
        }

        &-1 {
            width: 120px;
            height: 40px;
            top: 100px;
            left: -120px;
            animation-delay: 0s;

            &::before {
                width: 50px;
                height: 50px;
                top: -20px;
                left: 15px;
            }

            &::after {
                width: 40px;
                height: 40px;
                top: -15px;
                right: 15px;
            }
        }

        &-2 {
            width: 100px;
            height: 35px;
            top: 200px;
            left: -100px;
            animation-delay: -7s;

            &::before {
                width: 45px;
                height: 45px;
                top: -18px;
                left: 12px;
            }

            &::after {
                width: 35px;
                height: 35px;
                top: -13px;
                right: 12px;
            }
        }

        &-3 {
            width: 80px;
            height: 30px;
            top: 150px;
            left: -80px;
            animation-delay: -14s;

            &::before {
                width: 40px;
                height: 40px;
                top: -15px;
                left: 10px;
            }

            &::after {
                width: 30px;
                height: 30px;
                top: -10px;
                right: 10px;
            }
        }

        &:hover {
            transform: scale(1.1);
            transition: transform 0.3s ease;
        }
    }
}

// 草地效果
.grass {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(180deg, #90EE90 0%, #228B22 100%);
    transform: skewY(-3deg);
    transform-origin: 0;
}

// 主内容样式
.error-content {
    position: relative;
    z-index: 1;
    display: flex;
    gap: 4rem;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 3rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    max-width: 1000px;
    margin: 0 2rem;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;

    &.loaded {
        opacity: 1;
        transform: translateY(0);
    }

    .left-section {
        flex: 1;

        h1 {
            font-size: 6rem;
            margin: 0;
            background: linear-gradient(135deg, #4A90E2 0%, #87CEEB 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
        }

        h2 {
            font-size: 2rem;
            color: #333;
            margin: 1rem 0;
        }

        p {
            color: #666;
            font-size: 1.1rem;
            margin-bottom: 2rem;
        }

        .actions {
            display: flex;
            gap: 1rem;
        }
    }

    .right-section {
        flex: 1;

        .health-tips {
            h3 {
                color: #333;
                font-size: 1.5rem;
                margin-bottom: 1.5rem;
            }

            .tips-container {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .tip-card {
                    background: white;
                    padding: 1rem;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    animation: slideIn 0.5s ease forwards;
                    opacity: 0;
                    transform: translateX(20px);

                    .el-icon {
                        font-size: 1.5rem;
                        color: #4A90E2;
                        background: #EFF6FF;
                        padding: 0.8rem;
                        border-radius: 10px;
                    }

                    span {
                        color: #333;
                        font-size: 1rem;
                    }

                    &:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    }
                }
            }
        }
    }
}

// 动画关键帧
@keyframes sunGlow {
    from {
        box-shadow: 0 0 50px #FFD700;
    }

    to {
        box-shadow: 0 0 80px #FFD700;
    }
}

@keyframes float {
    from {
        transform: translateX(-100px);
    }

    to {
        transform: translateX(calc(100vw + 100px));
    }
}

@keyframes slideIn {
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

// 飞鸟动画
.birds {
    position: absolute;
    width: 100%;
    height: 100%;

    .bird {
        position: absolute;
        width: 20px;
        height: 20px;
        background:
            radial-gradient(circle at 0 0, transparent 50%, #000 50%),
            radial-gradient(circle at 100% 0, transparent 50%, #000 50%);
        background-size: 50% 100%;
        background-repeat: no-repeat;
        animation: fly 15s linear infinite;

        &-1 {
            top: 100px;
            left: -20px;
            animation-delay: 0s;
        }

        &-2 {
            top: 150px;
            left: -20px;
            animation-delay: -7s;
        }
    }
}

// 花朵动画
.flowers {
    position: absolute;
    bottom: 20px;
    width: 100%;

    .flower {
        position: absolute;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #FF69B4 30%, #FFB6C1 70%);
        border-radius: 50%;
        animation: sway 3s ease-in-out infinite;

        &::before {
            content: '';
            position: absolute;
            width: 4px;
            height: 20px;
            background: #90EE90;
            bottom: -20px;
            left: 8px;
            transform-origin: bottom;
        }

        &-1 {
            left: 10%;
            animation-delay: 0s;
        }

        &-2 {
            left: 30%;
            animation-delay: -0.5s;
        }

        &-3 {
            left: 50%;
            animation-delay: -1s;
        }
    }
}

// 蝴蝶动画
.butterflies {
    position: absolute;
    width: 100%;
    height: 100%;

    .butterfly {
        position: absolute;
        width: 15px;
        height: 15px;

        &::before,
        &::after {
            content: '';
            position: absolute;
            width: 15px;
            height: 15px;
            background: rgba(255, 182, 193, 0.7);
            border-radius: 50% 50% 0 50%;
            animation: flutter 0.8s ease-in-out infinite alternate;
        }

        &::after {
            transform: scaleX(-1);
            animation-delay: -0.4s;
        }

        &-1 {
            top: 30%;
            left: 20%;
            animation: butterflyPath1 20s linear infinite;
        }

        &-2 {
            top: 40%;
            right: 20%;
            animation: butterflyPath2 25s linear infinite;
        }
    }
}

// 新增动画关键帧
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes fly {
    from {
        transform: translateX(-20px) translateY(0) scale(0.8);
    }

    50% {
        transform: translateX(calc(50vw)) translateY(-50px) scale(1);
    }

    to {
        transform: translateX(calc(100vw + 20px)) translateY(0) scale(0.8);
    }
}

@keyframes sway {

    0%,
    100% {
        transform: rotate(-5deg);
    }

    50% {
        transform: rotate(5deg);
    }
}

@keyframes flutter {
    from {
        transform: rotate(-30deg);
    }

    to {
        transform: rotate(30deg);
    }
}

@keyframes butterflyPath1 {
    0% {
        transform: translate(0, 0);
    }

    25% {
        transform: translate(100px, -50px);
    }

    50% {
        transform: translate(200px, 0);
    }

    75% {
        transform: translate(100px, 50px);
    }

    100% {
        transform: translate(0, 0);
    }
}

@keyframes butterflyPath2 {
    0% {
        transform: translate(0, 0);
    }

    25% {
        transform: translate(-100px, 50px);
    }

    50% {
        transform: translate(-200px, 0);
    }

    75% {
        transform: translate(-100px, -50px);
    }

    100% {
        transform: translate(0, 0);
    }
}

// 响应式调整
@media (max-width: 768px) {
    .error-content {
        flex-direction: column;
        padding: 2rem;
        margin: 1rem;

        .left-section {
            text-align: center;

            h1 {
                font-size: 4rem;
            }

            .actions {
                justify-content: center;
            }
        }
    }

    .birds,
    .butterflies {
        display: none; // 在移动端隐藏一些复杂动画
    }
}
</style>