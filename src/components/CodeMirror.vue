<template>
    <!--代码编辑器-->
  <div class="in-coder-panel">
    <textarea ref="textarea"></textarea>
    <el-select class="code-mode-select" v-model="mode"
               @change="changeMode">
      <el-option v-for="mode in modes"
                 :key="mode.value" :label="mode.label" :value="mode.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import _codeMirror from 'codemirror'
  import 'codemirror/theme/cobalt.css'
  import 'codemirror/mode/javascript/javascript'
  import 'codemirror/mode/css/css'
  import 'codemirror/mode/xml/xml'
  import 'codemirror/mode/markdown/markdown'
  import 'codemirror/mode/python/python'
  import 'codemirror/mode/r/r'
  import 'codemirror/mode/shell/shell'
  import 'codemirror/mode/swift/swift'
  import 'codemirror/mode/vue/vue'
  const  codeMirror = window.codeMirror || _codeMirror
    export default {
        name: "CodeMirror",
      props:{
          value:String,
        language:{
            type:String,
          default:null
        }
      },
      data(){
          return{
            code:'',
            mode:'python',
            codeer:null,
            options:{
              tabSize:2,
              theme:'cobalt',
              lineNumbers:true,
              line:true
            },
            modes:[{
              value:'css',
              label:'CSS'
            },{
              value:'javascript',
              label:'JavaScript'
            },{
              value:'html',
              label:'XML/HTML'
            }, {
              value: 'x-java',
              label: 'Java'
            }, {
              value: 'x-objectivec',
              label: 'Objective-C'
            }, {
              value: 'x-python',
              label: 'Python'
            }, {
              value: 'x-rsrc',
              label: 'R'
            }, {
              value: 'x-sh',
              label: 'Shell'
            }, {
              value: 'x-sql',
              label: 'SQL'
            }, {
              value: 'x-swift',
              label: 'Swift'
            }, {
              value: 'x-vue',
              label: 'Vue'
            }, {
              value: 'markdown',
              label: 'Markdown'
            }]
          }
      },
      mounted(){
          this.init()
      },
      methods:{
          init:function () {
            this.coder = codeMirror.fromTextArea(this.$refs.textarea,this.options)
            this.coder.setValue(this.value||this.code)
            this.coder.on('change',(coder)=>{
              this.code = coder.getValue()
              if(this.$emit){
                this.$emit('input',this.code)
              }
            })
            if(this.language){
              let modeObj = this.getLanguage(this.language)
              if(modeObj)
              {
                this.mode = modeObj.label
              }
            }
          },
        getLanguage:function (s) {
            return this.mode.find((mode)=>{
              let currentLanguage = s.toLowerCase()
              let currentLabel = mode.label.toLowerCase()
              let currentValue = mode.value.toLowerCase()
              return currentLabel === currentLanguage||currentValue===currentLanguage
            })
        },
        changeMode(val)
        {
          this.coder.setOption('mode',`text/${val}`)
          let label = this.getLanguage(val).label.toLowerCase()
          this.$emit('language-change',label)
        }
      }
    }
</script>

<style scoped>
  .in-coder-panel{
    flex-flow: inherit;
    display:flex;
    position: relative;
    width: 80%;
    height: 50vh;
  }
  .CodeMirror{
    flex-flow: inherit;
    z-index: 1;
  }
  .CodeMirror-code{
    line-height: 19px;
  }
  .code-mode-select{
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 10px;
    max-width: 130px;
  }
</style>
