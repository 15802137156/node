-- 通过 * 查询users所有数据
select * from users


-- 通过 指定字段 查询users所有数据
-- select username, password from users


-- 向users表中插入数据
-- insert into users (id, username, password) values (3, 'tony', 098123)


-- 更新(单个更新)
-- update users set password = '888888' where id = 4

-- 更新(多个更新)
-- update users set password = 'admin123', status = 1 where id = 2


-- 删除
-- delete from users where id = 4

-- count 统计数量
-- select count(*) from users where status = 1

-- 使用AS关键字给列起别名
-- select count(*) as total from users where status = 0

-- select username as name, password as upwd from users


-- desc:降序，默认升序:asc
-- select * from users order by status desc
-- select * from users order by status desc, username


-- where用法
-- select * from users where status = 1
-- select * from users where id >= 2
-- select * from users where username != 'zs'
-- select * from users where status = 0 and id < 3
-- select * from users where status = 1 or username = 'zs'
