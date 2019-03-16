import './home.css'
import common from '../common/common.js'
export default class Index {
    constructor() {
        this.btn = $('.form-control')
    }
    init() {
        console.log("add组件对应的入口文件");
        xtag.create('x-add', class extends XTagElement {
            constructor(){
                super();
                console.log("初始化操作");
                this.datas = {
                    user:"laoyuan"
                }
            }
            '::template(true)' (){
                return `<form>
                <div class="form-group">
                  <label for="exampleInputEmail1">书名</label>
                  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="输入书名">
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">作者</label>
                  <input type="text" class="form-control" id="exampleInputPassword1" placeholder="输入作者">
                </div>
                <button id="add-btn" type="button" class="btn btn-primary">Submit</button>
              </form>`
            }
            "click::event"(e){
                if(e.target.id == "add-btn"){
                    alert("请求");
                }
            }
        });
    }
    view(){
        this.btn.bind('keydown', common.throttle(function(e){
            if(e.keyCode == "13") {
                // console.log(e.target.id)
                // console.log(e.target.value)
                console.log('测试点击')
                // window.location.href = `http://localhost:3001/search?${e.target.id}=${e.target.value}`
                // $.ajax({
                //     url: `http://localhost:3000/search?${e.target.id}=${e.target.value}`,
                //     method: 'get',
                //     // dataType: 'json', // 返回json数据
                //     success: function(res) {
                //         if(res) {
                //             $('html').html(res)
                //         }
                //         console.log(res)
                //     },
                //     error: function(err) {
                //         console.log(err)
                //     }
                // })
            }
        }, 1000))
    }
}