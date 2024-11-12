<script setup lang="ts">
import { ElCarousel, ElCarouselItem } from 'element-plus';
import { ref } from 'vue';

// 轮播图数据
const carouselItems = ref([
    {
        id: 1,
        image: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsArticle/20241105/2411051817175912.jpg',
        title: '探索清醒梦的奥秘',
        link: '/explore'
    },
    {
        id: 2,
        image: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsArticle/20241105/2411051817175912.jpg',
        title: '开启意识探索之旅',
        link: '/journey'
    },
    {
        id: 3,
        image: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsArticle/20241105/2411051817175912.jpg',
        title: '体验不一样的梦境',
        link: '/experience'
    }
])

// 新闻数据
const newsItems = ref([
    {
        id: 1,
        title: '最新研究发现：清醒梦有助于提高创造力',
        date: '2024-03-20',
        summary: '最新研究表明，经常体验清醒梦的人在创造力测试中表现更优异...',
        image: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg',
        link: '/news/1'
    },
    {
        id: 2,
        title: '清醒梦训练营即将开营',
        date: '2024-03-18',
        summary: '为期一个月的清醒梦训练营将于下月初开始，带你走进清醦梦的世界...',
        image: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg',
        link: '/news/2'
    },
    {
        id: 3,
        title: '新技术突破：AI辅助清醒梦诱导',
        date: '2024-03-15',
        summary: '我们最新开发的AI技术可以帮助用户更容易地进入清醒梦状态...',
        image: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg',
        link: '/news/3'
    },
    {
        id: 4,
        title: '清醒梦与心理健康：专家解读',
        date: '2024-03-14',
        summary: '著名心理学家深入分析清醒梦对心理健康的积极影响...',
        image: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg',
        link: '/news/4'
    },
    {
        id: 5,
        title: '2024年度清醒梦研究报告发布',
        date: '2024-03-12',
        summary: '最新研究报告揭示清醒梦领域的重要发现和未来趋势...',
        image: 'https://www.lzdxdyyy.com/UploadFile/T_2/CmsType/20230223/2302231830028678.jpg',
        link: '/news/5'
    },
    // 可以继续添加更多新闻...
])

// 修改导航数据，为子菜单添加图标
const navItems = ref([
    {
        icon: 'ChatLineRound',
        title: '健康咨询',
        description: '专业医师在线答疑',
        link: '/consultation',
        children: [
            {
                title: '疾病知识咨询',
                link: '/consultation/search',
                icon: 'FirstAidKit'  // 使用急救包图标
            },
            {
                title: '挂号咨询',
                link: '/consultation/register',
                icon: 'Calendar'  // 使用日历图标
            },
            {
                title: '家庭用药咨询',
                link: '/consultation/medication',
                icon: 'ChatDotSquare'  // 使用药品图标
            },
        ]
    },
    {
        icon: 'Calendar',
        title: '线下活动',
        description: '面对面交流互动',
        link: '',
        children: [
            {
                title: '近期活动展示',
                link: '/activities/recent',
                icon: 'Timer'  // 使用时钟图标
            },
            {
                title: '过往活动',
                link: '/activities/past',
                icon: 'Collection'  // 使用收藏图标
            },
        ]
    },
    {
        icon: 'Opportunity',
        title: '健康论坛',
        description: '分享经验与故事',
        link: '',
        children: [
            {
                title: '文献浏览',
                link: '/doc/literature',
                icon: 'Document'  // 使用文档图标
            },
            {
                title: '论坛畅言',
                link: '/doc/forum',
                icon: 'ChatDotRound'  // 使用聊天图标
            },
        ]
    },
    {
        icon: 'Present',
        title: '爱心捐赠',
        description: '传递温暖与希望',
        link: '/donation'
    }
])
</script>

