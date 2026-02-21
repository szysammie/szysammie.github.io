# 部署指南 (Deployment Guide)

## 1. 准备工作

您已经完成了本地开发，现在需要将项目部署到 GitHub。

## 2. GitHub 仓库设置

1.  登录 GitHub，创建一个新仓库，名称必须为 **`szysammie.github.io`**。
2.  不要勾选 "Initialize with README" 或其他初始化选项，创建一个空仓库。

## 3. 推送源代码

在本项目根目录下打开终端，运行以下命令将源代码推送到 GitHub：

```bash
# 添加远程仓库地址 (请确保使用 SSH 或 HTTPS)
git remote add origin https://github.com/szysammie/szysammie.github.io.git

# 推送源代码到 main 分支
git push -u origin main
```

## 4. 部署站点

源代码推送成功后，运行以下命令进行构建并部署到 GitHub Pages：

```bash
npm run deploy
```

这个命令会执行以下操作：
1.  `npm run build`: 构建 Vue 项目，生成 `dist` 目录。
2.  `gh-pages -d dist`: 将 `dist` 目录的内容推送到远程仓库的 `gh-pages` 分支。

## 5. GitHub Pages 配置

1.  打开 GitHub 仓库页面。
2.  点击 **Settings** (设置) -> **Pages** (页面)。
3.  在 **Build and deployment** (构建与部署) 下的 **Branch** (分支) 选项中：
    *   选择 **`gh-pages`** 分支。
    *   文件夹选择 **`/(root)`**。
    *   点击 **Save** (保存)。

## 6. 域名配置 (DNS)

您已经添加了 `CNAME` 文件（内容为 `sammie.vip`），GitHub 会自动识别。
您需要在您的域名服务商（阿里云、腾讯云等）处配置 DNS 解析：

| 记录类型 | 主机记录 | 记录值 |
| :--- | :--- | :--- |
| **CNAME** | **@** | **szysammie.github.io** |
| **CNAME** | **www** | **szysammie.github.io** |

等待 DNS 生效后（通常几分钟到几小时），访问 `http://sammie.vip` 即可看到您的个人主页！
