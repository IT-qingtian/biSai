-- 创建文献表
CREATE TABLE IF NOT EXISTS `literature` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '文献ID',
  `title` varchar(255) NOT NULL COMMENT '文献标题',
  `authors` varchar(500) NOT NULL COMMENT '作者列表',
  `journal` varchar(255) DEFAULT NULL COMMENT '期刊名称',
  `publish_date` date DEFAULT NULL COMMENT '发布日期',
  `doi` varchar(100) DEFAULT NULL COMMENT 'DOI号',
  `abstract` text DEFAULT NULL COMMENT '摘要',
  `keywords` varchar(500) DEFAULT NULL COMMENT '关键词',
  `citation_count` int(11) DEFAULT 0 COMMENT '被引用次数',
  `url` varchar(500) DEFAULT NULL COMMENT '文献链接',
  `pdf_url` varchar(500) DEFAULT NULL COMMENT 'PDF下载链接',
  `category` varchar(100) DEFAULT NULL COMMENT '分类',
  `language` varchar(50) DEFAULT 'zh-CN' COMMENT '语言',
  `is_open_access` tinyint(1) DEFAULT 0 COMMENT '是否开放获取',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_title` (`title`),
  KEY `idx_doi` (`doi`),
  KEY `idx_publish_date` (`publish_date`),
  KEY `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文献信息表';

-- 创建文献标签关联表
CREATE TABLE IF NOT EXISTS `literature_tag` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '关联ID',
  `literature_id` bigint(20) NOT NULL COMMENT '文献ID',
  `tag_name` varchar(50) NOT NULL COMMENT '标签名称',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_literature_id` (`literature_id`),
  KEY `idx_tag_name` (`tag_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='文献标签关联表';

-- 插入测试数据
INSERT INTO `literature` 
(`title`, `authors`, `journal`, `publish_date`, `doi`, `abstract`, `keywords`, `category`, `language`, `is_open_access`) 
VALUES 
(
  '睡眠质量与心理健康的关系研究',
  '张三, 李四, 王五',
  '中国心理卫生杂志',
  '2023-01-15',
  '10.1234/abcd.2023.01.001',
  '本研究探讨了睡眠质量对心理健康的影响...',
  '睡眠质量,心理健康,相关性研究',
  '心理健康',
  'zh-CN',
  1
),
(
  '基于机器学习的睡眠障碍预测模型',
  '赵六, 钱七',
  '中国行为医学科学',
  '2023-02-20',
  '10.1234/abcd.2023.02.002',
  '本文提出了一种基于机器学习的睡眠障碍预测模型...',
  '机器学习,睡眠障碍,预测模型',
  '睡眠医学',
  'zh-CN',
  1
);

-- 插入测试标签数据
INSERT INTO `literature_tag` 
(`literature_id`, `tag_name`) 
VALUES 
(1, '睡眠研究'),
(1, '心理健康'),
(2, '机器学习'),
(2, '睡眠医学'); 