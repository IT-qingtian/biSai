<script setup lang="ts">
import { ref } from 'vue'

// 定义医生类型接口
interface Doctor {
    id: number;
    name: string;
    title: string;
    department: string;
    specialty: string;
    avatar: string;
    schedule: {
        date: string;
        periods: Array<{
            time: string;
            available: boolean;
        }>;
    }[];
}

// 医生列表数据
const doctors = ref<Doctor[]>([
    {
        id: 1,
        name: '张医生',
        title: '主任医师',
        department: '内科',
        specialty: '心血管疾病，高血压，冠心病',
        avatar: 'https://example.com/avatar1.jpg',
        schedule: [
            {
                date: '2024-03-25',
                periods: [
                    { time: '09:00', available: true },
                    { time: '10:00', available: false },
                    { time: '11:00', available: true },
                ]
            },
            // 可以添加更多日期
        ]
    },
    // 可以添加更多医生
])

// 筛选条件
const filters = ref({
    department: '',
    date: ''
})

// 当前选中的医生
const selectedDoctor = ref<Doctor | null>(null)

// 处理预约
const handleAppointment = (doctor: Doctor, date: string, time: string) => {
    console.log('预约:', doctor.name, date, time)
}
</script>

<template>
    <div class="register-page">
        <!-- 页面标题 -->
        <div class="page-header">
            <div class="header-content">
                <h2>挂号咨询</h2>
                <p>选择专业医生，在线预约咨询</p>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="main-content">
            <!-- 筛选区域 -->
            <div class="filter-section">
                <el-form :model="filters" label-width="80px" class="filter-form">
                    <el-form-item label="科室">
                        <el-select v-model="filters.department" placeholder="选择科室">
                            <el-option label="内科" value="internal" />
                            <el-option label="外科" value="surgery" />
                            <el-option label="儿科" value="pediatrics" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="日期">
                        <el-date-picker v-model="filters.date" type="date" placeholder="选择日期" />
                    </el-form-item>
                </el-form>
            </div>

            <!-- 医生列表 -->
            <div class="doctors-list">
                <el-row :gutter="20">
                    <el-col :span="8" v-for="doctor in doctors" :key="doctor.id">
                        <el-card class="doctor-card" :body-style="{ padding: '0px' }">
                            <div class="doctor-info">
                                <el-avatar :size="64" :src="doctor.avatar" />
                                <div class="info-text">
                                    <h3>{{ doctor.name }}
                                        <span class="title">{{ doctor.title }}</span>
                                    </h3>
                                    <p class="department">{{ doctor.department }}</p>
                                    <p class="specialty">{{ doctor.specialty }}</p>
                                </div>
                            </div>
                            <div class="schedule-section">
                                <h4>可预约时间</h4>
                                <div class="time-slots">
                                    <el-button 
                                        v-for="period in doctor.schedule[0].periods"
                                        :key="period.time"
                                        size="small"
                                        :type="period.available ? 'primary' : 'info'"
                                        :disabled="!period.available"
                                        @click="handleAppointment(doctor, doctor.schedule[0].date, period.time)"
                                    >
                                        {{ period.time }}
                                    </el-button>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.register-page {
    min-height: calc(100vh - 60px);
    background-color: #f5f7fa;
    padding-bottom: 2rem;
}

.page-header {
    background: white;
    padding: 2rem 0;
    margin-bottom: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;

        h2 {
            font-size: 1.8rem;
            color: #2c3e50;
            margin: 0;
            margin-bottom: 0.5rem;
        }

        p {
            color: #5c6b7a;
            margin: 0;
        }
    }
}

.main-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.filter-section {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .filter-form {
        display: flex;
        gap: 2rem;
    }
}

.doctors-list {
    .doctor-card {
        margin-bottom: 1.5rem;
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s ease;

        &:hover {
            transform: translateY(-5px);
        }

        .doctor-info {
            padding: 1.5rem;
            display: flex;
            gap: 1rem;

            .info-text {
                flex: 1;

                h3 {
                    margin: 0;
                    font-size: 1.2rem;
                    color: #2c3e50;

                    .title {
                        font-size: 0.9rem;
                        color: #5c6b7a;
                        margin-left: 0.5rem;
                    }
                }

                .department {
                    color: var(--primary-color);
                    margin: 0.5rem 0;
                }

                .specialty {
                    color: #5c6b7a;
                    font-size: 0.9rem;
                    margin: 0;
                }
            }
        }

        .schedule-section {
            padding: 1.5rem;
            background: #f8f9fa;
            border-top: 1px solid #eee;

            h4 {
                margin: 0 0 1rem 0;
                color: #2c3e50;
            }

            .time-slots {
                display: flex;
                gap: 0.5rem;
                flex-wrap: wrap;
            }
        }
    }
}
</style>