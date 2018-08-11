# cydgsx-sign-in
闯越自动签到

	npm install superagent
	npm install later
	npm install mysql
## node后台运行
	npm install forever -g
	forever start app.js


#
	CREATE TABLE `user` (
	  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
	  `user_name` varchar(255) NOT NULL,
	  `user_pwd` varchar(255) NOT NULL,
	  PRIMARY KEY (`id`),
	  UNIQUE KEY `user_name` (`user_name`)
	) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;