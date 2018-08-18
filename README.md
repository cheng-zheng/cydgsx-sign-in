# cydgsx-sign-in
####闯越自动签到

- 首先要懂 node,linux,sql
- linux安装依赖包
-
	
	npm install superagent
	npm install later
	npm install mysql
	npm install forever -g

## node后台运行
	
	forever start app.js


#
	CREATE TABLE `user` (
	  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	  `user_name` varchar(255) NOT NULL,
	  `user_pwd` varchar(255) NOT NULL,
	  `is_content` int(1) DEFAULT '0' COMMENT '是否自动写内容',
	  `content` text COLLATE utf8mb4_unicode_ci,
	  PRIMARY KEY (`id`),
	  UNIQUE KEY `user_name` (`user_name`)
	) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;