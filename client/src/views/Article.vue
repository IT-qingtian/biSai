<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElSkeleton, ElSkeletonItem } from 'element-plus'
import { marked } from 'marked'

interface Article {
    id: number
    title: string
    date: string
    author: string
    content: string
    coverImage: string
    category: string
    tags: string[]
}

const route = useRoute()
const article = ref<Article | null>(null)
const loading = ref(true)

// 配置 marked 选项
marked.setOptions({
    breaks: true, // 支持 GitHub 风格的换行符
    gfm: true,    // 启用 GitHub 风格的 Markdown
})

// 模拟获取文章数据
const fetchArticle = async (id: string) => {
    loading.value = true
    try {
        // 这里应该是实际的API调用
        // 现在用模拟数据
        await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟加载延迟

        article.value = {
            id: parseInt(id),
            title: '最新研究发现：清醒梦有助于提高创造力',
            date: '2024-03-20',
            author: '张医生',
            content: `
# 清醒梦研究最新发现

## 研究背景

近年来，越来越多的研究表明，清醒梦与创造力之间存在着密切的联系。本研究通过对100名经常体验清醒梦的参与者进行为期6个月的跟踪研究，深入探讨了清醒梦对创造力的影响。

## 研究方法

研究团队采用了以下方法：

1. 标准化的创造力测试
2. 清醒梦日记记录
3. 脑电波监测
4. 心理量表评估

通过定性和定量相结合的方式，全面评估参与者的创造力水平变化。

## 主要发现

研究结果显示，经常体验清醒梦的参与者在多个方面都表现出显著提升：

- **发散性思维能力** 提升了 45%
- **问题解决的灵活性** 提升了 38%
- **艺术创作的独特性** 提升了 52%

> 特别值得注意的是，参与者在梦境中解决的问题往往能够应用到现实生活中。

### 数据分析

| 能力类型 | 提升幅度 | 显著性 |
|---------|---------|--------|
| 发散思维 | 45% | P<0.001 |
| 问题解决 | 38% | P<0.001 |
| 艺术创作 | 52% | P<0.001 |

## 实践意义

这项研究为清醒梦在创造力开发中的应用提供了重要的理论依据，同时也为个人提高创造力提供了新的思路和方法。

### 应用建议

1. 保持规律的睡眠习惯
2. 记录梦境日记
3. 练习清醒梦技巧
4. 设定创造性目标

\`\`\`javascript
// 示例：清醒梦记录格式
const dreamRecord = {
    date: '2024-03-20',
    duration: '45min',
    lucidity: 8,
    creativeTasks: ['问题解决', '艺术创作']
}
\`\`\`

![研究数据图表](https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg)

*图：参与者创造力提升趋势图*
            `,
            coverImage: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg',
            category: '研究报告',
            tags: ['清醒梦', '创造力', '心理研究', '科学发现']
        }
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    const articleId = route.params.id as string
    fetchArticle(articleId)
})
</script>

<template>
    <div class="article-page">
        <el-skeleton :loading="loading" animated>
            <template #template>
                <div class="skeleton-content">
                    <!-- 标题骨架 -->
                    <el-skeleton-item variant="h1" style="width: 80%; height: 48px; margin-bottom: 20px;" />
                    
                    <!-- 元信息骨架 -->
                    <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                        <el-skeleton-item variant="text" style="width: 100px;" />
                        <el-skeleton-item variant="text" style="width: 150px;" />
                        <el-skeleton-item variant="text" style="width: 120px;" />
                    </div>
                    
                    <!-- 标签骨架 -->
                    <div style="display: flex; gap: 10px; margin-bottom: 30px;">
                        <el-skeleton-item variant="text" style="width: 60px;" />
                        <el-skeleton-item variant="text" style="width: 80px;" />
                        <el-skeleton-item variant="text" style="width: 70px;" />
                    </div>
                    
                    <!-- 封面图骨架 -->
                    <el-skeleton-item variant="image" style="width: 100%; height: 400px; margin-bottom: 30px;" />
                    
                    <!-- 文章内容骨架 -->
                    <el-skeleton-item variant="p" style="width: 100%; margin-bottom: 20px;" :rows="2" />
                    <el-skeleton-item variant="p" style="width: 90%; margin-bottom: 20px;" :rows="3" />
                    <el-skeleton-item variant="p" style="width: 95%; margin-bottom: 20px;" :rows="2" />
                    <el-skeleton-item variant="p" style="width: 85%; margin-bottom: 20px;" :rows="3" />
                </div>
            </template>

            <template #default>
                <article v-if="article" class="article-container">
                    <header class="article-header">
                        <h1 class="article-title">{{ article.title }}</h1>
                        <div class="article-meta">
                            <span class="article-date">{{ article.date }}</span>
                            <span class="article-author">作者：{{ article.author }}</span>
                            <span class="article-category">分类：{{ article.category }}</span>
                        </div>
                        <div class="article-tags">
                            <el-tag v-for="tag in article.tags" :key="tag" class="tag" size="small" effect="light">
                                {{ tag }}
                            </el-tag>
                        </div>
                    </header>

                    <div class="article-cover">
                        <img :src="article.coverImage" :alt="article.title">
                    </div>

                    <div class="article-content markdown-body" v-html="marked(article.content)"></div>
                </article>
            </template>
        </el-skeleton>
    </div>
