#!/bin/bash
# ============================================
# GitHub 一键推送脚本
# 仓库: laomat/pharma-report
# ============================================
#
# 使用方法:
#   1. 下载 pharma-report.zip 并解压
#   2. 在 GitHub 上创建空仓库 pharma-report (不要勾选 README/.gitignore)
#      地址: https://github.com/new
#      仓库名填: pharma-report
#      不要勾选任何初始化选项，直接点 Create repository
#   3. 创建 Personal Access Token:
#      GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
#      点 Generate new token → 勾选 "repo" 权限 → 生成
#      复制 token (格式如 ghp_xxxxxxxxxxxx)
#   4. 打开终端，cd 到解压后的目录，运行:
#      bash push-to-github.sh
#   5. 提示输入时粘贴你的 Token
#
# ============================================

set -e

echo "=========================================="
echo "  推送创新药报告到 GitHub"
echo "  仓库: laomat/pharma-report"
echo "=========================================="
echo ""

# 检查是否在 git 仓库中
if [ ! -d ".git" ]; then
    echo "初始化 Git 仓库..."
    git init
    git branch -M main
fi

# 配置用户信息
git config user.name "laomat"
git config user.email "laomat@users.noreply.github.com"

# 添加所有文件
git add -A

# 提交
if git diff --cached --quiet; then
    echo "没有新的更改需要提交。"
else
    git commit -m "创新药板块大反转走势节奏预判报告 - AI量化时代周期加速分析

- 基于2015-2025十年牛熊周期的历史规律分析
- 四重拐点共振: 政策/出海/业绩/估值
- 新增AI量化时代周期加速效应分析
- 4张ECharts数据可视化图表
- 数据截止: 2026-07-15"
fi

# 设置远程仓库
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/laomat/pharma-report.git

echo ""
echo "请输入你的 GitHub Personal Access Token (输入时不会显示):"
read -s TOKEN

# 用 token 推送
git remote set-url origin https://laomat:${TOKEN}@github.com/laomat/pharma-report.git

echo ""
echo "正在推送到 GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "  推送成功!"
    echo "  仓库地址: https://github.com/laomat/pharma-report"
    echo "=========================================="
else
    echo ""
    echo "推送失败，请检查:"
    echo "1. 是否已在 GitHub 创建 pharma-report 空仓库"
    echo "2. Token 是否有 repo 权限"
    echo "3. Token 是否正确"
fi

# 清理 token 痕迹
git remote set-url origin https://github.com/laomat/pharma-report.git
