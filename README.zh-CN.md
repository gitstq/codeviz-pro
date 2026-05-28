# 🕸️ CodeViz Pro

[English](README.md) | **简体中文** | [繁體中文](README.zh-TW.md)

> 将任何代码库转换为可交互、可探索的知识图谱

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/gitstq/codeviz-pro)](https://github.com/gitstq/codeviz-pro/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/gitstq/codeviz-pro)](https://github.com/gitstq/codeviz-pro/network)

## 🎉 项目介绍

**CodeViz Pro** 是一款强大的浏览器端代码可视化工具，可以将任何代码库转换为交互式知识图谱。与传统需要复杂设置的代码分析工具不同，CodeViz Pro 完全在浏览器中运行，零依赖。

### 🌟 核心亮点

- **纯前端实现**：无需后端，完全在浏览器中运行
- **多种布局算法**：支持力导向、层次、圆形和网格布局
- **交互式编辑**：拖拽节点、缩放、平移，探索代码结构
- **GitHub 集成**：通过 GitHub API 直接分析公开仓库
- **导出选项**：将图谱保存为 PNG、SVG 或 JSON
- **多语言支持**：完整支持简体中文、繁体中文和英文

## ✨ 核心特性

### 🎨 可视化探索
- **交互式图谱**：点击、拖拽、缩放和平移浏览代码库
- **智能布局**：4 种不同的布局算法可选
- **节点高亮**：聚焦特定组件及其关系
- **搜索与过滤**：快速查找文件、函数或类

### 📊 布局算法
| 布局 | 描述 | 适用场景 |
|------|------|----------|
| **力导向** | 基于物理的力导向布局 | 通用探索 |
| **树形** | 层次树状结构 | 理解继承关系 |
| **圆形** | 环形排列 | 组件概览 |
| **网格** | 网格化组织 | 结构化对比 |

### 🔧 自定义设置
- **节点大小**：动态调整节点大小
- **连线距离**：控制节点间距
- **电荷强度**：修改排斥/吸引力
- **标签开关**：显示/隐藏节点标签
- **类型过滤**：按文件、函数、类或导入过滤

### 📥 导入选项
- **JSON 导入**：加载自定义图谱数据
- **GitHub URL**：直接分析公开仓库
- **示例数据**：试用内置示例

### 📤 导出选项
- **PNG 图片**：高分辨率栅格导出
- **SVG 矢量**：可缩放矢量图形
- **JSON 数据**：保存图谱结构供后续使用

## 🚀 快速开始

### 方案一：在线演示
访问 [https://gitstq.github.io/codeviz-pro](https://gitstq.github.io/codeviz-pro) 立即体验。

### 方案二：本地安装

```bash
# 克隆仓库
git clone https://github.com/gitstq/codeviz-pro.git

# 进入项目目录
cd codeviz-pro

# 启动本地服务器
npx serve . -p 3000

# 或直接在浏览器中打开 index.html
```

### 方案三：Docker

```bash
docker run -p 3000:80 gitstq/codeviz-pro
```

## 📖 使用指南

### 基础用法

1. **导入数据**
   - 点击"导入"按钮
   - 选择 JSON、GitHub URL 或示例数据

2. **探索图谱**
   - 点击节点查看详情
   - 拖拽重新排列
   - 滚动缩放
   - 右键平移

3. **自定义视图**
   - 使用侧边栏更改布局
   - 调整节点大小和间距设置
   - 按节点类型过滤

4. **导出结果**
   - 点击"导出"按钮
   - 选择 PNG、SVG 或 JSON 格式

### 键盘快捷键

| 快捷键 | 操作 |
|--------|------|
| `Ctrl/Cmd + O` | 打开导入对话框 |
| `Ctrl/Cmd + S` | 打开导出对话框 |
| `Ctrl/Cmd + F` | 聚焦搜索框 |
| `Ctrl/Cmd + 0` | 重置视图 |
| `Esc` | 关闭对话框 |

### GitHub 仓库分析

1. 点击"导入" → "GitHub URL"
2. 输入仓库地址（例如：`https://github.com/facebook/react`）
3. 点击"分析"
4. 探索生成的图谱

⚠️ **注意**：GitHub API 有速率限制。私有仓库需要身份验证。

## 💡 设计理念

### 为什么选择 CodeViz Pro？

现有的代码可视化工具通常需要：
- 复杂的安装和配置
- 后端服务器和数据库
- 命令行专业知识
- IDE 插件

CodeViz Pro 通过提供**零设置、浏览器优先**的解决方案消除了这些障碍，任何人都可以立即使用。

### 技术选型

- **D3.js**：数据可视化行业标准
- **原生 JavaScript**：无框架依赖
- **纯 CSS**：可定制且轻量
- **Font Awesome**：一致的图标设计

## 📦 部署

### GitHub Pages

1. Fork 本仓库
2. 进入 Settings → Pages
3. 选择 "Deploy from a branch"
4. 选择 `main` 分支和 `/ (root)` 文件夹
5. 您的网站将在 `https://yourusername.github.io/codeviz-pro` 上线

### Netlify

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod --dir=.
```

### Vercel

```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

## 🤝 贡献指南

我们欢迎贡献！请按以下步骤操作：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 发起 Pull Request

### 提交规范

我们遵循 [Angular 提交规范](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)：

- `feat:` 新功能
- `fix:` 错误修复
- `docs:` 文档更改
- `style:` 代码样式更改（格式化）
- `refactor:` 代码重构
- `test:` 测试更改
- `chore:` 构建过程或辅助工具更改

## 🗺️ 路线图

- [ ] **v1.1.0**：支持更多编程语言
- [ ] **v1.2.0**：实时协作功能
- [ ] **v1.3.0**：AI 驱动的代码分析
- [ ] **v1.4.0**：自定义主题和样式
- [ ] **v2.0.0**：可扩展的插件系统

## 📄 开源协议

本项目采用 MIT 协议 - 详情请参阅 [LICENSE](LICENSE) 文件。

## 🙏 致谢

- 灵感来源于 [Understand-Anything](https://github.com/Lum1104/Understand-Anything)
- 基于 [D3.js](https://d3js.org/) 构建
- 图标来自 [Font Awesome](https://fontawesome.com/)

## 📞 支持

- 🐛 [报告问题](https://github.com/gitstq/codeviz-pro/issues)
- 💡 [功能建议](https://github.com/gitstq/codeviz-pro/issues)
- 💬 [讨论区](https://github.com/gitstq/codeviz-pro/discussions)

---

<p align="center">
  用 ❤️ 为开发者社区打造
</p>
