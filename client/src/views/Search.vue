<script setup lang="ts">
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'

// 搜索相关的状态
const searchQuery = ref('')
const activeTab = ref('all')

// 搜索结果数据
const searchResults = ref({
    all: [
        {
            id: 1,
            type: 'article',
            title: '清醒梦与创造力的关系研究',
            summary: '本研究探讨了清醒梦对人类创造力的影响...',
            date: '2024-03-20',
            author: '张医生',
            tags: ['研究', '心理学']
        },
        {
            id: 2,
            type: 'qa',
            title: '如何提高清醒梦的频率？',
            summary: '很多人都想知道如何更频繁地体验清醒梦...',
            date: '2024-03-19',
            author: '李教授',
            answers: 15
        },
        // 可以添加更多搜索结果
    ],
    articles: [], // 文章搜索结果
    qa: [],      // 问答搜索结果
    users: []    // 用户搜索结果
})

// 搜索类型选项
const searchTypes = [
    { key: 'all', label: '全部' },
    { key: 'articles', label: '文章' },
    { key: 'qa', label: '问答' },
    { key: 'users', label: '用户' }
]

// 处理搜索
const handleSearch = () => {
    // 这里添加实际的搜索逻辑
    console.log('Searching for:', searchQuery.value)
}
</script>

<template>
    <div class="search-page">
        <!-- 搜索头部 -->
        <div class="search-header">
            <div class="search-container">
                <el-input 
                    v-model="searchQuery"
                    placeholder="搜索文章、问答或用户"
                    class="search-input"
                    @keyup.enter="handleSearch"
                >
                    <template #prefix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </div>
        </div>

        <!-- 搜索内容区域 -->
        <div class="search-content">
            <div class="search-sidebar">
                <el-menu
                    :default-active="activeTab"
                    class="search-menu"
                    @select="(key) => activeTab = key"
                >
                    <el-menu-item 
                        v-for="type in searchTypes"
                        :key="type.key"
                        :index="type.key"
                    >
                        {{ type.label }}
                        <template #title>
                            <span>{{ type.label }}</span>
                            <span class="result-count">({{ searchResults[type.key]?.length || 0 }})</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </div>

            <div class="search-results">
                <!-- 搜索结果列表 -->
                <template v-if="searchResults[activeTab]?.length">
                    <div 
                        v-for="result in searchResults[activeTab]" 
                        :key="result.id"
                        class="result-item"
                    >
                        <div class="result-header">
                            <h3>{{ result.title }}</h3>
                            <span class="result-type">{{ result.type === 'article' ? '文章' : '问答' }}</span>
                        </div>
                        <p class="result-summary">{{ result.summary }}</p>
                        <div class="result-meta">
                            <span>{{ result.author }}</span>
                            <span>{{ result.date }}</span>
                            <div class="result-tags">
                                <el-tag 
                                    v-for="tag in result.tags" 
                                    :key="tag"
                                    size="small"
                                    effect="plain"
                                >
                                    {{ tag }}
                                </el-tag>
                            </div>
                        </div>
                    </div>
                </template>
                
                <!-- 无结果显示 -->
                <el-empty 
                    v-else 
                    description="暂无搜索结果"
                    :image-size="200"
                />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.search-page {
    min-height: 100vh;
    background-color: var(--bg-light);
    padding: 2rem 0;
}

.search-header {
    background: white;
    padding: 2rem 0;
    margin-bottom: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .search-container {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        gap: 1rem;
        padding: 0 1rem;

        .search-input {
            flex: 1;
        }
    }
}

.search-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 2rem;
    padding: 0 1rem;

    .search-sidebar {
        width: 200px;
        flex-shrink: 0;

        .search-menu {
            background: transparent;
            border-right: none;
        }

        .result-count {
            color: var(--text-color-light);
            margin-left: 0.5rem;
        }
    }

    .search-results {
        flex: 1;
        
        .result-item {
            background: white;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s ease;

            &:hover {
                transform: translateY(-2px);
            }

            .result-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;

                h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    color: var(--text-color);
                }

                .result-type {
                    font-size: 0.9rem;
                    color: var(--primary-color);
                    background: rgba(74, 144, 226, 0.1);
                    padding: 0.2rem 0.8rem;
                    border-radius: 4px;
                }
            }

            .result-summary {
                color: var(--text-color-light);
                margin-bottom: 1rem;
                line-height: 1.6;
            }

            .result-meta {
                display: flex;
                align-items: center;
                gap: 1rem;
                color: var(--text-color-light);
                font-size: 0.9rem;

                .result-tags {
                    margin-left: auto;
                    display: flex;
                    gap: 0.5rem;
                }
            }
        }
    }
}

// 响应式设计
@media (max-width: 768px) {
    .search-content {
        flex-direction: column;

        .search-sidebar {
            width: 100%;
        }
    }
}
</style> 