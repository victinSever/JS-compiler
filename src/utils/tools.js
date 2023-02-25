
/**
 * 节流函数
 * @param {*} fn 
 * @param {*} time 
 * @returns 
 */
function throttle(fn, time = 500) {
    let _timer
    return function (...argus) {
        if(!_timer) {
            fn.apply(this, argus)
            _timer = setTimeout(() => _timer = null, time)
        }
    }
}

export {
    throttle
}