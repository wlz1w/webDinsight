# 在线辩论平台

一个基于 React + Vite 的在线人人匹配辩论网页应用。

## 功能特性

- 🏠 首页展示热门辩论房间
- 🎯 智能辩论匹配系统
- 💬 实时辩论房间
- 📱 响应式设计，支持移动端

## 技术栈

- React 18
- React Router
- Vite
- CSS3

## 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 构建

```bash
npm run build
```

## 部署

### Vercel（推荐）

```bash
npm install -g vercel
npm run build
vercel
```

### Netlify

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

1. 将代码推送到 GitHub
2. 在仓库设置中开启 Pages
3. 选择 main 分支部署

## 项目结构

```
src/
├── components/     # 组件
├── pages/         # 页面
├── data/          # 数据
├── App.jsx        # 主应用
└── main.jsx       # 入口文件
```

## License

MIT
