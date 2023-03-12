/**
 * 
 * @param {*} now 
 * @returns 
 */
function formateTime(now) {
    // 获取当前日期和时间的各个部分
    const year = now.getFullYear();
    const month = now.getMonth() + 1;  // 月份从0开始，因此需要加1
    const day = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // 将日期和时间格式化为所需格式的字符串
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    return formattedDate + ' ' + formattedTime
}



module.exports = {
    formateTime
}