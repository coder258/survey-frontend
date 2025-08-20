# 路由设计

## 页面对应的路由

- 首页：`/`
- 登录页：`/login`
- 注册页：`/register`
- 问卷管理
    - 我的问卷 `/manage/list`
    - 星标问卷 `/manage/star`
    - 我的问卷 `/manage/trash`
- 问卷详情
    - 编辑问卷 `/question/edit/:id`
    - 我的问卷 `/question/stat/:id`
- 404

## Layout 模板

- MainLayout
- ManageLayout
- QuestionLayout

--------------------------------------------------------------------------------

# API 设计

## 用户功能

### 获取用户信息

- method：`GET`
- path: `/api/user/info`
- response: `{ errno: 0, data: { ... } }` 或 `{ errno: 10001, msg: 'xxx' }`

### 注册

- method：`POST`
- path: `/api/user/register`
- request body: `{ username, password, nickname }`
- response: `{ errno: 0 }`

### 登录

- method：`POST`
- path: `/api/user/login`
- request body: `{ username, password }`
- response: `{ errno: 0, data: token }` -- **使用JWT**获取token

## 问卷功能

### 获取问卷列表

- method：`GET`
- path: `/api/question`
- response: `{ errno: 0, data: [ ... ] }`

### 获取单个问卷

- method：`GET`
- path: `/api/question/:id`
- response: `{ errno: 0, data: { id, title, ... } }`

### 新建问卷

- method：`POST`
- path: `/api/question`
- request body: 无，点击按钮即创建
- response: `{ errno: 0, data: { id } }`

### 更新问卷信息

- method：`patch`
- path: `/api/question/:id`
- response: `{ errno: 0 }`

### 批量彻底删除问卷

- method：`DELETE`
- path: `/api/question`,
- request body: `{ ids: [ ... ] }`
- response: `{ errno: 0 }`

### 复制问卷

- method: `post`
- path: `/api/question/duplicate/:id`
- response: `{ errno: 0, data: { id } }`

## 小结

- 使用 Resful API 设计
- 使用 JWT 进行用户认证
- 统一返回格式：`{ errno, data, msg }`