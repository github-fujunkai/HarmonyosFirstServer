const express = require('express');
const { ok } = require('../lib/respond');

function createHomeRouter() {
  const router = express.Router();

  router.get('/home', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    ok(res, [
      {
        img: `${baseUrl}/assets/account.png`,
        title: '《从百草园到三味书屋》',
        desc:
          '不必说碧绿的菜畦，光滑的石井栏，高大的皂荚树，紫红的桑椹；也不必说鸣蝉在树叶里长吟，肥胖的黄蜂伏在菜花上，轻捷的叫天子（云雀）忽然从草间直窜向云霄里去了。单是周围的短短的泥墙根一带，就有无限趣味。油蛉在这里低唱，蟋蟀们在这里弹琴。翻开断砖来，有时会遇见蜈蚣；还有斑蝥，倘若用手指按住它的脊梁，便会拍的一声，从后窍喷出一阵烟雾。何首乌藤和木莲藤缠络着，木莲有莲房一般的果实，何首乌有拥肿的根。有人说，何首乌根是有像人形的，吃了便可以成仙，我于是常常拔它起来，牵连不断地拔起来，也曾因此弄坏了泥墙，却从来没有见过有一块根像人样。如果不怕刺，还可以摘到覆盆子，像小珊瑚珠攒成的小球，又酸又甜，色味都比桑椹要好得远。',
        icon: `${baseUrl}/assets/right_grey.png`
      },
      {
        img: `${baseUrl}/assets/account.png`,
        title: '《藤野先生》',
        desc:
          '东京也无非是这样。上野的樱花烂熳的时节，望去确也像绯红的轻云，但花下也缺不了成群结队的 “清国留学生” 的速成班，头顶上盘着大辫子，顶得学生制帽的顶上高高耸起，形成一座富士山。也有解散辫子，盘得平的，除下帽来，油光可鉴，宛如小姑娘的发髻一般，还要将脖子扭几扭。实在标致极了。',
        icon: `${baseUrl}/assets/right_grey.png`
      },
      {
        img: `${baseUrl}/assets/news.png`,
        title: '项目动态',
        desc: '新增评论、点赞、通知、分类/标签等接口，方便你在前端做更真实的列表/详情/互动功能。',
        icon: `${baseUrl}/assets/right_grey.png`
      }
    ]);
  });

  return router;
}

module.exports = { createHomeRouter };
