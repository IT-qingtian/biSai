<script setup lang="ts">
import { Comment, Document, Edit, View } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

interface Post {
    id: number
    title: string
    author: string
    date: string
    content: string
    views: number
    comments: number
    tags: string[]
    isHot?: boolean
    isPinned?: boolean
};



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
        tags: ["心理健康", "专业讨论"],
        isHot: true
    }
])
const router = useRouter();

// 分页相关数据
const currentPage = ref(1)
const total = ref(100) // 总数据量

// 处理分页变化
const handleCurrentChange = (val: number) => {
    currentPage.value = val
    // 这里添加页面切换逻辑
}

// 处理发帖
const handleCreatePost = () => {
    router.push('/doc/create')
}

// 添加筛选状态
const filterType = ref('newest') // 'newest' | 'hot' | 'featured'

// 处理筛选切换
const handleFilterChange = (type: string) => {
    filterType.value = type
    // 这里可以添加获取对应类型数据的逻辑
    console.log(`切换到${type}类型`)
}
</script>

<template>
    <div class="forum-page">
        <div class="forum-container">

            <!-- 讨论区 -->
            <section class="discussion-section">
                <!-- 固定的 header -->
                <div class="section-header">
                    <div class="section-header-container">
                        <div class="header-left">
                            <el-icon class="header-icon">
                                <Document />
                            </el-icon>
                            <h2>帖子广场</h2>
                        </div>

                        <div class="header-right">
                            <div class="filter-buttons">
                                <el-button :type="filterType === 'newest' ? 'primary' : 'default'"
                                    :plain="filterType !== 'newest'" @click="handleFilterChange('newest')">
                                    <el-icon>
                                        <Timer />
                                    </el-icon>
                                    最新
                                </el-button>
                                <el-button :type="filterType === 'hot' ? 'primary' : 'default'"
                                    :plain="filterType !== 'hot'" @click="handleFilterChange('hot')">
                                    <el-icon>
                                        <Star />
                                    </el-icon>
                                    热门
                                </el-button>
                                <el-button :type="filterType === 'featured' ? 'primary' : 'default'"
                                    :plain="filterType !== 'featured'" @click="handleFilterChange('featured')">
                                    <el-icon>
                                        <Medal />
                                    </el-icon>
                                    精华
                                </el-button>
                            </div>

                            <div class="control">
                                <el-button type="primary" class="create-post-btn" size="large"
                                    @click="handleCreatePost">
                                    <el-icon>
                                        <Edit />
                                    </el-icon>
                                    我要发帖
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 添加空状态显示 -->
                <div v-if="!posts.length" class="empty-state">
                    <div class="empty-content">
                        <div class="illustration">
                            <div class="decoration-circle"></div>
                            <div class="decoration-dots"></div>
                        </div>

                        <div class="text-content">
                            <h3>来发布第一个帖子吧！</h3>
                            <p>天呐，这么大个网站居然没有一个帖子？！你一定是个有故事的人，快来发布第一个帖子吧！</p>
                        </div>

                        <div class="action-buttons">
                            <el-button type="primary" size="large" class="create-btn" @click="handleCreatePost">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                                发布帖子
                            </el-button>
                        </div>

                        <div class="quick-tips">
                            <div class="tips-header">
                                <el-icon>
                                    <Sunny />
                                </el-icon>
                                <h4>温馨提示</h4>
                            </div>
                            <ul>
                                <li>
                                    <el-icon>
                                        <Star />
                                    </el-icon>
                                    <span>注意文明用语，严禁发布违法违规内容</span>
                                </li>
                                <li>
                                    <el-icon>
                                        <ChatDotRound />
                                    </el-icon>
                                    <span>提出你感兴趣的话题讨论</span>
                                </li>
                                <li>
                                    <el-icon>
                                        <Help />
                                    </el-icon>
                                    <span>寻求专业的建议和帮助</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 原有的帖子列表，当有数据时显示 -->
                <div v-else class="post-list">
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
                        </div>
                    </div>
                </div>

                <!-- 简化的分页器 -->
                <div class="pagination-container">
                    <el-pagination
                        v-model:current-page="currentPage"
                        :total="total"
                        :page-size="10"
                        background
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                    />
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
}

.discussion-section {
    position: relative;
    padding-top: 100px;
}

