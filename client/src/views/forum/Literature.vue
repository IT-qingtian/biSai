<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElCard, ElTag, ElButton, ElImage, ElDialog } from 'element-plus'
import { Document, View, Download, Clock, User } from '@element-plus/icons-vue'

interface Literature {
    id: number
    title: string
    authors: string[]
    journal: string
    publishDate: string
    abstract: string
    keywords: string[]
    views: number
    downloads: number
    pdfUrl: string
    coverImage: string
    category: string
    highlight: boolean
}

// 添加分类数据
const categories = ref([
    '全部', '研究报告', '临床研究', '综述文章', '最新发现'
])

const currentCategory = ref('全部')

// 扩展文献数据
const literatures = ref<Literature[]>([
    {
        id: 1,
        title: "清醒梦与创造力的关系研究：一项系统性综述",
        authors: ["张三", "李四", "王五"],
        journal: "心理学研究",
        publishDate: "2024-03-15",
        abstract: "本研究通过系统性文献综述，探讨了清醒梦与创造力之间的关联。研究发现，经常体验清醒梦的个体在造性思维测试中表现出更高的得分，特别是在问题解决和艺术创作方面...",
        keywords: ["清醒梦", "创造力", "心理学", "意识研究"],
        views: 1250,
        downloads: 368,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "研究报告",
        highlight: true
    },
    {
        id: 2,
        title: "脑电波模式在清醒梦诱导中的应用",
        authors: ["赵六", "钱七"],
        journal: "神经科学前沿",
        publishDate: "2024-02-28",
        abstract: "本研究探讨了特定脑电波模式与清醒梦状态之间的关系，并提出了一种基于脑电波反馈的清醒梦诱导方法。研究结果表明，该方法能显著提高清醒梦的发生频率...",
        keywords: ["脑电波", "清醒梦", "神经科学", "意识状态"],
        views: 890,
        downloads: 245,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "临床研究",
        highlight: false
    },
    {
        id: 3,
        title: "清醒梦在心理治疗中的应用研究",
        authors: ["孙八", "周九"],
        journal: "临床心理学杂志",
        publishDate: "2024-02-15",
        abstract: "本研究考察了将清醒梦技术应用于心理治疗的可行性和效果。通过对100名患者的随机对照试验，发现清醒梦疗法能显著改善焦虑和抑郁症状...",
        keywords: ["清醒梦", "心理治疗", "临床研究", "心理健康"],
        views: 1560,
        downloads: 472,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "临床研究",
        highlight: false
    },
    {
        id: 4,
        title: "儿童清醒梦体验与认知发展的关联性研究",
        authors: ["刘十", "陈十一"],
        journal: "发展心理学报",
        publishDate: "2024-02-10",
        abstract: "本研究追踪调查了200名6-12岁儿童的清醒梦体验，探讨了清醒梦与儿童认知能力发展之间的关系。研究发现，有规律清醒梦体验的儿童在空间认知和创造性思维方面表现更优...",
        keywords: ["儿童心理", "认知发展", "清醒梦", "空间认知"],
        views: 735,
        downloads: 189,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "研究报告",
        highlight: false
    },
    {
        id: 5,
        title: "清醒梦与记忆巩固：一项长期追踪研究",
        authors: ["吴十二", "郑十三"],
        journal: "认知科学",
        publishDate: "2024-01-25",
        abstract: "通过为期两年的追踪研究，本文探讨了清醒梦练习对长期记忆巩固的影响。研究表明，定期进行清醒梦练习可以显著提高记忆保持率和回忆准确度...",
        keywords: ["记忆", "认知科学", "清醒梦", "长期研究"],
        views: 920,
        downloads: 267,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "研究报告",
        highlight: true
    },
    {
        id: 6,
        title: "虚拟现实技术辅助清醒梦训练的效果研究",
        authors: ["黄十四", "马十五"],
        journal: "虚拟技术",
        publishDate: "2024-01-20",
        abstract: "本研究开发了一套基于VR技术的清醒梦训练系统，并对其训练效果进行了评估。结果表明，VR辅助训练能显著缩短清醒梦入门时间，提高训练效率...",
        keywords: ["虚拟现实", "VR", "清醒梦", "训练方法"],
        views: 1680,
        downloads: 495,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "最新发现",
        highlight: true
    },
    {
        id: 7,
        title: "老年人清醒梦体验与认知功能维持的相关性",
        authors: ["朱十六", "秦十七"],
        journal: "老年医学研究",
        publishDate: "2024-01-15",
        abstract: "本研究调查了500名65岁以上老年人的清醒梦体验情况，分析了清醒梦与认知功能维持之间的关系。研究发现，保持清醒梦习惯的老年人认知功能衰退速度更慢...",
        keywords: ["老年医学", "认知功能", "清醒梦", "健康老龄化"],
        views: 845,
        downloads: 234,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "临床研究",
        highlight: false
    },
    {
        id: 8,
        title: "清醒梦与情绪调节能力的关系研究",
        authors: ["韩十八", "冯十九"],
        journal: "情绪心理学",
        publishDate: "2024-01-10",
        abstract: "本研究探讨了清醒梦练习对情绪调节能力的影响。通过对300名参与者的研究发现，经常进行清醒梦练习的人表现出更好的情绪觉察和调节能力...",
        keywords: ["情绪调节", "心理健康", "清醒梦", "情绪管理"],
        views: 1120,
        downloads: 356,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "研究报告",
        highlight: false
    },
    {
        id: 9,
        title: "清醒梦与创伤后应激障碍治疗：系统性回顾",
        authors: ["董二十", "范二一"],
        journal: "心理治疗学报",
        publishDate: "2024-01-05",
        abstract: "本文系统回顾了近十年来清醒梦在PTSD治疗中的应用研究，总结了其治疗机制和效果，为临床实践提供了新的治疗思路...",
        keywords: ["PTSD", "心理治疗", "清醒梦", "临床应用"],
        views: 1340,
        downloads: 428,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "综述文章",
        highlight: false
    },
    {
        id: 10,
        title: "人工智能辅助清醒梦研究的现状与展望",
        authors: ["高二二", "魏二三"],
        journal: "人工智能应用",
        publishDate: "2024-01-01",
        abstract: "本文综述了AI技术在清醒梦研究中的最新应用，包括梦境内容分析、诱导技术优化等方面，并展望了未来发展方向...",
        keywords: ["人工智能", "AI", "清醒梦", "技术创新"],
        views: 2100,
        downloads: 687,
        pdfUrl: "/path/to/pdf",
        coverImage: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        category: "最新发现",
        highlight: true
    }
])

