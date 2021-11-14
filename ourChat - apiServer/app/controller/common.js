// app/controller/common.js
'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path')
class CommonController extends Controller {
    // 上传
    async upload() {
        const ctx = this.ctx;

        if (!ctx.request.files) {
            return ctx.apiFail('请先选择上传文件');
        }

        const file = ctx.request.files[0];
        // const name = 'egg-oss-demo/' + path.basename(file.filename);
        const name = 'egg-oss-demo/' + ctx.genID(10) + path.extname(file.filename);
        let result;
        try {
            result = await ctx.oss.put(name, file.filepath);
        } catch (err) {
            console.log('上传发生错误', err);
        } finally {
            await fs.unlink(file.filepath);
        }

        if (result) {
            return ctx.apiSuccess(result.url);
        }

        ctx.apiFail('上传失败');
    }
}

module.exports = CommonController;