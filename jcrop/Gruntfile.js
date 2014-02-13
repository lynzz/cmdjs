module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,

        download: {
            options: {
                dest: 'src'
            },
            jcrop: {
                options: {
                    transform: function(code) {
                        // 根据需要对下载下来的 js 代码进行修改, 大致有以下几点
                        // - 模块已有依赖的库, 如 jquery, 需要统一 require('$')
                        // - 如果模块有返回的话, 需要在末尾通过 module.exports 方式返回
                        // - 有些模块内部有判断 amd / cmd 的逻辑的话, 则无须包裹 define, 直接采用它的即可, 例如 jquery/jquery
                        return [
                            'define(function(require, exports, module) {',
                            'var previousJQuery = this.jQuery;',
                            "this.jQuery = require('$');",
                            code,
                            "});"
                        ].join('\n');
                    }
                },
                // 设置文件所在地址, 版本号替换成变量, 这样之后只需修改 package.json 的版本信息
                url: 'https://github.com/tapmodo/Jcrop/v<%= pkg.version%>/js/jquery.Jcrop.js',
                // 设置文件名字, 可参考原来源仓库中的名字来
                name: 'jcrop.js'
            }
        }
    });

    grunt.loadTasks('../_tasks/download/tasks');
    grunt.registerTask('default', ['download']);
};