<template>
    <main class="home">
        <!-- 轮播图部分 -->
        <el-carousel :height="'600px'" :interval="5000" arrow="always" indicator-position="outside" class="carousel">
            <el-carousel-item v-for="item in carouselItems" :key="item.id">
                <div class="carousel-item">
                    <img :src="item.image" :alt="item.title">
                    <div class="carousel-content">
                        <h2>{{ item.title }}</h2>
                        <el-button type="primary" size="large" @click="$router.push(item.link)">
                            了解更多
                        </el-button>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>

        <!-- 修改导航区域 -->
        <section class="nav-section">
            <div class="container">
                <div class="nav-grid">
                    <div v-for="item in navItems" :key="item.title" class="nav-item-wrapper">
                        <router-link :to="item.link" class="nav-item">
                            <el-icon class="nav-icon">
                                <component :is="item.icon" />
                            </el-icon>
                            <div class="nav-text">
                                <h3>{{ item.title }}</h3>
                                <p>{{ item.description }}</p>
                            </div>
                        </router-link>
                        <!-- 添加子菜单 -->
                        <div v-if="item.children" class="nav-submenu">
                            <router-link v-for="child in item.children" :key="child.title" :to="child.link"
                                class="submenu-item">
                                <el-icon class="submenu-icon">
                                    <component :is="child.icon" />
                                </el-icon>
                                <span>{{ child.title }}</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 新闻部分 -->
        <section class="news-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">最新动态</h2>
                </div>
                <div class="news-container">
                    <!-- 左侧新闻轮播 -->
                    <div class="news-carousel">
                        <el-carousel height="500px" :interval="4000" arrow="hover" indicator-position="none">
                            <el-carousel-item v-for="news in newsItems" :key="news.id">
                                <div class="featured-news">
                                    <img :src="news.image" :alt="news.title">
                                    <div class="featured-news-content">
                                        <div class="news-meta">
                                            <span class="news-tag">热门</span>
                                            <span class="featured-news-date">{{ news.date }}</span>
                                        </div>
                                        <h3>{{ news.title }}</h3>
                                        <p>{{ news.summary }}</p>
                                        <el-button class="read-more-btn" @click="$router.push(news.link)">
                                            阅读全文
                                            <el-icon class="el-icon--right">
                                                <ArrowRight />
                                            </el-icon>
                                        </el-button>
                                    </div>
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>

                    <!-- 右侧新闻列表 -->
                    <div class="news-list-container">
                        <el-scrollbar height="500px">
                            <div class="news-list">
                                <div v-for="news in newsItems" :key="news.id" class="news-list-item">
                                    <div class="news-list-content">
                                        <div class="news-list-header">
                                            <span class="news-date">{{ news.date }}</span>
                                            <h4>{{ news.title }}</h4>
                                        </div>
                                        <p>{{ news.summary }}</p>
                                        <div class="news-footer">
                                            <router-link :to="news.link" class="read-more">
                                                阅读全文
                                                <el-icon>
                                                    <ArrowRight />
                                                </el-icon>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<style scoped>
.home {
    width: 100%;
}

/* 轮播图样式 */
.carousel {
    width: 100%;
}

.carousel-item {
    width: 100%;
    height: 100%;
    position: relative;
}

.carousel-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.carousel-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 1;
}

.carousel-content h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* 自定义 Element Plus 轮播图样式 */
:deep(.el-carousel__arrow) {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    width: 44px;
    height: 44px;
}

:deep(.el-carousel__arrow:hover) {
    background-color: rgba(0, 0, 0, 0.5);
}

:deep(.el-carousel__indicators--outside) {
    margin-top: 1rem;
}

:deep(.el-carousel__button) {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
}

:deep(.el-carousel__indicator.is-active .el-carousel__button) {
    background-color: var(--primary-color);
}

/* 新闻部分样式更新 */
.news-container {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 2.5rem;
    margin-top: 1rem;
}

.news-carousel {
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.featured-news {
    position: relative;
    height: 100%;
    overflow: hidden;
}

.featured-news img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.featured-news:hover img {
    transform: scale(1.05);
}

.featured-news-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 3rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.7) 50%, transparent);
    color: white;
}

.news-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.news-tag {
    background: var(--primary-color);
    color: white;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
}

.featured-news-date {
    font-size: 0.9rem;
    opacity: 1;
}

