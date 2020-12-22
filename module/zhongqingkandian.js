/**
 * 中青看点-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'cn.youth.news';

// 任务-限时
// every 20m
function taskLimit() {
    log('----------', s.PACKAGE_NAME, 'taskLimit start ----------');

    clicks.textIfExists('我知道了');
    sleeps.s10();

    others.back();

    text('我的').exists() && clicks.xy(850, 150);
    others.back();
    text('我的').exists() && clicks.xy(850, 150);
    others.back();
    if (!text('我的').exists()) {
        closeAd();
    }

    return true;
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (textStartsWith('明日签到').exists()) {
        return true;
    }

    clicks.xy(135, 720);
    clicks.element(textStartsWith('看视频翻'));

    if (textStartsWith('明日签到').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('----------', s.PACKAGE_NAME, 'taskCashout start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }

    if (!clicks.centerXyByText('0.1元天天提')) {
        return false;
    }

    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

    if (text('提现成功').exists() || text('我知道了').exists() || text('马上去赚钱').exists()) {
        others.back2();
        return true;
    }

    return false;
}

// 任务-看新闻
function taskNews() {
    log('----------', s.PACKAGE_NAME, 'taskNews start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
        clicks.centerXyByText('开心收下');
    }

    if (text('幸运奖励').exists()) {
        clicks.centerXyByText('幸运奖励');
        others.back();
    }

    if (text('每日任务').exists() && !text('去阅读').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('去阅读')) {
        return false;
    }

    for (var i = 0; i < 10; i++) {
        if (!others.backToElement(text('刷新'))) {
            return false;
        }

        clicks.xy(608, 608);

        for (var j = 0; j < 5; j++) {
            sleeps.s2to3();
            swipes.down1000_100();
            sleeps.s2to3();
            swipes.refresh400_100();
        }
    }

    return true;
}

// 任务-Ad
function taskAd() {
    log('----------', s.PACKAGE_NAME, 'taskAd start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
        clicks.centerXyByText('开心收下');
    }

    if (text('看福利视频 (5 /5)').exists()) {
        return true
    }

    if (text('每日任务').exists() && !textStartsWith('看福利视频').exists()) {
        return true;
    }

    for (var i = 0; i < 5; i++) {
        if (clicks.parents(textStartsWith('看福利视频'), text('去完成'))) {
            closeAd();
        }
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
        clicks.centerXyByText('开心收下');
    }

    if (text('看福利视频 (5 /5)').exists()) {
        return true
    }

    if (text('每日任务').exists() && !textStartsWith('看福利视频').exists()) {
        return true;
    }

    return false;
}

// 任务-抽奖
function taskLottery() {
    log('----------', s.PACKAGE_NAME, 'taskLottery start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (!clicks.centerXyByText('抽奖赚')) {
        return false;
    }
    others.back();

    if (!clicks.centerXyByText('抽奖赚')) {
        return false;
    }

    for (var i = 0; i < 110; i++) {
        if (text('0').exists()) {
            return true
        }

        clicks.centerXyByText('抽奖赚');

        click(318, 822);
        back();
    }

    return false;
}

// 任务-抽奖ad
function taskLotteryAd() {
    log('----------', s.PACKAGE_NAME, 'taskLotteryAd start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (!clicks.centerXyByText('抽奖赚')) {
        return false;
    }

    if (!text('0').exists()) {
        return false
    }

    clicks.xy(220, 1850) && !text('天天抽奖').exists() && closeAd();
    if (exists.elementWidthHeight(className('android.widget.ImageView'), 135, 150)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 135, 150);
    }

    clicks.xy(440, 1850) && !text('天天抽奖').exists() && closeAd();
    if (exists.elementWidthHeight(className('android.widget.ImageView'), 135, 150)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 135, 150);
    }

    clicks.xy(660, 1850) && !text('天天抽奖').exists() && closeAd();
    if (exists.elementWidthHeight(className('android.widget.ImageView'), 135, 150)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 135, 150);
    }

    clicks.xy(880, 1850) && !text('天天抽奖').exists() && closeAd();
    if (exists.elementWidthHeight(className('android.widget.ImageView'), 135, 150)) {
        clicks.elementWidthHeight(className('android.widget.ImageView'), 135, 150);
    }

    return true;
}

// 任务-看看赚
function taskKankanzhuang() {
    log('----------', s.PACKAGE_NAME, 'taskKankanzhuang start ----------');

    if (!others.backToElement(text('任务'))) {
        return false;
    }

    if (!clicks.centerXyByText('看看赚')) {
        return false;
    }
    sleeps.s3();

    for (var i = 0; i < 30; i++) {
        if (!text('去完成').exists() && !text('进行中').exists()) {
            break;
        }

        text('去完成').exists() && clicks.centerXyByText('去完成');
        text('进行中').exists() && clicks.centerXyByText('进行中');
        sleeps.s3();

        if (text('看看赚').exists()) {
            break;
        }

        if (id('pop_close').exists()) {
            clicks.id('pop_close');
        } else if (exists.elementWidthHeight(className('android.view.View'), 90, 90)) {
            clicks.elementWidthHeight(className('android.view.View'), 90, 90);
        }

        randomClick = random();
        if (randomClick > 0.7) {
            clicks.xy(100, 400);
        } else if (randomClick > 0.3) {
            clicks.xy(100, 900);
        } else {
            clicks.xy(1000, 1400);
        }

        sleeps.s3();
        if (id('pop_close').exists()) {
            clicks.id('pop_close');
        } else if (exists.elementWidthHeight(className('android.view.View'), 90, 90)) {
            clicks.elementWidthHeight(className('android.view.View'), 90, 90);
        }

        clicks.textIfExists('展开全文');
        clicks.textIfExists('点击阅读全文');
        swipes.down();
        clicks.textIfExists('加载更多');
        sleeps.s10();
        !text('看看赚').exists() && others.back();
        !text('看看赚').exists() && others.back();
        !text('看看赚').exists() && others.back();
        !text('看看赚').exists() && others.back();
    }

    others.back3();

    if (!clicks.centerXyByText('看看赚')) {
        return false;
    }

    for (var i = 0; i < 3; i++) {
        if (!text('点击领取').exists()) {
            break;
        }

        clicks.text('点击领取');
        if (!text('看看赚').exists()) {
            closeAd();
        }
    }

    if (text('领奖励').exists()) {
        clicks.centerXyByText('领奖励');
        clicks.centerXyByText('开心收下');
    }

    return false;
}

/**
 * 关闭广告
 */
function closeAd() {
    sleeps.s20();

    for (var j = 0; j < 15; j++) {
        sleeps.s3();
        if (id('tt_video_ad_close_layout').exists()) {
            clicks.centerXyById('tt_video_ad_close_layout');
            return true;
        }
    }

    others.back2();

    return true;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 24; i++) {
        others.launch(s.PACKAGE_NAME);

        status4 = taskLimit();
        status0 = taskCheckin();
        taskNews();
        status1 = taskAd();
        status2 = taskLottery();
        taskLotteryAd();
        taskKankanzhuang();
        status3 = taskCashout();

        if (status0 && status1 && status2 && status3 && status4) {
            return true;
        }
    }

    others.send('zhongqingkandian');

    return false;
};

/**
 * 定时入口调用
 */
s.cron = function () {
    others.launch(s.PACKAGE_NAME);

    taskLimit();
};

module.exports = s;
