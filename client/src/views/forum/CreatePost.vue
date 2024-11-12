<script setup lang="ts">
import { Document, Picture } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

interface PostForm {
    title: string
    content: string
    tags: string[]
    images: string[]
}

// 表单数据
const postForm = ref<PostForm>({
    title: '',
    content: '',
    tags: [],
    images: []
})

// 可选标签
const availableTags = [
    '经验分享',
    '技巧讨论',
    '心得体会',
    '问题求助',
    '学术研究',
    '案例分析'
]

// 输入的新标签
const newTag = ref('')

// 添加标签
const addTag = (tag: string) => {
    if (!tag) return
    if (postForm.value.tags.includes(tag)) {
        ElMessage.warning('该标签已存在')
        return
    }
    if (postForm.value.tags.length >= 5) {
        ElMessage.warning('最多添加5个标签')
        return
    }
    postForm.value.tags.push(tag)
    newTag.value = ''
}

// 移除标签
const removeTag = (tag: string) => {
    postForm.value.tags = postForm.value.tags.filter(t => t !== tag)
}

// 处理图片上传
const handleImageUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
        ElMessage.error('请上传图片文件')
        return false
    }

    if (file.size > 5 * 1024 * 1024) {
        ElMessage.error('图片大小不能超过5MB')
        return false
    }

    if (postForm.value.images.length >= 9) {
        ElMessage.warning('最多上传9张图片')
        return false
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
        postForm.value.images.push(reader.result as string)
    }
    return false
}

// 移除图片
const removeImage = (index: number) => {
    postForm.value.images.splice(index, 1)
}

// 预览图片
const previewImage = (url: string) => {
    window.open(url)
}

// 发布帖子
const publishPost = () => {
    if (!postForm.value.title.trim()) {
        ElMessage.warning('请输入标题')
        return
    }
    if (!postForm.value.content.trim()) {
        ElMessage.warning('请输入内容')
        return
    }

    // TODO: 调用API发布帖子
    console.log('发布帖子:', postForm.value)

    ElMessage.success('发布成功')
    router.push('/dom/forum')
}

// 取消发布
const cancelPublish = () => {
    router.back()
}
</script>

<template>
    <div class="create-post-page">
        <div class="page-header">
            <div class="header-content">
                <h2>发布帖子</h2>
                <p>分享您的经验和想法</p>
            </div>
        </div>

        <div class="post-container">
            <div class="post-form">
                <!-- 标题输入 -->
                <div class="form-item">
                    <el-input v-model="postForm.title" placeholder="请输入标题（5-50字）" maxlength="50" show-word-limit
                        :rows="2" type="text" class="title-input" />
                </div>

                <!-- 内容输入 -->
                <div class="form-item">
                    <el-input v-model="postForm.content" type="textarea" placeholder="请输入正文内容..." :rows="12"
                        maxlength="10000" show-word-limit resize="none" />
                </div>

                <!-- 标签选择 -->
                <div class="form-item">
                    <div class="section-title">
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>添加标签</span>
                    </div>
                    <div class="tags-container">
                        <div class="available-tags">
                            <el-tag v-for="tag in availableTags" :key="tag"
                                :class="{ active: postForm.tags.includes(tag) }" @click="addTag(tag)" class="tag-item">
                                {{ tag }}
                            </el-tag>
                        </div>
                        <div class="custom-tag">
                            <el-input v-model="newTag" placeholder="自定义标签" @keyup.enter="addTag(newTag)"
                                maxlength="10" />
                            <el-button @click="addTag(newTag)">添加</el-button>
                        </div>
                        <div class="selected-tags" v-if="postForm.tags.length">
                            <el-tag v-for="tag in postForm.tags" :key="tag" closable @close="removeTag(tag)">
                                {{ tag }}
                            </el-tag>
                        </div>
                    </div>
                </div>

                <!-- 图片上传 -->
                <div class="form-item">
                    <div class="section-title">
                        <el-icon>
                            <Picture />
                        </el-icon>
                        <span>添加图片</span>
                    </div>
                    <div class="images-container">
                        <el-upload :auto-upload="false" :show-file-list="false" accept="image/*"
                            :on-change="(file: any) => handleImageUpload(file.raw!)">
                            <el-button type="primary" plain>
                                <el-icon>
                                    <Picture />
                                </el-icon>
                                上传图片
                            </el-button>
                            <template #tip>
                                <div class="upload-tip">支持jpg、png格式，单张不超过5MB，最多9张</div>
                            </template>
                        </el-upload>
                        <div class="image-preview" v-if="postForm.images.length">
                            <div v-for="(image, index) in postForm.images" :key="index" class="image-item">
                                <img :src="image" @click="previewImage(image)">
                                <div class="image-actions">
                                    <el-button type="danger" circle size="small" @click="removeImage(index)">
                                        ×
                                    </el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 操作按钮 -->
                <div class="form-actions">
                    <el-button @click="cancelPublish">取消</el-button>
                    <el-button type="primary" @click="publishPost">发布</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.create-post-page {
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
        max-width: 900px;
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

.post-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2rem;
}

.post-form {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

    .form-item {
        margin-bottom: 2rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

.title-input {
    font-size: 1.2rem;

    :deep(.el-input__inner) {
        font-size: 1.2rem;
        padding: 0.8rem;
    }
}

.section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    color: #2c3e50;
    font-size: 1.1rem;

    .el-icon {
        color: #409eff;
    }
}

.tags-container {
    .available-tags {
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;

        .tag-item {
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-2px);
            }

            &.active {
                background-color: var(--el-color-primary);
                color: white;
                border-color: var(--el-color-primary);
            }
        }
    }

    .custom-tag {
        display: flex;
        gap: 1rem;
        margin-bottom: 1rem;

        .el-input {
            width: 200px;
        }
    }

    .selected-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 8px;
    }
}

.images-container {
    .upload-tip {
        color: #909399;
        font-size: 0.9rem;
        margin-top: 0.5rem;
    }

    .image-preview {
        margin-top: 1rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 1rem;

        .image-item {
            position: relative;
            aspect-ratio: 1;
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            &:hover {
                img {
                    transform: scale(1.05);
                }

                .image-actions {
                    opacity: 1;
                }
            }

            .image-actions {
                position: absolute;
                top: 0.5rem;
                right: 0.5rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
        }
    }
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #ebeef5;
}

@media (max-width: 768px) {
    .post-container {
        padding: 0 1rem;
    }

    .post-form {
        padding: 1rem;
    }

    .custom-tag {
        flex-direction: column;

        .el-input {
            width: 100% !important;
        }
    }
}
</style>