</template>

<style scoped>
.article-page {
    max-width: 900px;
    margin: 2rem auto;
    padding: 0 1rem;
}

.article-container {
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.article-header {
    padding: 2rem 2rem 1.5rem;
}

.article-title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 1rem;
    line-height: 1.3;
}

.article-meta {
    display: flex;
    gap: 1.5rem;
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 1rem;
}

.article-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.tag {
    margin-right: 0.5rem;
}

.article-cover {
    width: 100%;
    height: 400px;
    overflow: hidden;
}

.article-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.article-content {
    padding: 2rem;
    line-height: 1.8;
    color: #2c3e50;
}

/* Markdown 样式 */
.markdown-body :deep(h1) {
    font-size: 2.2rem;
    margin: 2rem 0 1.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #eaecef;
}

.markdown-body :deep(h2) {
    font-size: 1.8rem;
    margin: 1.8rem 0 1.2rem;
    padding-bottom: 0.3rem;
    border-bottom: 1px solid #eaecef;
}

.markdown-body :deep(h3) {
    font-size: 1.5rem;
    margin: 1.5rem 0 1rem;
}

.markdown-body :deep(p) {
    margin: 1rem 0;
    font-size: 1.1rem;
    line-height: 1.8;
}

.markdown-body :deep(ul), .markdown-body :deep(ol) {
    margin: 1rem 0;
    padding-left: 2rem;
}

.markdown-body :deep(li) {
    margin: 0.5rem 0;
    font-size: 1.1rem;
}

.markdown-body :deep(blockquote) {
    margin: 1rem 0;
    padding: 0.5rem 1rem;
    color: #666;
    border-left: 4px solid #42b983;
    background-color: #f8f8f8;
}

.markdown-body :deep(code) {
    background-color: #f6f8fa;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
}

.markdown-body :deep(pre) {
    background-color: #f6f8fa;
    padding: 1rem;
    border-radius: 6px;
    overflow-x: auto;
}

.markdown-body :deep(pre code) {
    background-color: transparent;
    padding: 0;
}

.markdown-body :deep(table) {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
}

.markdown-body :deep(th), .markdown-body :deep(td) {
    border: 1px solid #dfe2e5;
    padding: 0.6rem 1rem;
    text-align: left;
}

.markdown-body :deep(th) {
    background-color: #f6f8fa;
}

.markdown-body :deep(img) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 1.5rem auto;
    border-radius: 8px;
}

.markdown-body :deep(hr) {
    height: 1px;
    background-color: #eaecef;
    border: none;
    margin: 2rem 0;
}

@media (max-width: 768px) {
    .article-title {
        font-size: 2rem;
    }

    .article-meta {
        flex-direction: column;
        gap: 0.5rem;
    }

    .article-cover {
        height: 250px;
    }

    .article-content {
        padding: 1.5rem;
    }

    .markdown-body :deep(h1) {
        font-size: 1.8rem;
    }

    .markdown-body :deep(h2) {
        font-size: 1.5rem;
    }

    .markdown-body :deep(h3) {
        font-size: 1.3rem;
    }
}
</style>