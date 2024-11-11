<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-sections">
                <div class="footer-section">
                    <h3>联系我们</h3>
                    <p>电话：400-xxx-xxxx</p>
                    <p>邮箱：contact@example.com</p>
                    <p>地址：某某市某某区某某街道</p>
                    <p>工作时间：周一至周五 9:00-18:00</p>
                </div>
                <div class="footer-section">
                    <h3>关注我们</h3>
                    <p>微信公众号：xxxxxx</p>
                    <p>微博：@xxxxxx</p>
                    <p>抖音号：xxxxxx</p>
                    <p>小红书：xxxxxx</p>
                </div>
                <div class="footer-section">
                    <h3>快速链接</h3>
                    <p><router-link to="/privacy">隐私政策</router-link></p>
                    <p><router-link to="/terms">服务条款</router-link></p>
                    <p><router-link to="/faq">常见问题</router-link></p>
                    <p><router-link to="/join">加入我们</router-link></p>


                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; {{ currentYear }} 青梦团队 版权所有</p>
                <p><img src="https://www.lzdxdyyy.com/view-resources/Areas/Web/Image/gongan.png" alt=""><a
                        href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">京ICP备xxxxxxxx号-1</a></p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    background-color: var(--bg-white);
    padding: 4rem 0 2rem;
    width: 100%;
    min-width: 1080px;
    /* margin-top: auto; */
}

.footer-content {
    width: 1000px;
    margin: 0 auto;
    padding: 0 40px;
    box-sizing: border-box;
}

.footer-sections {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
    margin-bottom: 3rem;
}

.footer-section h3 {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
    font-weight: 600;
}

.footer-section p {
    color: var(--text-color);
    margin-bottom: 0.8rem;
    line-height: 1.6;
}

.footer-bottom {
    width: 100%;
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
}

.footer-bottom p {
    color: var(--text-color);
    margin: 0.5rem 0;
}

.footer-bottom a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-bottom a:hover {
    color: var(--text-color);
}

.footer-section a {
    color: var(--text-color);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-section a:hover {
    opacity: 0.8;
}
</style>