// 筛选文献
const filteredLiteratures = computed(() => {
    if (currentCategory.value === '全部') return literatures.value
    return literatures.value.filter(l => l.category === currentCategory.value)
})

// 当前预览的文献
const currentLiterature = ref<Literature | null>(null)
const previewVisible = ref(false)

const showPreview = (literature: Literature) => {
    currentLiterature.value = literature
    previewVisible.value = true
}

const handleDownload = (literature: Literature) => {
    // 处理下载逻辑
    console.log('下载文献:', literature.title)
}
</script>

<template>
    <div class="literature-page">
        <div class="page-header">
            <div class="header-content">
                <h2>文献浏览</h2>
                <p>探索最新研究成果</p>
            </div>
        </div>

        <div class="literature-container">
            <!-- 分类导航 -->
            <div class="category-nav">
                <div class="category-scroll">
                    <button v-for="category in categories" :key="category"
                        :class="['category-btn', { active: currentCategory === category }]"
                        @click="currentCategory = category">
                        {{ category }}
                    </button>
                </div>
            </div>

            <!-- 瀑布流布局 -->
            <div class="masonry-grid">
                <!-- 特色文献 -->
                <div v-for="item in filteredLiteratures.filter(l => l.highlight)" :key="item.id"
                    class="masonry-item featured" @click="showPreview(item)">
                    <div class="card-image">
                        <el-image :src="item.coverImage" fit="cover" />
                        <div class="image-overlay">
                            <span class="category-tag">{{ item.category }}</span>
                            <div class="overlay-content">
                                <h3>{{ item.title }}</h3>
                                <p>{{ item.abstract }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 普通文献 -->
                <div v-for="item in filteredLiteratures.filter(l => !l.highlight)" :key="item.id" class="masonry-item"
                    @click="showPreview(item)">
                    <div class="card-content">
                        <div class="card-header">
                            <span class="category-tag">{{ item.category }}</span>
                            <h3>{{ item.title }}</h3>
                        </div>

                        <div class="card-meta">
                            <div class="authors">
                                <el-icon>
                                    <User />
                                </el-icon>
                                {{ item.authors.join(', ') }}
                            </div>
                            <div class="journal">
                                {{ item.journal }} · {{ item.publishDate }}
                            </div>
                        </div>

                        <p class="abstract">{{ item.abstract }}</p>

                        <div class="card-footer">
                            <div class="keywords">
                                <el-tag v-for="keyword in item.keywords" :key="keyword" size="small" effect="plain">
                                    {{ keyword }}
                                </el-tag>
                            </div>
                            <div class="stats">
                                <span><el-icon>
                                        <View />
                                    </el-icon>{{ item.views }}</span>
                                <span><el-icon>
                                        <Download />
                                    </el-icon>{{ item.downloads }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 预览对话框 -->
        <el-dialog v-model="previewVisible" :title="currentLiterature?.title" width="60%" class="preview-dialog">
            <div v-if="currentLiterature" class="preview-content">
                <div class="preview-header">
                    <div class="preview-meta">
                        <div class="preview-authors">
                            作者：{{ currentLiterature.authors.join(', ') }}
                        </div>
                        <div class="preview-journal">
                            发表于：{{ currentLiterature.journal }}
                            <span class="preview-date">{{ currentLiterature.publishDate }}</span>
                        </div>
                    </div>

                    <div class="preview-keywords">
                        <el-tag v-for="keyword in currentLiterature.keywords" :key="keyword" size="small" effect="plain"
                            class="keyword">
                            {{ keyword }}
                        </el-tag>
                    </div>
                </div>

                <div class="preview-abstract">
                    <h4>摘要</h4>
                    <p>{{ currentLiterature.abstract }}</p>
                </div>

                <div class="preview-actions">
                    <el-button type="primary" @click="handleDownload(currentLiterature)">
                        <el-icon>
                            <Download />
                        </el-icon>
                        下载全文
                    </el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped lang="less">
.literature-page {
    min-height: 100vh;
    background: #f5f7fa;
    padding-bottom: 3rem;
}

.page-header {
    background: white;
    padding: 2rem 0;
    margin-bottom: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;

        h2 {
            font-size: 2rem;
            color: #2c3e50;
            margin: 0;
            margin-bottom: 0.5rem;
        }

        p {
            color: #5c6b7a;
            margin: 0;
            font-size: 1.1rem;
        }
    }
}

.literature-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.category-nav {
    margin-bottom: 2rem;
    background: white;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .category-scroll {
        display: flex;
        gap: 1rem;
        overflow-x: auto;
        padding: 0.5rem;

        &::-webkit-scrollbar {
            display: none;
        }
    }

    .category-btn {
        padding: 0.5rem 1.5rem;
        border: none;
        background: transparent;
        color: #606266;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 20px;
        transition: all 0.3s ease;
        white-space: nowrap;

        &:hover {
            color: var(--el-color-primary);
            background: var(--el-color-primary-light-9);
        }

        &.active {
            color: white;
            background: var(--el-color-primary);
        }
    }
}

.masonry-grid {
    columns: 4;
    column-gap: 1.5rem;
    padding: 1.5rem 0;

    @media (max-width: 1400px) {
        columns: 3;
    }

    @media (max-width: 1024px) {
        columns: 2;
    }

    @media (max-width: 640px) {
        columns: 1;
    }
}

.masonry-item {
    break-inside: avoid;
    margin-bottom: 1.5rem;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    &.featured {
        .card-image {
            height: 300px;
            position: relative;

            .image-overlay {
                position: absolute;
                inset: 0;
                background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.8));
                padding: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                opacity: 0;
                transition: opacity 0.3s ease;

                h3 {
                    color: white;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                }

                p {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 1rem;
                    line-height: 1.6;
                }
            }

            &:hover .image-overlay {
                opacity: 1;
            }
        }
    }
}

