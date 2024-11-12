<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Document, ChatDotRound, View, Comment, Star } from '@element-plus/icons-vue'

interface Post {
    id: number
    title: string
    author: string
    date: string
    content: string
    views: number
    comments: number
    likes: number
    tags: string[]
    isHot?: boolean
    isPinned?: boolean
}

const router = useRouter()

// 热门文献
const hotLiteratures = ref([
    {
        id: 1,
        title: "清醒梦与创造力的关系研究：一项系统性综述",
        author: "张三等",
        date: "2024-03-15",
        views: 1250,
        downloads: 368,
        tags: ["清醒梦", "创造力", "心理学"],
        isHot: true
    },
    {
        id: 2,
        title: "脑电波模式在清醒梦诱导中的应用",
        author: "李四等",
        date: "2024-02-28",
        views: 890,
        downloads: 245,
        tags: ["脑电波", "清醒梦", "神经科学"],
        isHot: true
    }
])

// 论坛帖子
const posts = ref<Post[]>([
    {
        id: 1,
        title: "分享我的清醒梦体验和技巧",
        author: "梦境探索者",
        date: "2024-03-20",
        content: "最近一个月我尝试了几种不同的清醒梦诱导方法，效果很不错...",
        views: 328,
        comments: 45,
        likes: 89,
        tags: ["经验分享", "技巧"],
        isPinned: true
    },
    {
        id: 2,
        title: "关于清醒梦与焦虑症的讨论",
        author: "心理咨询师小王",
        date: "2024-03-19",
        content: "作为一名心理咨询师，我想分享一些关于利用清醒梦缓解焦虑的观察...",
        views: 256,
        comments: 32,
        likes: 67,
        tags: ["心理健康", "专业讨论"],
        isHot: true
    }
])

const goToLiterature = () => {
    router.push('/doc/literature')
}
</script>

<template>
    <div class="forum-page">
        <div class="forum-container">
            <!-- 文献区域 -->
            <section class="literature-section">
                <div class="section-header">
                    <div class="header-left">
                        <el-icon>
                            <Document />
                        </el-icon>
                        <h2>最新文献</h2>
                    </div>
                    <el-button type="primary" plain @click="goToLiterature">
                        查看更多
                    </el-button>
                </div>
                <div class="literature-list">
                    <div v-for="item in hotLiteratures" :key="item.id" class="literature-card" @click="goToLiterature">
                        <div class="card-header">
                            <h3>{{ item.title }}</h3>
                            <div class="tags">
                                <el-tag v-for="tag in item.tags" :key="tag" size="small" effect="plain">
                                    {{ tag }}
                                </el-tag>
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="meta">
                                <span>{{ item.author }}</span>
                                <span>{{ item.date }}</span>
                            </div>
                            <div class="stats">
                                <span>
                                    <el-icon>
                                        <View />
                                    </el-icon>
                                    {{ item.views }}
                                </span>
                                <span>
                                    <el-icon>
                                        <Document />
                                    </el-icon>
                                    {{ item.downloads }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 讨论区 -->
            <section class="discussion-section">
                <div class="section-header">
                    <div class="header-left">
                        <el-icon>
                            <ChatDotRound />
                        </el-icon>
                        <h2>热门讨论</h2>
                    </div>
                    <div class="filter-buttons">
                        <el-button type="primary" plain>最新</el-button>
                        <el-button plain>热门</el-button>
                        <el-button plain>精华</el-button>
                    </div>
                </div>
                <div class="post-list">
                    <div v-for="post in posts" :key="post.id" class="post-card">
                        <div class="post-main">
                            <div class="post-header">
                                <h3>
                                    <el-tag v-if="post.isPinned" type="danger" effect="plain" size="small">置顶</el-tag>
                                    <el-tag v-if="post.isHot" type="warning" effect="plain" size="small">热门</el-tag>
                                    {{ post.title }}
                                </h3>
                                <div class="tags">
                                    <el-tag v-for="tag in post.tags" :key="tag" size="small" effect="plain">
                                        {{ tag }}
                                    </el-tag>
                                </div>
                            </div>
                            <p class="post-content">{{ post.content }}</p>
                            <div class="post-meta">
                                <span class="author">{{ post.author }}</span>
                                <span class="date">{{ post.date }}</span>
                            </div>
                        </div>
                        <div class="post-stats">
                            <div class="stat-item">
                                <el-icon>
                                    <View />
                                </el-icon>
                                <span>{{ post.views }}</span>
                            </div>
                            <div class="stat-item">
                                <el-icon>
                                    <Comment />
                                </el-icon>
                                <span>{{ post.comments }}</span>
                            </div>
                            <div class="stat-item">
                                <el-icon>
                                    <Star />
                                </el-icon>
                                <span>{{ post.likes }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped lang="less">
.forum-page {
    min-height: 100vh;
    background: #f5f7fa;
    padding: 2rem 0;
}

.forum-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    gap: 2rem;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .header-left {
        display: flex;
        align-items: center;
        gap: 0.8rem;

        .el-icon {
            font-size: 1.5rem;
            color: var(--el-color-primary);
        }

        h2 {
            font-size: 1.5rem;
            color: #2c3e50;
            margin: 0;
        }
    }
}

// 文献区域
.literature-section {
    flex: 1;
}

.literature-list {
    display: grid;
    gap: 1rem;
}

.literature-card {
    background: white;
    border-radius: 12px;
    padding: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    h3 {
        font-size: 1.1rem;
        color: #2c3e50;
        margin: 0 0 0.8rem;
        line-height: 1.4;
    }

    .tags {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.9rem;
        color: #606266;

        .meta {
            display: flex;
            gap: 1rem;
        }

        .stats {
            display: flex;
            gap: 1rem;

            span {
                display: flex;
                align-items: center;
                gap: 0.3rem;
            }
        }
    }
}

// 讨论区
.discussion-section {
    flex: 2;

    .filter-buttons {
        display: flex;
        gap: 0.8rem;
    }
}

.post-list {
    display: grid;
    gap: 1rem;
}

.post-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    gap: 2rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .post-main {
        flex: 1;
    }

    .post-header {
        margin-bottom: 1rem;

        h3 {
            font-size: 1.2rem;
            color: #2c3e50;
            margin: 0 0 0.8rem;
            display: flex;
            align-items: center;
            gap: 0.8rem;
        }

        .tags {
            display: flex;
            gap: 0.5rem;
        }
    }

    .post-content {
        color: #5c6b7a;
        font-size: 0.95rem;
        line-height: 1.6;
        margin: 0 0 1rem;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .post-meta {
        font-size: 0.9rem;
        color: #909399;
        display: flex;
        gap: 1rem;
    }

    .post-stats {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
        padding-left: 1rem;
        border-left: 1px solid #ebeef5;

        .stat-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #909399;
            font-size: 0.9rem;
        }
    }
}

@media (max-width: 768px) {
    .forum-container {
        padding: 0 1rem;
    }

    .post-card {
        flex-direction: column;
        gap: 1rem;

        .post-stats {
            flex-direction: row;
            justify-content: flex-start;
            padding: 1rem 0 0;
            border-left: none;
            border-top: 1px solid #ebeef5;
        }
    }
}
</style>