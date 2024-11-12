<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
    <footer class="footer">
        <div class="footer-content">
            <div class="footer-sections">
                <div class="footer-section">
                    <h3>联系我们</h3>
                    <p>电话：0936-18189606574</p>
                    <p>邮箱：hibernationznuo@foxmail.com</p>
                    <p>地址：甘肃省兰州市皋兰县九龙江街1666号</p>
                    <p>工作时间：周一至周日 9:00-21:00</p>
                </div>
                <div class="footer-section">
                    <h3>关注我们</h3>
                    <p>微信公众号：QingMengGY</p>
                    <p>小红书：1140012560</p>
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

<style scoped lang="less">
.footer {
    background-color: var(--bg-white);
    padding: 4rem 0 2rem;
    width: 100%;
    min-width: 1080px;

    &-content {
        width: 1000px;
        margin: 0 auto;
        padding: 0 40px;
        box-sizing: border-box;
    }

    &-sections {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 4rem;
        margin-bottom: 3rem;
    }

    &-section {
        h3 {
            font-size: 1.2rem;
            margin-bottom: 1.5rem;
            color: var(--text-color);
            font-weight: 600;
        }

        p {
            color: var(--text-color);
            margin-bottom: 0.8rem;
            line-height: 1.6;
        }

        a {
            color: var(--text-color);
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
                opacity: 0.8;
            }
        }
    }

    &-bottom {
        width: 100%;
        text-align: center;
        padding-top: 2rem;
        border-top: 1px solid var(--border-color);

        p {
            color: var(--text-color);
            margin: 0.5rem 0;
        }

        a {
            color: var(--text-color);
            text-decoration: none;
            transition: color 0.3s ease;

            &:hover {
                color: var(--text-color);
            }
        }
    }
}
</style>