.card-content {
    padding: 1.5rem;
}

.card-header {
    margin-bottom: 1rem;

    h3 {
        font-size: 1.2rem;
        color: #2c3e50;
        margin: 0.5rem 0;
        line-height: 1.4;
    }
}

.category-tag {
    display: inline-block;
    padding: 0.3rem 0.8rem;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    border-radius: 12px;
    font-size: 0.85rem;
}

.card-meta {
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #606266;

    .authors {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        margin-bottom: 0.4rem;
    }

    .journal {
        color: #909399;
    }
}

.abstract {
    color: #5c6b7a;
    font-size: 0.95rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-footer {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .keywords {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .stats {
        display: flex;
        gap: 1rem;
        color: #909399;
        font-size: 0.9rem;

        span {
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }
    }
}

.preview-dialog {
    :deep(.el-dialog__header) {
        padding: 1.5rem;
        margin-right: 0;
        border-bottom: 1px solid #ebeef5;
    }

    :deep(.el-dialog__body) {
        padding: 1.5rem;
    }
}

.preview-content {
    .preview-header {
        margin-bottom: 1.5rem;
    }

    .preview-meta {
        margin-bottom: 1rem;

        .preview-authors {
            color: #606266;
            margin-bottom: 0.5rem;
        }

        .preview-journal {
            color: #909399;
            font-size: 0.9rem;

            .preview-date {
                margin-left: 1rem;
            }
        }
    }

    .preview-keywords {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
    }

    .preview-abstract {
        h4 {
            color: #2c3e50;
            margin: 0 0 1rem;
        }

        p {
            color: #5c6b7a;
            line-height: 1.6;
            margin: 0;
        }
    }

    .preview-actions {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
    }
}

// 响应式调整
@media (max-width: 768px) {
    .masonry-grid {
        padding: 1rem;
    }

    .masonry-item {
        margin-bottom: 1rem;

        &.featured .card-image {
            height: 250px;
        }
    }
}
</style>