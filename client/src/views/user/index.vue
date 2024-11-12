<template>
    <div class="user-container">
        <div class="glow-1"></div>
        <div class="glow-2"></div>
        <div class="glow-3"></div>

        <div class="main">
            <router-view />
        </div>
    </div>
</template>

<style scoped lang="less">
.user-container {
    box-sizing: border-box;
    height: calc(100vh - var(--header-height));
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(120deg, #f3e7ff 0%, #e4f0ff 50%, #dcf3ff 100%);
    padding: 2rem;
    position: relative;
    overflow: hidden;

    &::before,
    &::after,
    .glow-1,
    .glow-2,
    .glow-3 {
        content: '';
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: soft-light;
    }

    &::before {
        width: 80vw;
        height: 80vw;
        background: radial-gradient(circle,
                rgba(255, 223, 253, 0.4) 0%,
                rgba(255, 223, 253, 0.1) 50%,
                transparent 70%);
        top: -40vw;
        left: -20vw;
        animation: floatGlow 15s ease-in-out infinite;
        filter: blur(30px);
    }

    &::after {
        width: 70vw;
        height: 70vw;
        background: radial-gradient(circle,
                rgba(202, 234, 255, 0.4) 0%,
                rgba(202, 234, 255, 0.1) 50%,
                transparent 70%);
        bottom: -35vw;
        right: -15vw;
        animation: floatGlow 18s ease-in-out infinite reverse;
        filter: blur(25px);
    }

    .glow-1,
    .glow-2,
    .glow-3 {
        position: absolute;
        filter: blur(20px);
    }

    .glow-1 {
        width: 40vw;
        height: 40vw;
        background: radial-gradient(circle,
                rgba(255, 236, 210, 0.4) 0%,
                rgba(255, 236, 210, 0.1) 50%,
                transparent 70%);
        top: 20%;
        left: 25%;
        animation: floatGlow 20s ease-in-out infinite;
    }

    .glow-2 {
        width: 35vw;
        height: 35vw;
        background: radial-gradient(circle,
                rgba(210, 255, 236, 0.4) 0%,
                rgba(210, 255, 236, 0.1) 50%,
                transparent 70%);
        bottom: 10%;
        left: 15%;
        animation: floatGlow 25s ease-in-out infinite -5s;
    }

    .glow-3 {
        width: 45vw;
        height: 45vw;
        background: radial-gradient(circle,
                rgba(236, 210, 255, 0.4) 0%,
                rgba(236, 210, 255, 0.1) 50%,
                transparent 70%);
        top: 15%;
        right: 10%;
        animation: floatGlow 22s ease-in-out infinite -10s;
    }
}

@keyframes floatGlow {
    0% {
        transform: translate(0, 0) scale(1);
    }

    33% {
        transform: translate(2%, 2%) scale(1.05);
    }

    66% {
        transform: translate(-2%, -1%) scale(0.95);
    }

    100% {
        transform: translate(0, 0) scale(1);
    }
}

.login-card {
    position: relative;
    z-index: 1;
    backdrop-filter: blur(20px);
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.3));
    border-radius: 20px;
    box-shadow:
        0 8px 32px rgba(31, 38, 135, 0.15),
        0 0 0 1px rgba(255, 255, 255, 0.4) inset;
    width: 500px;
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.18);
    transition: all 0.3s ease;

    &:hover {
        box-shadow:
            0 8px 32px rgba(31, 38, 135, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
        backdrop-filter: blur(25px);
    }

    // 添加内部光晕效果
    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 20px;
        background: linear-gradient(45deg,
                transparent,
                rgba(255, 255, 255, 0.1),
                transparent);
        pointer-events: none;
    }
}


@media (max-width: 768px) {
    .login-card {
        flex-direction: column;
        width: 100%;
        height: auto;

        .card-left {
            padding: 2rem;
        }

        .card-right {
            padding: 2rem;
        }
    }
}

@keyframes float {
    0% {
        transform: translateY(0) rotate(0deg);
    }

    50% {
        transform: translateY(-20px) rotate(5deg);
    }

    100% {
        transform: translateY(0) rotate(0deg);
    }
}

.circle {
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        background: rgba(255, 255, 255, 0.4);
    }
}
</style>