<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElCard, ElTag, ElButton, ElImage, ElDatePicker, ElSelect, ElOption } from 'element-plus'
import { Calendar, Location, User, Timer, View } from '@element-plus/icons-vue'

interface Activity {
    id: number
    title: string
    date: string
    time: string
    location: string
    image: string
    description: string
    status: 'ended'
    participants: number
    views: number
    tags: string[]
    organizer: string
    summary?: string
}

// 筛选条件
const filters = ref({
    date: '',
    tag: ''
})

// 所有可用标签
const allTags = ['健康讲座', '义诊', '社区活动', '心理健康', '专家讲解', '工作坊']

// 过往活动数据 - 增加更多数据
const pastActivities = ref<Activity[]>([
    {
        id: 1,
        title: "2024冬季健康义诊活动",
        date: "2024-01-15",
        time: "09:00-17:00",
        location: "市中心医院",
        image: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        description: "组织专业医师开展义诊活动，为居民提供免费健康咨询和基础检查服务。",
        status: 'ended',
        participants: 320,
        views: 1200,
        tags: ['义诊', '社区活动'],
        organizer: "市中心医院",
        summary: "活动圆满结束，共服务市民320人次，提供健康咨询500余次。"
    },
    {
        id: 2,
        title: "心理健康专题讲座",
        date: "2024-02-20",
        time: "14:00-16:00",
        location: "市图书馆报告厅",
        image: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        description: "邀请知名心理学专家进行专题讲座，探讨都市生活压力与心理健康。",
        status: 'ended',
        participants: 150,
        views: 800,
        tags: ['健康讲座', '心理健康', '专家讲解'],
        organizer: "市心理健康中心",
        summary: "讲座反响热烈，参与者纷纷表示收获颇丰。"
    },
    {
        id: 3,
        title: "社区老年人健康检查",
        date: "2023-12-10",
        time: "08:30-16:30",
        location: "和平社区服务中心",
        image: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        description: "针对社区老年人开展免费健康检查活动。",
        status: 'ended',
        participants: 280,
        views: 950,
        tags: ['义诊', '老年健康'],
        organizer: "和平社区",
        summary: "为280位老年人提供了全面的健康检查服务。"
    },
    {
        id: 4,
        title: "青少年心理辅导工作坊",
        date: "2023-11-25",
        time: "14:30-16:30",
        location: "市青少年活动中心",
        image: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        description: "面向青少年的心理健康工作坊。",
        status: 'ended',
        participants: 120,
        views: 600,
        tags: ['心理健康', '青少年'],
        organizer: "市心理健康中心",
        summary: "通过互动形式帮助青少年树立健康的心理认知。"
    },
    {
        id: 5,
        title: "秋季流感防治讲座",
        date: "2023-10-15",
        time: "10:00-11:30",
        location: "市第一医院",
        image: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        description: "秋季流感预防和治疗知识讲座。",
        status: 'ended',
        participants: 200,
        views: 850,
        tags: ['健康讲座', '疾病预防'],
        organizer: "市第一医院",
        summary: "提供实用的流感预防建议，受到群众欢迎。"
    }
])

// 根据筛选条件过滤活动
const filteredActivities = computed(() => {
    return pastActivities.value.filter(activity => {
        const dateMatch = !filters.value.date || activity.date.includes(filters.value.date)
        const tagMatch = !filters.value.tag || activity.tags.includes(filters.value.tag)
        return dateMatch && tagMatch
    })
})

// 获取所有月份并格式化显示
const getMonths = () => {
    const months = new Set(pastActivities.value.map(activity => {
        const date = new Date(activity.date)
        return `${date.getFullYear()}年${date.getMonth() + 1}月`
    }))
    return Array.from(months).sort().reverse() // 降序排列，最新的在前
}

// 判断是否是当前选中的月份
const isActiveMonth = (month: string) => {
    if (!filters.value.date) return false
    const filterDate = new Date(filters.value.date)
    const filterMonth = `${filterDate.getFullYear()}年${filterDate.getMonth() + 1}月`
    return filterMonth === month
}

// 点击时间线上的月份
const handleMonthClick = (month: string) => {
    // 将"2024年3月"格式转换为"2024-03"格式
    const [year, monthStr] = month.split('年')
    const monthNum = monthStr.replace('月', '').padStart(2, '0')
    const formattedDate = `${year}-${monthNum}`
    
    // 如果点击的是当前选中的月份，则取消筛选
    if (filters.value.date === formattedDate) {
        filters.value.date = ''
    } else {
        filters.value.date = formattedDate
    }
}
</script>

