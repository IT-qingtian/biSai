<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

// 定义搜索结果的类型接口
interface SearchResult {
    id: number;
    type: 'article' | 'qa';
    title: string;
    summary: string;
    date: string;
    author: string;
    tags?: string[];
    answers?: number;
}

// 定义搜索类型选项的接口
interface SearchType {
    key: 'all' | 'articles' | 'qa' | 'users';
    label: string;
}

// 定义搜索结果集合的类型
interface SearchResults {
    [key: string]: SearchResult[];  // 添加索引签名
}

// 搜索相关的状态
const searchQuery = ref('')
const activeTab = ref<'all' | 'articles' | 'qa' | 'users'>('all')

// 搜索结果数据
const searchResults = ref<SearchResults>({
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
    ],
    articles: [], // 文章搜索结果
    qa: [],      // 问答搜索结果
    users: []    // 用户搜索结果
})

// 搜索类型选项
const searchTypes: SearchType[] = [
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

// 处理菜单选择
const handleSelect = (key: string) => {
    activeTab.value = key as 'all' | 'articles' | 'qa' | 'users'
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
                    @select="handleSelect"
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
                            <div class="result-tags" v-if="result.tags">
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

<!-- style 部分保持不变 --> 