.featured-news-content h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0.8rem 0;
    line-height: 1.4;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.featured-news-content p {
    margin: 1rem 0 1.5rem;
    opacity: 1;
    line-height: 1.6;
    font-size: 1.1rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.read-more-btn {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.read-more-btn:hover {
    transform: translateY(-2px);
    background: var(--primary-color-dark);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
}

.read-more-btn .el-icon--right {
    transition: transform 0.3s ease;
}

.read-more-btn:hover .el-icon--right {
    transform: translateX(3px);
}

.news-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.news-list-item {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.05);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
}

.news-list-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.news-list-content {
    padding: 1.5rem;
}

.news-list-header {
    margin-bottom: 1rem;
}

.news-date {
    color: var(--text-color-light);
    font-size: 0.9rem;
    display: block;
    margin-bottom: 0.5rem;
}

.news-list-header h4 {
    font-size: 1.2rem;
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
    line-height: 1.4;
}

.news-list p {
    color: #5c6b7a;
    line-height: 1.6;
    margin: 0.8rem 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.news-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
}

.read-more:hover {
    gap: 0.8rem;
}

@media (max-width: 1024px) {
    .news-container {
        grid-template-columns: 1fr;
    }

    .news-carousel {
        margin-bottom: 2rem;
    }

    .featured-news-content {
        padding: 2rem;
    }
}

/* 修改导航样式 */
.nav-section {
    padding: 3rem 0;
    background: linear-gradient(to bottom, #fff, #f8f9fa);
    margin-top: -2rem;
}

.news-section {
    margin: 0 auto;
    max-width: 1200px;
}

.nav-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.nav-item-wrapper {
    position: relative;
}

.nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2.5rem 1.5rem;
    background: white;
    border-radius: 20px;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    text-decoration: none;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.nav-icon {
    font-size: 2.2rem;
    color: #4a90e2;
    margin-bottom: 1.5rem;
    background: rgba(74, 144, 226, 0.08);
    padding: 1.2rem;
    border-radius: 16px;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    position: relative;
    z-index: 1;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* 图标悬停效果 */
.nav-item:hover .nav-icon {
    transform: scale(1.15) rotate(8deg);
    background: linear-gradient(135deg, #4a90e2, #357abd);
    color: white;
    box-shadow: 0 10px 20px rgba(74, 144, 226, 0.2);
}

/* 添加图标动画效果 */
.nav-icon::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #4a90e2, #357abd);
    opacity: 0;
    border-radius: inherit;
    transition: opacity 0.4s ease;
    z-index: -1;
}

.nav-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(74, 144, 226, 0.15);
    border-color: rgba(74, 144, 226, 0.2);
}

.nav-text h3 {
    font-size: 1.4rem;
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 0.8rem;
    transition: color 0.3s ease;
}

.nav-text p {
    font-size: 0.95rem;
    color: #5c6b7a;
    line-height: 1.6;
    margin: 0;
}

.nav-submenu {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: white;
    border-radius: 16px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    padding: 0.8rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    min-width: 220px;
    /* 稍微增加宽度以适应图标 */
    z-index: 100;
    border: 1px solid rgba(74, 144, 226, 0.1);
}

.nav-item-wrapper:hover .nav-submenu {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
}

.submenu-item {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.2rem;
    color: #2c3e50;
    text-decoration: none;
    transition: all 0.3s ease;
    border-radius: 8px;
    font-size: 0.95rem;
    margin: 0.2rem 0;
    position: relative;
    overflow: hidden;
}

.submenu-icon {
    font-size: 1.2rem;
    margin-right: 0.8rem;
    color: #5c6b7a;
    transition: all 0.3s ease;
}

.submenu-item:hover {
    background: rgba(74, 144, 226, 0.08);
    color: #4a90e2;
    transform: translateX(5px);
}

.submenu-item:hover .submenu-icon {
    color: #4a90e2;
    transform: scale(1.1);
}

/* 子菜单容器样式优化 */
.nav-submenu {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    background: white;
    border-radius: 16px;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
    padding: 0.8rem;
    opacity: 0;
    visibility: hidden;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    min-width: 220px;
    /* 稍微增加宽度以适应图标 */
    z-index: 100;
    border: 1px solid rgba(74, 144, 226, 0.1);
}

/* 响应式调整 */
@media (max-width: 640px) {
    .submenu-item {
        padding: 0.6rem 1rem;
    }

    .submenu-icon {
        font-size: 1.1rem;
        margin-right: 0.6rem;
    }
}
</style>