<script setup lang="ts">
import { ref } from 'vue'

// 常见药品分类
const categories = ref([
    { id: 1, name: '感冒用药', icon: 'FirstAidKit' },
    { id: 2, name: '消化系统', icon: 'Stomach' },
    { id: 3, name: '心脑血管', icon: 'CirclePlus' },
    { id: 4, name: '儿科用药', icon: 'User' },
    { id: 5, name: '慢性病药', icon: 'Timer' },
])

// 搜索关键词
const searchQuery = ref('')

// 常见问题
const faqs = ref([
    {
        question: '感冒药和退烧药可以一起服用吗？',
        answer: '一般情况下，感冒药中已经含有退烧成分，不建议同时服用额外的退烧药，以免重复用药...'
    },
    {
        question: '服药期间需要注意什么？',
        answer: '服药期间应注意用药时间、剂量，避免饮酒，保持充足休息，如有不适及时就医...'
    },
    // 可以添加更多问题
])

// 在线咨询表单
const consultForm = ref({
    name: '',
    age: '',
    symptoms: '',
    currentMedications: '',
    question: ''
})

// 提交咨询
const submitConsultation = () => {
    console.log('提交咨询:', consultForm.value)
}
</script>

<template>
    <div class="medication-page">
        <!-- 页面标题 -->
        <div class="page-header">
            <div class="header-content">
                <h2>用药咨询</h2>
                <p>专业药师在线解答，安全用药指导</p>
            </div>
        </div>

        <!-- 主要内容区域 -->
        <div class="main-content">
            <!-- 快速分类 -->
            <div class="categories-section">
                <el-row :gutter="20">
                    <el-col :span="4" v-for="category in categories" :key="category.id">
                        <div class="category-card">
                            <el-icon :size="32">
                                <component :is="category.icon" />
                            </el-icon>
                            <span>{{ category.name }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <!-- 搜索和咨询区域 -->
            <div class="consultation-section">
                <el-row :gutter="20">
                    <!-- 左侧：常见问题 -->
                    <el-col :span="16">
                        <div class="faq-section">
                            <h3>常见用药问题</h3>
                            <el-collapse>
                                <el-collapse-item v-for="(faq, index) in faqs" :key="index" :title="faq.question">
                                    <p>{{ faq.answer }}</p>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-col>

                    <!-- 右侧：在线咨询 -->
                    <el-col :span="8">
                        <div class="consultation-form">
                            <h3>在线咨询</h3>
                            <el-form :model="consultForm" label-width="80px">
                                <el-form-item label="姓名">
                                    <el-input v-model="consultForm.name" />
                                </el-form-item>
                                <el-form-item label="年龄">
                                    <el-input v-model="consultForm.age" type="number" />
                                </el-form-item>
                                <el-form-item label="症状描述">
                                    <el-input v-model="consultForm.symptoms" type="textarea" :rows="3" />
                                </el-form-item>
                                <el-form-item label="当前用药">
                                    <el-input v-model="consultForm.currentMedications" type="textarea" :rows="2" />
                                </el-form-item>
                                <el-form-item label="咨询问题">
                                    <el-input v-model="consultForm.question" type="textarea" :rows="3" />
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitConsultation">提交咨询</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.medication-page {
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

.categories-section {
    margin-bottom: 2rem;

    .category-card {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        text-align: center;
        transition: all 0.3s ease;
        cursor: pointer;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .el-icon {
            color: var(--primary-color);
            margin-bottom: 0.8rem;
        }

        span {
            display: block;
            color: #2c3e50;
            font-size: 0.9rem;
        }
    }
}

.consultation-section {
    .faq-section {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

        h3 {
            margin: 0 0 1.5rem 0;
            color: #2c3e50;
        }
    }

    .consultation-form {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

        h3 {
            margin: 0 0 1.5rem 0;
            color: #2c3e50;
        }
    }
}
</style> 