<template>
    <div class="activities-page">
        <div class="page-header">
            <div class="header-content">
                <h2>过往活动</h2>
                <p>记录每一次精彩瞬间</p>
            </div>
        </div>

        <div class="activities-container">
            <!-- 筛选区域 -->
            <div class="filter-section">
                <el-select v-model="filters.tag" placeholder="按类型筛选" clearable>
                    <el-option v-for="tag in allTags" :key="tag" :label="tag" :value="tag" />
                </el-select>
                <el-date-picker v-model="filters.date" type="month" placeholder="选择月份" format="YYYY-MM"
                    value-format="YYYY-MM" clearable />
            </div>

            <!-- 活动展示区域 -->
            <div class="activities-wrapper">
                <!-- 可滚动的活动网格 -->
                <div class="activities-scroll">
                    <div class="activities-grid">
                        <div v-for="activity in filteredActivities" :key="activity.id" class="activity-card">
                            <div class="activity-image">
                                <el-image :src="activity.image" fit="cover" />
                                <div class="activity-overlay">
                                    <div class="activity-stats">
                                        <span class="stat-item">
                                            <el-icon>
                                                <User />
                                            </el-icon>
                                            {{ activity.participants }}
                                        </span>
                                        <span class="stat-item">
                                            <el-icon>
                                                <View />
                                            </el-icon>
                                            {{ activity.views }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div class="activity-content">
                                <div class="activity-date">{{ activity.date }}</div>
                                <h3 class="activity-title">{{ activity.title }}</h3>

                                <div class="activity-info">
                                    <div class="info-item">
                                        <el-icon>
                                            <Location />
                                        </el-icon>
                                        <span>{{ activity.location }}</span>
                                    </div>
                                </div>

                                <div class="activity-tags">
                                    <el-tag v-for="tag in activity.tags" :key="tag" size="small" effect="plain"
                                        class="tag">
                                        {{ tag }}
                                    </el-tag>
                                </div>

                                <p class="activity-summary">{{ activity.summary }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 时间线部分更新 -->
                <div class="timeline">
                    <div class="timeline-track">
                        <div v-for="month in getMonths()" 
                            :key="month" 
                            class="timeline-point"
                            :class="{ active: isActiveMonth(month) }"
                            @click="handleMonthClick(month)">
                            <div class="timeline-dot"></div>
                            <span class="timeline-label">{{ month }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.activities-page {
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

.activities-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.filter-section {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;

    .el-select,
    .el-date-picker {
        width: 200px;
    }
}

.activities-wrapper {
    position: relative;
    margin-bottom: 3rem;
}

.activities-scroll {
    overflow-x: auto;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
    
    // 自定义滚动条样式
    &::-webkit-scrollbar {
        height: 6px; // 水平滚动条的高度
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f5f7fa;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #dcdfe6;
        border-radius: 3px;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #c0c4cc;
        }
    }
}

.activities-grid {
    display: flex;
    gap: 1.2rem;
    padding: 0.5rem;
    // 确保内容足够宽以触发滚动
    min-width: max-content;
    
    // 添加一些右侧内边距，防止最后一个卡片贴边
    padding-right: 2rem;
}

.activity-card {
    flex: 0 0 280px; // 固定宽度，不伸缩
    background: white;
    border-radius: 10px;
    overflow: hidden;
    height: 340px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

        .activity-image .activity-overlay {
            opacity: 1;
        }
    }
}

.activity-image {
    height: 160px;
    position: relative;
    overflow: hidden;

    :deep(.el-image) {
        width: 100%;
        height: 100%;
    }

    .activity-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
        display: flex;
        align-items: flex-end;
        padding: 1rem;
    }

    .activity-stats {
        display: flex;
        gap: 1rem;
        color: white;

        .stat-item {
            display: flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.9rem;

            .el-icon {
                font-size: 1rem;
            }
        }
    }
}

.activity-content {
    flex: 1;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    position: relative;
}

.activity-date {
    font-size: 0.85rem;
    color: #909399;
    margin-bottom: 0.5rem;
}

.activity-title {
    font-size: 1.1rem;
    color: #2c3e50;
    margin: 0 0 0.6rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.activity-info {
    margin-bottom: 0.6rem;

    .info-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: #606266;
        font-size: 0.85rem;

        .el-icon {
            font-size: 0.95rem;
            color: #909399;
        }
    }
}

.activity-tags {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
    margin-bottom: 0.8rem;

    .tag {
        font-size: 0.8rem;
    }
}

.activity-summary {
    color: #5c6b7a;
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.timeline {
    position: relative;
    padding: 1rem 0;
    margin-top: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        height: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 2px;
    }

    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 2px;
        background: #e4e7ed;
        transform: translateY(-50%);
    }
}

.timeline-track {
    display: inline-flex; // 改为 inline-flex 以支持水平滚动
    gap: 3rem; // 增加点之间的间距
    position: relative;
    padding: 0 2rem;
    min-width: min-content;
}

.timeline-point {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
        .timeline-dot {
            background: var(--el-color-primary);
            transform: scale(1.2);
        }

        .timeline-label {
            color: var(--el-color-primary);
            font-weight: 500;
        }
    }

    &:hover {
        .timeline-dot {
            transform: scale(1.2);
        }

        .timeline-label {
            color: var(--el-color-primary);
        }
    }
}

.timeline-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #c0c4cc;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
    position: relative;
    z-index: 1;
}

.timeline-label {
    font-size: 0.9rem;
    color: #606266;
    transition: all 0.3s ease;
}

@media (max-width: 768px) {
    .activities-container {
        padding: 0 1rem;
    }

    .filter-section {
        flex-direction: column;

        .el-select,
        .el-date-picker {
            width: 100%;
        }
    }

    .activities-scroll {
        &::-webkit-scrollbar {
            height: 4px; // 移动端更小的滚动条
        }
    }

    .activities-grid {
        gap: 1rem;
        padding-right: 1rem;
    }

    .activity-card {
        flex: 0 0 250px; // 移动端稍小的卡片宽度
    }

    .timeline-track {
        padding: 0 1rem;
    }

    .timeline-label {
        font-size: 0.8rem;
    }
}
</style>