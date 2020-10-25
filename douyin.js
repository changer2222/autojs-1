/**
 * 抖音-所有金币任务
 */
var clicks = require('function-clicks.js');
var others = require('function-others.js');
var sleeps = require('function-sleeps.js');
var swipes = require('function-swipes.js');
const PACKAGE_NAME = 'com.ss.android.ugc.aweme.lite';

for (var i = 0; i < 3; i++) {
    main();
}

function main() {
    status = others.launch(PACKAGE_NAME);
    if (!status) {
        return false;
    }

    others.back();

    // 任务界面
    if (clicks.elementWidthHeight(className('android.widget.FrameLayout'), 276, 309)) {
        return false;
    }

    status0 = taskCheckin();
    // status00 = taskCashout();
    status1 = taskTreasureBox();
    status2 = taskLimit();
    status3 = taskSleep();

    if (status0 && status1 && status2 && status3) {
        others.exit();
    }
}

/**
 * 任务-签到
 */
function taskCheckin() {
    log('---------- taskCheckin start ----------');

    if (text('明日签到').exists()) {
        return true;
    }

    if (!clicks.centerXyByText('签到')) {
        return false;
    }

    if (text('明日签到').exists()) {
        return true;
    }

    log('---------- taskCheckin end ----------');

    return false;
}

/**
 * 任务-提现
 */
function taskCashout() {
    log('---------- taskCashout start ----------');

    if (!clicks.centerXyByText('去提现')) {
        return false;
    }

    if (!clicks.centerXyByText('每天可提')) {
        return false;
    }

    if (!clicks.centerXyByText('立即提现')) {
        return false;
    }

    others.back2();

    log('---------- taskCashout end ----------');

    return true;
}

// 任务-宝箱
// every 20m
function taskTreasureBox() {
    log('---------- taskTreasureBox start ----------');

    if (!clicks.centerXyByText('开宝箱得金币')) {
        return false;
    }

    if (!clicks.centerXyByText('看广告视频再赚')) {
        return false;
    }

    closeAd();

    log('---------- taskTreasureBox end ----------');

    return true;
}

// 任务-限时
// every 20m
function taskLimit() {
    log('---------- taskLimit start ----------');

    if (text('限时任务赚金币').findOne().parent().parent().findOne(text('已领取')) != null) {
        return true;
    }

    if (!clicks.centerXyByText('限时任务赚金币')) {
        return false;
    }

    closeAd();

    log('---------- taskLimit end ----------');

    return true;
}

// 任务-睡觉赚钱
function taskSleep() {
    log('---------- taskSleep start ----------');

    if (!clicks.centerXyByText('睡觉赚金币')) {
        return false;
    }

    if (clicks.centerXyByText('我睡醒了')) {
        if (clicks.centerXyByText('可领取')) {
            others.back();
            return true;
        }
    } else if (clicks.centerXyByText('我要睡了')) {
        others.back();
        return true;
    }

    log('---------- taskSleep end ----------');

    return false;
}

function closeAd() {
    clicks.xy(48, 162);
    sleeps.s35to40();

    if (!clicks.centerXyByText('关闭广告')) {
        others.back();
   
        return false;
    }

    return true;
}