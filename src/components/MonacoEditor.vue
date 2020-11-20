<template>
    <div class="monaco-container">
      <div ref="container" class="monaco-editor1" style="height: 300px;width: 100%;" >
      </div>
    </div>
</template>
<script>
  import * as monaco from 'monaco-editor'
  export default {
        name: "MonacoEditor",
    props: {
      current: Object,
      // 编辑器中呈现的内容
      codes: {
        type: String,
        default: function () {
          return ''
        }
      },
      readOnly: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      language:{
        type:String,
        default:function () {
          return 'python'
        }
      },
      // 主要配置
      editorOptions: {
        type: Object,
        default: function () {
          return {
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: this.readOnly, // 只读
            cursorStyle: 'line', // 光标样式
            automaticLayout: false, // 自动布局
            glyphMargin: true, // 字形边缘
            useTabStops: false,
            fontSize: 28, // 字体大小
            // autoIndent: false // 自动布局
          }
        }
      },
      },
    data() {
      return {
          monacoEditor: {},
      }
    },
      mounted () {
        this.monacoEditor = monaco.editor.create(this.$refs.container, {
          value: this.codes, // 见props
          language: 'python',
          theme: 'hc-black', // 编辑器主题：vs, hc-black, or vs-dark，更多选择详见官网
          editorOptions: this.editorOptions // 同codes
        })
        this.monacoEditor.onDidChangeModelContent((event) => {
          let changeContent = this.monacoEditor.getValue()
          this.$emit('contentBody', changeContent)
        })
      },
    watch: {
      current() {
        this.monacoEditor.setValue(this.codes)
        console.log(this.monacoEditor)
      },
    },
      methods: {
        changeEditor() { // 更改editor内容
          this.monacoEditor.setValue(result.data);
          this.monacoEditor.getAction('editor.action.formatDocument')._run();
          console.log(this.monacoEditor)
          this.$emit('child-event',this.monacoEditor)
        },
        destroyEditor() { // 销毁编辑器
          this.monacoEditor.dispose();
        },
      }
  }
</script>

<style scoped>
  .code-mode-select{
    position: absolute;
    z-index: 2;
    right: 1px;
    top: 1px;
    max-width: 130px;
  }
  .monaco-container{
    flex-flow: inherit;
    display:flex;
    position: relative;
    width: 100%;
    height: 330px;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .monaco-editor1{
    text-align: left;
  }
</style>