.section-header {
    position: fixed;
    top: calc(var(--header-height) + 10px);
    left: 0;
    right: 0;
    z-index: 100;
    background: white;
    margin-bottom: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

    &-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 1.5rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 1rem;

        .header-icon {
            font-size: 1.8rem;
            color: var(--el-color-primary);
            background: rgba(64, 158, 255, 0.1);
            padding: 0.8rem;
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        h2 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin: 0;
            font-weight: 600;
        }
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 2rem;

        .filter-buttons {
            display: flex;
            gap: 0.8rem;
            padding: 0.5rem;
            background: #f8fafc;
            border-radius: 12px;

            .el-button {
                padding: 0.6rem 1.2rem;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;

                .el-icon {
                    font-size: 1.1rem;
                }

                &:not(.el-button--primary) {
                    &:hover {
                        color: var(--el-color-primary);
                        border-color: var(--el-color-primary);
                        background-color: rgba(64, 158, 255, 0.1);
                        transform: translateY(-1px);
                    }
                }

                &.el-button--primary {
                    background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
                    border: none;
                    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);

                    &:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
                    }
                }
            }
        }

        .control {
            .create-post-btn {
                background: linear-gradient(135deg, #42b883 0%, #33a06f 100%);
                border: none;
                padding: 0.8rem 1.8rem;
                font-size: 1.1rem;
                display: flex;
                align-items: center;
                gap: 0.8rem;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(66, 184, 131, 0.3);

                .el-icon {
                    font-size: 1.2rem;
                }

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(66, 184, 131, 0.4);
                }

                &:active {
                    transform: translateY(0);
                }
            }
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
    // 添加相对定位，作为固定定位的参考
    position: relative;
    // 为固定的 header 留出空间
    padding-top: calc(var(--header-height) + 20px); // 根据 header 的实际高度调整

    .filter-buttons {
        display: flex;
        gap: 0.8rem;

        .el-button {
            transition: all 0.3s ease;

            &:not(.el-button--primary) {
                &:hover {
                    color: var(--el-color-primary);
                    border-color: var(--el-color-primary);
                    background-color: rgba(64, 158, 255, 0.1);
                }
            }
        }
    }
}

.post-list {
    display: grid;
    gap: 1rem;
}

.post-card {
    h3 {
        cursor: pointer;
    }

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

    .discussion-section {
        padding-top: 180px; // 为移动端的更高 header 留出空间
    }

    .section-header {
        &-container {
            padding: 1.5rem 1rem;
        }
    }
}

// 简化的分页器样式
.pagination-container {
    margin-top: 2rem;
    padding: 1.5rem 0;
    display: flex;
    justify-content: center;

    :deep(.el-pagination) {
        .el-pagination__jump,
        .el-pagination__sizes {
            margin: 0;
        }

        button {
            background-color: #fff;
            
            &:not(:disabled):hover {
                color: var(--el-color-primary);
            }
        }

        .el-pager li {
            background-color: #fff;
            
            &:not(.is-disabled):hover {
                color: var(--el-color-primary);
            }

            &.is-active {
                background-color: var(--el-color-primary);
                color: #fff;
            }
        }
    }
}

// 响应式调整
@media (max-width: 768px) {
    .pagination-container {
        padding: 0.5rem;

        :deep(.el-pagination) {
            .el-pagination__sizes {
                display: none; // 在移动端隐藏页码大小选择器
            }
        }
    }
}

// 添加空状态样式
.empty-state {
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 20px;
    padding: 4rem 2rem;
    text-align: center;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;

    .empty-content {
        max-width: 600px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
    }

    .illustration {
        position: relative;
        margin-bottom: 3rem;

        .empty-image {
            width: 240px;
            height: auto;
            animation: float 4s ease-in-out infinite;
            position: relative;
            z-index: 2;
        }

        .decoration-circle {
            position: absolute;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(74, 144, 226, 0.1) 0%, rgba(74, 144, 226, 0.05) 100%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1;
            animation: pulse 4s ease-in-out infinite;
        }

        .decoration-dots {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: radial-gradient(circle, #4a90e2 1px, transparent 1px);
            background-size: 20px 20px;
            opacity: 0.1;
            animation: rotateDots 60s linear infinite;
        }
    }

    .text-content {
        margin-bottom: 2.5rem;

        h3 {
            font-size: 2rem;
            color: #2c3e50;
            margin-bottom: 1rem;
            font-weight: 600;
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        p {
            font-size: 1.2rem;
            color: #5c6b7a;
            line-height: 1.6;
        }
    }

    .action-buttons {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        margin-bottom: 3.5rem;

        .el-button {
            padding: 0.8rem 2rem;
            font-size: 1.1rem;
            transition: all 0.3s ease;

            .el-icon {
                margin-right: 0.5rem;
                font-size: 1.2rem;
            }

            &.create-btn {
                background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
                border: none;

                &:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(74, 144, 226, 0.3);
                }
            }

            &.guide-btn {
                &:hover {
                    background: rgba(74, 144, 226, 0.1);
                    border-color: transparent;
                }
            }
        }
    }

    .quick-tips {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        padding: 2rem;
        border-radius: 16px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

        .tips-header {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            margin-bottom: 1.5rem;

            .el-icon {
                font-size: 1.4rem;
                color: #f1c40f;
            }

            h4 {
                color: #2c3e50;
                font-size: 1.2rem;
                margin: 0;
            }
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            display: grid;
            gap: 1rem;

            li {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0.8rem 1rem;
                background: rgba(74, 144, 226, 0.05);
                border-radius: 10px;
                transition: all 0.3s ease;

                &:hover {
                    background: rgba(74, 144, 226, 0.1);
                    transform: translateX(5px);
                }

                .el-icon {
                    color: #4a90e2;
                    font-size: 1.2rem;
                }

                span {
                    color: #2c3e50;
                    font-size: 1rem;
                }
            }
        }
    }
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}

@keyframes pulse {

    0%,
    100% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 0.5;
    }

    50% {
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0.3;
    }
}

@keyframes rotateDots {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 768px) {
    .empty-state {
        padding: 3rem 1rem;

        .illustration .empty-image {
            width: 180px;
        }

        .text-content h3 {
            font-size: 1.6rem;
        }

        .action-buttons {
            flex-direction: column;
            padding: 0 2rem;
        }
    }
}
</style>