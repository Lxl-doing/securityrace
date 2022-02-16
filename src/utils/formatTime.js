// 传入对象，返回格式化对象

function format(num) {
    num = "" + num;
    num = num.length == 1 ? "0" + num : num;
    return num;
}

export default function formatTime({ hour, minu, seco }) {
    const obj = {
        hour: format(hour),
        minu: format(minu),
        seco: format(seco),
    }
    return obj;
}

export function formatTime2({ minu, seco }) {
    const obj = {
        minu: format(minu),
        seco: format(seco),
    }
    return obj;
}