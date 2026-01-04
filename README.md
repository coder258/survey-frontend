# Survey Frontend

现代化问卷生成低码平台，支持多种类型的问卷组件和复杂交互。

## 🚀 特性

- **多类型问卷组件支持**：单选、多选、文本输入、评分、上传（大文件/图片）、段落等
- **拖拽排序**：使用 DnD Kit 实现编辑页组件拖拽排序
- **撤销重做**：基于 Redux Toolkit + Immer 的自定义撤销重做功能
- **大文件上传**：5MB 分块上传 + Web Workers 并行处理 + MD5 校验
- **组件化设计**：清晰的项目结构管理，所有问卷组件独立封装，支持 Storybook 文档化
- **现代工具链**：TypeScript + React 18 + Ant Design + Craco + Husky + ESLint/Prettier

## 📦 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | React 18 |
| 状态管理 | Redux Toolkit + Immer |
| UI 组件库 | Ant Design 5.x |
| 构建工具 | Craco (CRA 扩展) |
| 代码质量 | ESLint + Prettier |
| Git 钩子 | Husky + Commitlint |
| 测试 | Jest + Testing Library |
| 文档 | Storybook |

## 📁 项目结构

```
survey-frontend/
├── src/
│   ├── components/              # 所有组件
│   │   └── QuestionComponents/  # 问卷组件（单选、多选、文件上传等）
│   ├── store/                   # Redux 状态管理
│   │   ├── utils/               # 工具函数（undoable）
│   ├── pages/                   # 页面路由
│   ├── hooks/                   # 自定义 Hook
│   ├── stories/                 # Storybook 组件文档
│   └── App.tsx                  # 主应用入口
├── public/                      # 静态资源
├── .eslintrc.js                 # ESLint 配置
├── .prettierrc.js               # Prettier 配置
├── craco.config.js              # CRA 扩展配置
└── package.json                 # 依赖与脚本
```

## 🛠️ 快速开始

```bash
# 克隆项目
git clone https://github.com/coder258/survey-frontend.git

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build:prod

# 运行测试
npm test

# 启动 Storybook
npm run storybook
```

## 🔧 扩展指南

### 1. 添加新问卷组件
1. 在 `src/components/QuestionComponents/` 下创建新组件目录
2. 创建 `Component.tsx`、`index.ts`、`interface.ts`、`Component.test.tsx`、`PropsComponent.tsx`
3. 注册到 `src/components/QuestionComponents/index.ts`

### 3. 大文件上传
- 支持分块大小：5MB
- 使用 Web Workers 并行处理
- 提供 `cutFile` 工具函数和 `createChunk` 异步生成分块

## 📊 测试策略

- **单元测试**：每个组件都有独立的 `.test.tsx` 文件
- **集成测试**：验证组件间状态传递和交互
- **端到端测试**：通过 Cypress 覆盖完整流程

---