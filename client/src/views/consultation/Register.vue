<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

interface Message {
    id: number
    type: 'system' | 'user' | 'doctor'
    content: string
    options?: Option[]
    timestamp: string
}

interface Option {
    id: number
    text: string
    next?: number // 下一个消息的ID
}

// 聊天消息数据
const messages = ref<Message[]>([
    {
        id: 1,
        type: 'system',
        content: '欢迎来到在线问诊，我是您的智能助手。请选择您想咨询的问题类型：',
        options: [
            { id: 1, text: '咨询感冒相关症状', next: 2 },
            { id: 2, text: '咨询慢性病管理', next: 3 },
            { id: 3, text: '咨询心理健康问题', next: 4 }
        ],
        timestamp: '09:00'
    },
    {
        id: 2,
        type: 'doctor',
        content: '了解到您想咨询感冒症状，请告诉我您的具体症状：',
        options: [
            { id: 1, text: '发烧', next: 5 },
            { id: 2, text: '咳嗽', next: 6 },
            { id: 3, text: '头痛', next: 7 },
            { id: 4, text: '多个症状', next: 8 }
        ],
        timestamp: '09:01'
    },
    {
        id: 3,
        type: 'doctor',
        content: '关于慢性病管理，请选择您需要咨询的具体问题：',
        options: [
            { id: 1, text: '高血压', next: 9 },
            { id: 2, text: '糖尿病', next: 10 },
            { id: 3, text: '心脏病', next: 11 }
        ],
        timestamp: '09:01'
    }
])

// 当前显示的消息列表
const visibleMessages = ref<Message[]>([messages.value[0]])

// 处理选项点击
const handleOptionClick = (option: Option) => {
    // 添加用户选择的消息
    visibleMessages.value.push({
        id: Date.now(),
        type: 'user',
        content: option.text,
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })

    // 如果有下一条消息，找到并添加
    if (option.next) {
        const nextMessage = messages.value.find(m => m.id === option.next)
        if (nextMessage) {
            setTimeout(() => {
                visibleMessages.value.push({
                    ...nextMessage,
                    timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                })
                // 滚动到底部
                scrollToBottom()
            }, 500)
        }
    }
}

// 滚动到底部
const chatContainer = ref<HTMLElement | null>(null)
const scrollToBottom = () => {
    setTimeout(() => {
        if (chatContainer.value) {
            chatContainer.value.scrollTo({
                top: chatContainer.value.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, 100)
}

// 监听消息变化
watch(() => visibleMessages.value.length, () => {
    scrollToBottom()
})

// 在组件挂载时也滚动到底部
onMounted(() => {
    scrollToBottom()
})
</script>

<template>
    <div class="chat-page">
        <!-- 页面标题 -->
        <div class="page-header">
            <div class="header-content">
                <h2>智能问诊</h2>
                <p>24小时在线，专业医生为您解答</p>
            </div>
        </div>

        <!-- 聊天区域 -->
        <div class="chat-container" ref="chatContainer">
            <div class="messages">
                <div v-for="message in visibleMessages" :key="message.id"
                    :class="['message', `message-${message.type}`]">
                    <div class="message-content">
                        <div class="message-text">{{ message.content }}</div>
                        <div class="message-time">{{ message.timestamp }}</div>
                    </div>
                    <!-- 选项按钮 -->
                    <div v-if="message.options" class="message-options">
                        <el-button v-for="option in message.options" :key="option.id" type="primary" plain size="large"
                            class="option-button" @click="handleOptionClick(option)">
                            {{ option.text }}
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.chat-page {
    // min-height: 100vh;
    height: calc(100vh - var(--header-height));
    // 好看的渐变色
    background: linear-gradient(to bottom, #93bdfc4a, #7aacf60f);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.page-header {
    background: white;
    padding: 1.5rem 0;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
    flex-shrink: 0;

    .header-content {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 1rem;

        h2 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin: 0;
            margin-bottom: 0.5rem;
        }

        p {
            color: #5c6b7a;
            margin: 0;
        }
    }
}

.chat-container {
    flex: 1;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    padding: 1rem;
    overflow-y: auto;
    height: calc(100vh - 120px);
    position: relative;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .messages {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-bottom: 1rem;
    }
}

.message {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 80%;
    animation: messageSlideIn 0.3s ease-out;

    &-system {
        align-self: center;
        max-width: 100%;

        .message-content {
            background-color: #f2f4f7;
        }
    }

    &-user {
        align-self: flex-end;

        .message-content {
            background-color: #e3f2fd;
        }
    }

    &-doctor {
        align-self: flex-start;

        .message-content {
            background-color: white;
        }
    }
}

.message-content {
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;

    .message-text {
        font-size: 1rem;
        line-height: 1.5;
        color: #2c3e50;
        margin-bottom: 0.5rem;
    }

    .message-time {
        font-size: 0.8rem;
        color: #999;
        text-align: right;
    }
}

.message-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 0.5rem;

    .option-button {
        border-radius: 20px;
        font-size: 0.95rem;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
    }
}

@keyframes messageSlideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

// 响应式设计
@media (max-width: 768px) {
    .chat-container {
        height: calc(100vh - 100px);

        &::-webkit-scrollbar {
            width: 4px;
        }
    }

    .message {
        max-width: 90%;
    }

    .message-content {
        padding: 0.8rem;
    }

    .message-options {
        .option-button {
            font-size: 0.9rem;
        }
    }
}
</style>