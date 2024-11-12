<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { ElInput, ElButton, ElIcon, ElUpload, ElMessage } from 'element-plus'
import { ArrowUp, PictureFilled } from '@element-plus/icons-vue'

interface Message {
    id: number
    type: 'user' | 'assistant'
    content: string
    contentType: 'text' | 'image'
    timestamp: string
}

// 聊天记录
const messages = ref<Message[]>([
    {
        id: 1,
        type: 'assistant',
        content: '您好！我是您的健康助手，请问有什么可以帮您？',
        contentType: 'text',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
])

// 输入框内容
const inputMessage = ref('')
const inputRef = ref<InstanceType<typeof ElInput> | null>(null)

// 聊天容器引用
const chatContainer = ref<HTMLElement | null>(null)

// 发送文本消息
const sendMessage = () => {
    if (!inputMessage.value.trim()) return

    // 添加用户消息
    messages.value.push({
        id: Date.now(),
        type: 'user',
        content: inputMessage.value,
        contentType: 'text',
        timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    })

    // 清空输入框
    const userMessage = inputMessage.value
    inputMessage.value = ''

    // 模拟助手回复
    setTimeout(() => {
        messages.value.push({
            id: Date.now() + 1,
            type: 'assistant',
            content: generateResponse(userMessage),
            contentType: 'text',
            timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
        })
    }, 1000)
}

// 处理图片上传
const handleUpload = async (file: File) => {
    try {
        // 检查文件类型和大小
        if (!file.type.startsWith('image/')) {
            ElMessage.error('请上传图片文件')
            return false
        }
        
        if (file.size > 5 * 1024 * 1024) { // 5MB限制
            ElMessage.error('图片大小不能超过5MB')
            return false
        }

        // 将文件转换为base64
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            // 添加图片消息
            messages.value.push({
                id: Date.now(),
                type: 'user',
                content: reader.result as string,
                contentType: 'image',
                timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
            })

            // 模拟助手回复
            setTimeout(() => {
                messages.value.push({
                    id: Date.now() + 1,
                    type: 'assistant',
                    content: '我已收到您的图片，正在分析...',
                    contentType: 'text',
                    timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
                })
            }, 1000)
        }
        return false // 阻止默认上传行为
    } catch (error) {
        ElMessage.error('图片上传失败')
        return false
    }
}

// 生成回复内容
const generateResponse = (userMessage: string): string => {
    const responses = [
        '我理解您的问题，让我为您详细解答...',
        '这是一个很好的问题，根据专业医学建议...',
        '关于这个问题，我建议您...',
        '从医学角度来看，这种情况需要注意...',
        '您提到的症状可能与以下因素有关...'
    ]
    return responses[Math.floor(Math.random() * responses.length)]
}

// 处理回车发送
const handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        sendMessage()
    }
}

// 滚动到底部
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
watch(() => messages.value.length, () => {
    scrollToBottom()
})

// 组件挂载时
onMounted(() => {
    scrollToBottom()
    // 自动聚焦输入框
    inputRef.value?.focus()
})
</script>

<template>
    <div class="chat-page">
        <!-- 聊天区域 -->
        <div class="chat-container" ref="chatContainer">
            <div class="messages">
                <div v-for="message in messages" :key="message.id" :class="['message', `message-${message.type}`]">
                    <div class="message-content">
                        <!-- 根据消息类型显示不同内容 -->
                        <div v-if="message.contentType === 'text'" class="message-text">{{ message.content }}</div>
                        <div v-else-if="message.contentType === 'image'" class="message-image">
                            <img :src="message.content" alt="用户上传的图片" @click="() => window.open(message.content)">
                        </div>
                        <div class="message-time">{{ message.timestamp }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 修改后的输入区域 -->
        <div class="input-area">
            <div class="input-container">
                <div class="input-wrapper">
                    <el-input v-model="inputMessage" ref="inputRef" type="textarea" :rows="1" 
                        :autosize="{ minRows: 1, maxRows: 4 }"
                        resize="none"
                        placeholder="请输入您的问题..."
                        @keydown="handleKeydown">
                    </el-input>

                    <div class="action-buttons">
                        <el-upload 
                            class="upload-button"
                            :auto-upload="false"
                            :show-file-list="false"
                            accept="image/*"
                            :on-change="(file) => handleUpload(file.raw!)">
                            <el-button class="circle-button" :icon="PictureFilled"></el-button>
                        </el-upload>
                        
                        <el-button type="primary" class="circle-button" 
                            :icon="ArrowUp"
                            @click="sendMessage"
                            :disabled="!inputMessage.trim()">
                        </el-button>
                    </div>
                </div>
                <div class="input-tip">按 Enter 发送，Shift + Enter 换行</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.chat-page {
    height: calc(100vh - var(--header-height));
    background: linear-gradient(to bottom, #93bdfc4a, #7aacf60f);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 1rem;

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
}

.messages {
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.message {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    animation: messageSlideIn 0.3s ease-out;

    &-user {
        align-self: flex-end;

        .message-content {
            background-color: #e3f2fd;
        }
    }

    &-assistant {
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

    .message-text {
        font-size: 1rem;
        line-height: 1.5;
        color: #2c3e50;
        white-space: pre-wrap;
        margin-bottom: 0.5rem;
    }

    .message-time {
        font-size: 0.8rem;
        color: #999;
        text-align: right;
    }
}

.message-image {
    max-width: 300px;
    margin: 0.5rem 0;

    img {
        width: 100%;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.3s ease;

        &:hover {
            transform: scale(1.02);
        }
    }
}

.input-area {
    background: white;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    padding: 1rem 0;
}

.input-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 1rem;
}

.input-wrapper {
    background: #f5f7fa;
    border-radius: 12px;
    padding: 0.8rem;
    display: flex;
    gap: 0.8rem;
    align-items: flex-end;
    transition: all 0.3s ease;

    &:focus-within {
        background: white;
        box-shadow: 0 0 0 2px var(--el-color-primary-light-8);
    }
}

.action-buttons {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

:deep(.el-textarea__inner) {
    background: transparent;
    border: none;
    padding: 0;
    font-size: 0.95rem;
    line-height: 1.5;
    resize: none;
    box-shadow: none !important;
    
    &:focus {
        box-shadow: none;
    }
}

.circle-button {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    border: none;
    background: transparent;
    color: #606266;

    &:hover {
        background: rgba(0, 0, 0, 0.05);
        transform: translateY(-2px);
    }

    &.el-button--primary {
        background: var(--el-color-primary);
        color: white;

        &:hover {
            background: var(--el-color-primary-dark-2);
        }

        &:disabled {
            background: var(--el-color-primary-light-5);
            cursor: not-allowed;
            transform: none;
        }
    }

    .el-icon {
        font-size: 1.2rem;
    }
}

.input-tip {
    font-size: 0.8rem;
    color: #999;
    text-align: right;
    margin-top: 0.4rem;
    padding-right: 0.5rem;
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
    .message {
        max-width: 90%;
    }

    .input-area {
        padding: 0.8rem 0;
    }

    .input-container {
        padding: 0 0.8rem;
    }

    .input-wrapper {
        padding: 0.6rem;
    }

    .circle-button {
        width: 32px;
        height: 32px;

        .el-icon {
            font-size: 1.1rem;
        }
    }
}
</style> 