# 黑茶和茉莉的生日纪念册

一个按年份扩展的猫咪生日主题网页项目。根页面是整体纪念册和年份时间轴，每个年份都有自己的主题目录。

## 目录结构

```text
.
├── index.html                  # GitHub Pages 首页，展示总封面和年份时间轴
├── years/
│   ├── index.json              # 年份索引，首页从这里读取年份卡片
│   └── 2026/
│       └── index.html          # 2026 年主题页
├── assets/
│   ├── css/base.css            # 全站视觉系统
│   ├── js/site.js              # 首页年份加载逻辑
│   └── demo/2026/              # 2026 年 demo 图片和视频
└── .github/workflows/pages.yml # GitHub Pages 自动部署
```

## 新增年份

1. 复制 `years/2026` 为新的年份目录，例如 `years/2027`。
2. 替换新目录里的文案、主题色或模块。
3. 把新年份的图片和视频放到 `assets/demo/2027`，也可以改成 `assets/media/2027`。
4. 在 `years/index.json` 增加一条年份记录，首页时间轴会自动显示。

## 替换 2026 素材

- 主题封面：`assets/demo/2026/cover-party.svg`
- 黑茶肖像：`assets/demo/2026/black-tea.svg`
- 茉莉肖像：`assets/demo/2026/jasmine.svg`
- 视频文件：`assets/demo/2026/birthday-demo.mp4`
- 视频封面：`assets/demo/2026/video-poster.svg`

保持同名文件替换时，不需要改 HTML。

## 本地预览

```bash
npm install
npm run dev
```

也可以直接打开 `index.html`，但用 Vite 预览时年份 JSON 加载更接近线上环境。

## 部署

仓库推送到 GitHub 后，`.github/workflows/pages.yml` 会通过 GitHub Actions 发布静态站。Pages 地址通常是：

```text
https://<github-user>.github.io/<repo-name>/
```

本项目仓库名默认使用 `cat-birthday-album`。
