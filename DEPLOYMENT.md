# 部署到 Vercel 的步骤

## 方法一：通过 Vercel 网页部署（推荐，最简单）

### 1. 将代码推送到 GitHub

```bash
# 初始化 Git 仓库
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: 在线辩论平台"

# 创建 GitHub 仓库后，添加远程地址
git remote add origin https://github.com/你的用户名/debate-platform.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 2. 在 Vercel 上部署

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录（或注册）
3. 点击 "Add New Project"
4. 选择你的 GitHub 仓库 `debate-platform`
5. 点击 "Deploy"
6. 等待 1-2 分钟，部署完成！

### 3. 获取域名

部署完成后，Vercel 会给你一个免费域名，例如：
- `https://debate-platform.vercel.app`

---

## 方法二：通过 Vercel CLI 部署

### 1. 安装 Vercel CLI
```bash
E:\Node.js\npm install -g vercel
```

### 2. 登录 Vercel
```bash
E:\Node.js\npx vercel login
```
会打开浏览器，让你登录或注册 Vercel 账号

### 3. 部署
```bash
# 先构建
E:\Node.js\npm run build

# 部署到生产环境
E:\Node.js\npx vercel --prod
```

---

## 部署后的配置

### 绑定自己的域名（可选）

1. 在 Vercel 项目设置中
2. 点击 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS

### 自动部署

将代码推送到 GitHub 后，Vercel 会自动部署，每次推送都会更新网站。

---

## 常见问题

### Q: 部署失败怎么办？
A: 检查 `package.json` 中的构建命令是否正确，应该是 `vite build`

### Q: 如何更新网站？
A: 只需将代码推送到 GitHub，Vercel 会自动部署

### Q: 可以删除部署吗？
A: 可以，在 Vercel 控制台中可以删除项目

---

## 推荐流程

1. 先在 GitHub 上创建仓库
2. 将代码推送到 GitHub
3. 在 Vercel 网页上连接 GitHub 仓库
4. 一键部署

这样最简单，不需要配置任何东西！
