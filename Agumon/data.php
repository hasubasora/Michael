<?php
header("content-type:text/html;charset=utf-8");
// 只做分页效果
$link = mysql_connect('localhost','root','root');
// 数据库名字
mysql_select_db('kongkong',$link);
mysql_query('set names utf8');

$sql ="select * from sw_goods";
$qry mysql_query($sql);

while ($rst = mysql_fetch_assoc($qry)) {
	print_r($rst);
	echo "<br>";
}