# 影院前线
项目预览 :[http://119.29.198.184/](http://119.29.198.184/)

### 支持PC和移动端，暂无响应式

## 简介：
利用NodeJS+MongoDB开发的一个电影网站，主要数据来源于豆瓣电影，其它数据为网络获取，UI参照各大门户视频网站。

### 1.后端搭建
	+ 使用Express框架对网站框架进行搭建
	+ 使用Mongodb数据库完成存储，并用Mongoose进行数据操作
	+ 使用jade模板来对前端页面进行渲染
### 2.前端搭建
	+ 前端UI参考于网上，PC端没有引入前端框架
	+ 移动端主要采用SUI框架完成搭建
	+ 项目通过ajax进行前后端的数据交互
### 3.项目功能 
	1 游客功能
	+ 分类获取电影
	+ 具体搜索电影
	2 用户功能
	+ 发表电影评论
	+ 回复评论及用户间的互相回复
	+ 电影收藏功能
	+ 头像上传
	+ 修改密码
	3 管理员功能
	+ 电影资源录入
	+ 电影资源更新与删除
### 4.本地环境搭建
	+使用gulp代替grunt，进行简单的文件压缩与合并，less文件编译，页面无刷新改变样式，以及使用mocha进行简单的单元测试