<script setup lang="ts">
import { ChatRound, Edit, Share, Star } from '@element-plus/icons-vue';
import { ref } from 'vue';

interface Post {
    id: number
    title: string
    author: {
        name: string
        avatar: string
    }
    content: string
    date: string
    views: number
    likes: number
    comments: number
    replies?: Reply[]
}

interface Floor {
    id: number
    author: {
        name: string
        avatar: string
        level?: string
    }
    content: string
    date: string
    floor: number
    likes: number
    replies?: Floor[]
}

// 添加回复接口
interface Reply {
    id: number
    author: {
        name: string
        avatar: string
    }
    content: string
    date: string
    likes: number
}

// 帖子详情数据
const post = ref<Post>({
    id: 1,
    title: '分享我的清醒梦体验和技巧',
    author: {
        name: '梦境探索者',
        avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    content: `最近一个月我尝试了几种不同的清醒梦诱导方法，效果很不错。
    首先是保持规律的作息时间，这点很重要。其次是经常进行现实检查，比如看手表或者尝试穿过墙壁。
    通过这些方法，我成功达到了每周至少两次的清醒梦频率。
    
    以下是我的一些具体建议：
    1. 保持睡眠日志
    2. 进行冥想练习
    3. 设定明确的意图
    4. 使用助梦音乐
    
    希望这些经验对大家有帮助！`,
    date: '2024-03-20 14:30',
    views: 328,
    likes: 45,
    comments: 12
})

// 楼层数据
const floors = ref<Floor[]>([
    {
        id: 1,
        author: {
            name: '清梦人',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            level: '资深会员'
        },
        content: '感谢分享！我也一直在尝试清醒梦，这些建议很有帮助。请问作者每天的冥想时间是怎么安排的？',
        date: '2024-03-20 15:00',
        floor: 1,
        likes: 8,
        replies: [
            {
                id: 11,
                author: {
                    name: '梦境探索者',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                },
                content: '我一般是早晚各15分钟，主要关注呼吸和身体感受。',
                date: '2024-03-20 15:05',
                floor: 1,
                likes: 3
            },
            {
                id: 11,
                author: {
                    name: '梦境探索者',
                    avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                },
                content: '我一般是早晚各15分钟，主要关注呼吸和身体感受。',
                date: '2024-03-20 15:05',
                floor: 1,
                likes: 3,
                replies: [
                    {
                        id: 11,
                        author: {
                            name: '梦境探索者',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        },
                        content: '我一般是早晚各15分钟，主要关注呼吸和身体感受。',
                        date: '2024-03-20 15:05',
                        floor: 1,
                        likes: 3
                    },
                    {
                        id: 11,
                        author: {
                            name: '梦境探索者',
                            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
                        },
                        content: '我一般是早晚各15分钟，主要关注呼吸和身体感受。',
                        date: '2024-03-20 15:05',
                        floor: 1,
                        likes: 3,
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        author: {
            name: '追梦者',
            avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            level: '新手'
        },
        content: '现实检查这个方法很有意思，我会试试看。不过作者提到的助梦音乐具体是什么类型的呢？',
        date: '2024-03-20 15:30',
        floor: 2,
        likes: 5
    }
])

// 回复相关的状态
const replyContent = ref('')
const showReplyBox = ref(false)
const replyInfo = ref({
    // 当前选中的评论索引
    index: 0,
    // 子评论索引
    childIndex: 0
})

const getReplyTitle = () => {
    console.log(replyInfo.value);

    if (!replyInfo.value.index && !replyInfo.value.childIndex) {
        return '我也来说几句'
    } else if (replyInfo.value.index && !replyInfo.value.childIndex) {
        return `回复 #${replyInfo.value.index + 1}楼`
    } else {
        return `回复 ${floors.value[replyInfo.value.index].replies?.[replyInfo.value.childIndex].author.name}`
    }
}

const openReplyBox = (index: number = 0, childIndex: number = 0) => {
    replyInfo.value = {
        index,
        childIndex
    }
    showReplyBox.value = true
}



// 取消回复
const cancelReply = () => {
    showReplyBox.value = false
    replyContent.value = ''
}

// 提交回复
const submitReply = () => {
    if (!replyContent.value.trim()) return
    // 重置状态
    cancelReply()
}

// 处理点赞
const handleLike = (type: 'post' | 'floor' | 'reply', id: number) => {
    console.log('点赞:', type, id)
    // 这里添加点赞逻辑
}

// 处理分享
const handleShare = () => {
    console.log('分享帖子')
    // 这里添加分享逻辑
}
</script>

<template>
    <div class="post-detail">
        <div class="post-container">
            <!-- 主楼（1楼） -->
            <div class="floor main-floor">
                <h1>{{ post.title }}</h1>
                <div class="floor-header">
                    <div class="post-meta">
                        <div class="author-info">
                            <el-avatar :size="48" :src="post.author.avatar" />
                            <div class="author-details">
                                <span class="author-name">{{ post.author.name }}</span>
                                <el-tag size="small" type="success">楼主</el-tag>
                            </div>
                        </div>
                        <div class="floor-number">地基</div>
                    </div>
                </div>

                <div class="floor-content">
                    {{ post.content }}
                </div>

                <div class="floor-footer">
                    <div class="post-info">
                        <span class="post-date">{{ post.date }}</span>
                        <span class="post-views"><el-icon>
                                <View />
                            </el-icon>{{ post.views }}</span>
                    </div>
                    <div class="floor-actions">
                        <el-button type="primary" plain @click="handleLike('post', post.id)">
                            <el-icon>
                                <Star />
                            </el-icon>点赞 {{ post.likes }}
                        </el-button>
                        <el-button plain @click="openReplyBox()">
                            <el-icon>
                                <ChatRound />
                            </el-icon>回复
                        </el-button>
                        <el-button plain @click="handleShare">
                            <el-icon>
                                <Share />
                            </el-icon>分享
                        </el-button>
                    </div>
                </div>

                <!-- 回复列表 -->
                <div v-if="post.replies?.length" class="floor-replies">
                    <div v-for="reply in post.replies" :key="reply.id" class="reply-item">
                        <div class="reply-author">
                            <el-avatar :size="32" :src="reply.author.avatar" />
                            <span class="author-name">{{ reply.author.name }}</span>
                            <span class="reply-date">{{ reply.date }}</span>
                        </div>
                        <div class="reply-content">{{ reply.content }}</div>
                        <div class="reply-actions">
                            <el-button text size="small">
                                <el-icon>
                                    <Star />
                                </el-icon>{{ reply.likes }}
                            </el-button>
                            <el-button text size="small" @click="openReplyBox(reply.id)">
                                回复
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 其他楼层 -->
            <div v-for="(floor, index) in floors" :key="floor.id" class="floor">
                <div class="floor-header">
                    <div class="author-info">
                        <el-avatar :size="48" :src="floor.author.avatar" />
                        <div class="post-meta">
                            <div class="author-details">
                                <span class="author-name">{{ floor.author.name }}</span>
                                <el-tag v-if="floor.author.level" size="small"
                                    :type="floor.author.level === '资深会员' ? 'warning' : 'info'">
                                    {{ floor.author.level }}
                                </el-tag>
                            </div>
                            <div class="floor-number">{{ index + 1 }}楼</div>
                        </div>
                    </div>
                </div>

                <div class="floor-content">
                    {{ floor.content }}
                </div>

                <div class="floor-footer">
                    <span class="floor-date">{{ floor.date }}</span>
                    <div class="floor-actions">
                        <el-button text>
                            <el-icon>
                                <Star />
                            </el-icon>{{ floor.likes }}
                        </el-button>
                        <el-button text @click="openReplyBox(index)">
                            <el-icon>
                                <ChatRound />
                            </el-icon>回复
                        </el-button>
                    </div>
                </div>

                <!-- 楼层回复 -->
                <div v-if="floor.replies?.length" class="floor-replies">
                    <div v-for="(reply, childIndex) in floor.replies" :key="reply.id" class="reply-item">
                        <div class="reply-author">
                            <el-avatar :size="32" :src="reply.author.avatar" />
                            <span class="author-name">{{ reply.author.name }}</span>
                            <span class="reply-date">{{ reply.date }}</span>
                        </div>
                        <div class="reply-content">{{ reply.content }}</div>
                        <div class="reply-actions">
                            <el-button text size="small">
                                <el-icon>
                                    <Star />
                                </el-icon>{{ reply.likes }}
                            </el-button>
                            <el-button text size="small" @click="openReplyBox(index, childIndex)">
                                回复
                            </el-button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 使用 Transition 包装回复框 -->
            <Transition name="reply-slide">
                <div v-if="showReplyBox" class="reply-box">
                    <div class="reply-header" style="display: flex; justify-content: space-between;">
                        <span class="reply-title">{{ getReplyTitle() }}</span>
                        <el-button text @click="cancelReply">取消</el-button>
                    </div>
                    <el-input v-model="replyContent" type="textarea" :rows="4" placeholder="言语如水，温暖人心亦能伤人，愿君谨慎" />
                    <div style="margin-top: 10px;" class="reply-footer">
                        <el-button type="primary" @click="submitReply">发表言论</el-button>
                    </div>
                </div>
            </Transition>

            <!-- 快捷回复按钮 -->
            <div class="quick-reply">
                <el-button class="reply-btn" type="primary" circle size="large" @click="openReplyBox()">
                    <el-icon>
                        <Edit />
                    </el-icon>
                </el-button>
                <div class="btn-tooltip">我有话说</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.post-detail {
    position: relative;
    min-height: 100vh;
    background: #f5f7fa;
    padding: 2rem 0;
}

.post-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
    position: relative;
}

.floor {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .post-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    &.main-floor {
        h1 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin: 0 0 1.5rem 0;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid #ebeef5;
        }
    }

    .floor-header {
        margin-bottom: 1.5rem;


        .author-info {
            display: flex;
            align-items: center;
            gap: 1rem;

            .author-details {
                display: flex;
                flex-direction: column;
                gap: 0.4rem;

                .author-name {
                    font-size: 1.1rem;
                    color: #2c3e50;
                    font-weight: 500;
                    line-height: 1.2;
                }

                .el-tag {
                    width: fit-content;
                }
            }
        }

        .floor-number {
            font-size: 1.1rem;
            color: #909399;
            font-weight: 500;
            background: #f8f9fa;
            padding: 0.3rem 0.8rem;
            border-radius: 4px;
        }
    }

    .floor-content {
        font-size: 1.1rem;
        line-height: 1.8;
        color: #2c3e50;
        margin: 1.5rem 0;
        white-space: pre-line;
        padding: 0 0.5rem;
    }

    .floor-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 1.2rem;
        margin-top: 1.2rem;
        border-top: 1px solid #ebeef5;

        .post-info {
            display: flex;
            gap: 1.5rem;
            color: #909399;
            font-size: 0.9rem;

            .post-views {
                display: flex;
                align-items: center;
                gap: 0.4rem;
            }
        }

        .floor-actions {
            display: flex;
            gap: 0.8rem;

            .el-button {
                padding: 8px 16px;

                .el-icon {
                    margin-right: 4px;
                }
            }
        }
    }

    .floor-replies {
        margin-top: 1.5rem;
        padding: 1.2rem;
        background: #f8fafc;
        border-radius: 8px;

        .reply-item {
            padding: 1rem 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);

            &:last-child {
                border-bottom: none;
                padding-bottom: 0;
            }

            &:first-child {
                padding-top: 0;
            }

            .reply-author {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                margin-bottom: 0.8rem;

                .author-name {
                    font-weight: 500;
                    color: #2c3e50;
                }

                .reply-date {
                    color: #909399;
                    font-size: 0.9rem;
                }
            }

            .reply-content {
                padding-left: 3.2rem;
                color: #2c3e50;
                line-height: 1.6;
                margin-bottom: 0.6rem;
                font-size: 0.95rem;
            }

            .reply-actions {
                padding-left: 3.2rem;
                display: flex;
                gap: 1rem;
                opacity: 0;
                transition: opacity 0.2s ease;
            }

            &:hover .reply-actions {
                opacity: 1;
            }
        }
    }
}

.reply-box {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: white;
    padding: 1.5rem;
    box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
    z-index: 9;

    .reply-header {
        margin-bottom: 1rem;

        .reply-title {
            font-size: 1.1rem;
            font-weight: 500;
            color: #2c3e50;
        }
    }

    .reply-footer {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }

    @media (min-width: 768px) {
        width: 600px;
        left: 50%;
        transform: translateX(-50%);
        bottom: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
}

// 回复框动画
.reply-slide-enter-active,
.reply-slide-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.reply-slide-enter-from {
    transform: translateY(100%);
    opacity: 0;

    @media (min-width: 768px) {
        transform: translate(-50%, 100%);
    }
}

.reply-slide-leave-to {
    transform: translateY(100%);
    opacity: 0;

    @media (min-width: 768px) {
        transform: translate(-50%, 100%);
    }
}

.reply-slide-enter-to,
.reply-slide-leave-from {
    transform: translateY(0);
    opacity: 1;

    @media (min-width: 768px) {
        transform: translate(-50%, 0);
    }
}

// 添加遮罩层动画
.reply-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 8;
    backdrop-filter: blur(4px);
    transition: all 0.3s ease;
}

.reply-mask-enter-active,
.reply-mask-leave-active {
    transition: all 0.3s ease;
}

.reply-mask-enter-from,
.reply-mask-leave-to {
    opacity: 0;
}

.reply-mask-enter-to,
.reply-mask-leave-from {
    opacity: 1;
}

// 调整快捷回复按钮的层级
.quick-reply {
    z-index: 11;
}

.quick-reply {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    .reply-btn {
        width: 56px;
        height: 56px;
        font-size: 1.4rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);

        &:hover {
            transform: scale(1.1) rotate(12deg);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

            &+.btn-tooltip {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    .btn-tooltip {
        background: rgba(0, 0, 0, 0.75);
        color: white;
        padding: 0.4rem 0.8rem;
        border-radius: 4px;
        font-size: 0.9rem;
        opacity: 0;
        transform: translateY(5px);
        transition: all 0.3s ease;
        white-space: nowrap;
    }
}

@media (max-width: 768px) {
    .post-container {
        padding: 0 1rem;
    }

    .floor {
        padding: 1.5rem;

        &.main-floor .floor-header h1 {
            font-size: 1.5rem;
        }

        .floor-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;

            .floor-actions {
                width: 100%;
                justify-content: space-around;
            }
        }
    }

    .quick-reply {
        bottom: 1.5rem;
        right: 1.5rem;

        .reply-btn {
            width: 48px;
            height: 48px;
            font-size: 1.2rem;
        }
    }
}
</style>