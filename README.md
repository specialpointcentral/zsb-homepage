# zsb-homepage

招生办微信查询网站 [goto>](https://zsb.spcsky.com/score.html)

## 项目目的

用于招生信息查询（分数、计划）、录取查询，同时集成通知书物流信息。

## 部署要求

运行环境建议：

- [x] PHP >= 5.3（推荐使用7.0以上）
- [x] Curl
- [ ] Opcache
- [ ] NGINX >= 1.13
- [ ] HTTP/2
- [ ] 优秀的云主机

~~以上除了`PHP`和打开`Curl`的要求外，其他都是扯淡~~（逃）
不过在现在这个时代，建议上HTTP/2（最低也要弄个HTTPS吧）

## 安装步骤

1. clone项目到指定环境
2. 配置虚拟主机，注意打开PHP的Curl
3. 修改相应的html中Ajax请求域
4. Over~

## 使用的框架和开源库

- bootstrap
- Jquery
- nprogress
- sweetalert2
- （以及部分代码来自[本部](http://zsb.hit.edu.cn/)网站的魔改）

## 数据来源

- [哈工大威海招生办](http://zsb.hitwh.edu.cn/)
- [快递100](http://www.kuaidi100.com/)

## 感谢

- 部分CDN由[jsdelivr](https://www.jsdelivr.com/)提供

## 隐私提示

- 使用Google Analytics，仅做数据分析，无其他用途。

## 许可

MIT

## BUG和功能汇报

如果您发现BUG或想加入其他功能，请在Issues部分汇报，谢谢。

同时也可fork和pull request实现更多功能