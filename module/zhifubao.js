/**
 * 支付宝-任务
 */
var clicks = require('../function/clicks.js');
var exists = require('../function/exists.js');
var others = require('../function/others.js');
var sleeps = require('../function/sleeps.js');
var swipes = require('../function/swipes.js');

var s = {};
s.PACKAGE_NAME = 'com.eg.android.AlipayGphone';

/**
 * 任务-签到
 */
function taskCheckin() {
    log('----------', s.PACKAGE_NAME, 'taskCheckin start ----------');

    if (text('Later').exists()) {
        clicks.centerXyByText('Later');
    }

    if (!others.backToElement(text('Me'))) {
        return false;
    }

    if (text('Membership').exists() && !clicks.centerXyByText('Membership')) {
        return false;
    } else if (text('支付宝会员').exists() && !clicks.centerXyByText('支付宝会员')) {
        return false;
    }

    if (!text('每日赚积分').exists() || !clicks.centerXyByText('每日赚积分')) {
        return false;
    }

    if (!text('签到领积分').exists()) {
        return true;
    }

    if (text('签到领积分').exists() && !clicks.centerXyByText('签到领积分')) {
        return false;
    }

    if (!text('签到领积分').exists()) {
        return true;
    }

    return false;
}

/**
 * 任务-天天抽奖
 */
function taskEverydayLottery() {
    log('----------', s.PACKAGE_NAME, 'taskEverydayLottery start ----------');

    if (!others.backToElement(text('Home'))) {
        return false;
    }

    for (var i = 0; i < 5; i++) {
        if (!clicks.centerXyByText('天天抽奖-每日领免费福利')) {
            return false;
        }

        if (!clicks.centerXyByText('0元抽奖')) {
            return false;
        }

        if (text('去领卡').exists()) {
            return true;
        }

        if (text('去逛逛').exists() && clicks.centerXyByText('去逛逛')) {
            others.back();
        }

        if (clicks.centerXyByText('参与抽奖')) {
            others.back2();
        }
    }

    return false;
}

/**
 * 任务-0元抽奖
 */
function task0Lottery() {
    log('----------', s.PACKAGE_NAME, 'task0Lottery start ----------');

    if (!others.backToElement(text('Home'))) {
        return false;
    }

    if (!clicks.centerXyByText("Yu'E Bao")) {
        return false;
    }
    others.back();

    if (!clicks.centerXyByText("Yu'E Bao")) {
        return false;
    }

    if (!clicks.centerXyByText('一分惊喜')) {
        return false;
    }
    others.back();

    for (var i = 0; i < 5; i++) {
        clicks.centerXyByText('一分惊喜');

        if (clicks.centerXyByText('0元抽奖')) {
            if (clicks.centerXyByText('今日抽奖机会已用完')) {
                return true;
            }

            clicks.centerXyByText('暂不进店');
        }

        if (clicks.centerXyByText('0元抽奖')) {
            clicks.centerXyByText('关注');
            others.back();
        }
    }

    return false;
}

/**
 * 入口-开始调用
 * @returns {boolean}
 */
s.start = function () {
    for (var i = 0; i < 10; i++) {
        others.launch(s.PACKAGE_NAME);

        status1 = task0Lottery();
        status2 = taskEverydayLottery();
        status0 = taskCheckin();

        if (status0 && status1 && status2) {
            return true;
        }

        others.clear();
    }

    others.send(s.PACKAGE_NAME);

    return false;
};

module.exports = s;
