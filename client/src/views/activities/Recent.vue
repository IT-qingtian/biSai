<script setup lang="ts">
import { ref } from 'vue'
import { ElCard, ElTag, ElButton, ElImage, ElDivider } from 'element-plus'
import { Calendar, Location, User, Timer } from '@element-plus/icons-vue'

interface Activity {
    id: number
    title: string
    date: string
    time: string
    location: string
    image: string
    description: string
    status: 'upcoming' | 'ongoing' | 'ended'
    maxParticipants: number
    currentParticipants: number
    tags: string[]
    organizer: string
}

const activities = ref<Activity[]>([
    {
        id: 1,
        title: "2024春季健康讲座",
        date: "2024-04-15",
        time: "14:00-16:00",
        location: "市中心医院大讲堂",
        image: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        description: "邀请知名专家讲解春季常见疾病预防和保健知识，内容包括：花粉过敏预防、春季养生等主题。",
        status: 'upcoming',
        maxParticipants: 100,
        currentParticipants: 45,
        tags: ['健康讲座', '免费活动', '专家讲解'],
        organizer: "市中心医院"
    },
    {
        id: 2,
        title: "社区义诊活动",
        date: "2024-04-20",
        time: "09:00-17:00",
        location: "和平社区服务中心",
        image: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        description: "组织专业医师到社区开展义诊活动，为居民提供基础健康检查和咨询服务。",
        status: 'upcoming',
        maxParticipants: 200,
        currentParticipants: 180,
        tags: ['义诊', '社区活动', '免费检查'],
        organizer: "和平社区"
    },
    {
        id: 3,
        title: "青少年心理健康工作坊",
        date: "2024-04-25",
        time: "15:00-17:00",
        location: "青年活动中心",
        image: "https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg",
        description: "针对青少年常见心理问题，开展互动式心理辅导活动，帮助青少年建立健康的心理认知。",
        status: 'upcoming',
        maxParticipants: 50,
        currentParticipants: 30,
        tags: ['心理健康', '青少年', '工作坊'],
        organizer: "市心理健康中心"
    }
])

const getStatusType = (status: string) => {
    switch (status) {
        case 'upcoming':
            return ''
        case 'ongoing':
            return 'success'
        case 'ended':
            return 'info'
        default:
            return ''
    }
}

const getStatusText = (status: string) => {
    switch (status) {
        case 'upcoming':
            return '即将开始'
        case 'ongoing':
            return '进行中'
        case 'ended':
            return '已结束'
        default:
            return '未知状态'
    }
}

const handleRegister = (activity: Activity) => {
    console.log('报名活动:', activity.title)
}
</script>

<template>
    <div class="activities-page">
        <div class="page-header">
            <div class="header-content">
                <h2>近期活动</h2>
                <p>参与线下活动，与专业医师面对面交流</p>
            </div>
        </div>

        <div class="activities-container">
            <div class="activities-grid">
                <div v-for="activity in activities" :key="activity.id" class="activity-card">
                    <div class="activity-image">
                        <el-image :src="activity.image" fit="cover" />
                        <div class="activity-overlay">
                            <div class="activity-tags">
                                <el-tag v-for="tag in activity.tags" :key="tag" size="small" effect="plain" class="tag">
                                    {{ tag }}
                                </el-tag>
                            </div>
                        </div>
                    </div>

                    <div class="activity-content">
                        <div class="status-badge" :class="activity.status">
                            {{ getStatusText(activity.status) }}
                        </div>

                        <h3 class="activity-title">{{ activity.title }}</h3>

                        <div class="activity-info">
                            <div class="info-item">
                                <el-icon>
                                    <Calendar />
                                </el-icon>
                                <span>{{ activity.date }}</span>
                            </div>
                            <div class="info-item">
                                <el-icon>
                                    <Location />
                                </el-icon>
                                <span>{{ activity.location }}</span>
                            </div>
                        </div>

                        <p class="activity-description">{{ activity.description }}</p>

                        <div class="activity-footer">
                            <div class="participants">
                                <el-icon>
                                    <User />
                                </el-icon>
                                <span>{{ activity.currentParticipants }}/{{ activity.maxParticipants }}</span>
                            </div>
                            <el-button type="primary" :plain="activity.currentParticipants >= activity.maxParticipants"
                                :disabled="activity.currentParticipants >= activity.maxParticipants"
                                @click="handleRegister(activity)">
                                {{ activity.currentParticipants >= activity.maxParticipants ? '名额已满' : '立即报名' }}
                            </el-button>
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
    padding: 2.5rem 0;
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
            margin-bottom: 1rem;
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

.activities-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
    padding: 1rem 0;
}

.activity-card {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    transition: all 0.3s ease;
    height: 380px;
    display: flex;
    flex-direction: column;
    position: relative;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

        .activity-image .activity-overlay {
            opacity: 1;
        }
    }
}

.activity-image {
    cursor: pointer;
    height: 160px;
    position: relative;
    overflow: hidden;

    :deep(.el-image) {
        width: 100%;
        height: 100%;
        transition: transform 0.3s ease;
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

    .activity-tags {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;

        .tag {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(4px);
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

.status-badge {
    position: absolute;
    top: -10px;
    right: 1rem;
    padding: 0.25rem 0.7rem;
    border-radius: 10px;
    font-size: 0.8rem;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);

    &.ongoing {
        background: var(--el-color-success-light-9);
        color: var(--el-color-success);
    }

    &.ended {
        background: var(--el-color-info-light-9);
        color: var(--el-color-info);
    }
}

.activity-title {
    font-size: 1.1rem;
    color: #2c3e50;
    margin: 0.6rem 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.activity-info {
    margin: 0.6rem 0;

    .info-item {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        color: #606266;
        font-size: 0.85rem;
        margin-bottom: 0.3rem;

        .el-icon {
            font-size: 0.95rem;
            color: #909399;
        }
    }
}

.activity-description {
    color: #5c6b7a;
    font-size: 0.85rem;
    line-height: 1.5;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex: 1;
}

.activity-footer {
    margin-top: 0.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.8rem;
    border-top: 1px solid #f0f2f5;

    .participants {
        display: flex;
        align-items: center;
        gap: 0.3rem;
        color: #606266;
        font-size: 0.85rem;

        .el-icon {
            color: #909399;
        }
    }

    .el-button {
        padding: 0.4rem 0.8rem;
        border-radius: 15px;
        font-size: 0.85rem;
    }
}

@media (max-width: 768px) {
    .activities-grid {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        padding: 1rem;
        gap: 1rem;
    }

    .activity-card {
        height: 360px;
    }

    .activity-image {
        height: 140px;
    }
}
</style>