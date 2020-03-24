export default {
    // 用于判断一个对象的类型
    getTypes: function (instance) {
        return Object.prototype.toString.call(instance).slice(8, -1);
    }
}
