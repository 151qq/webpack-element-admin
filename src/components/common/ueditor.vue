<template>
    <div>
        <div :id="editorId" type="text/plain"></div>
    </div>
</template>
<script>
    export default {
        name: 'ueditor',
        props: {
            content: {type: String},
            editorId: {type: String},
            index: {type: Number},
            editorType: {type: String}
        },
        data () {
            return {
                config: {
                    toolbars: [[
                        'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', '|',
                        'lineheight', '|',
                        'fontfamily', 'fontsize', '|',
                        'emotion', 'map',
                        'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 
                        'horizontal', '|',
                        'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                        'undo', 'redo'
                    ]]
                },
                editor: null,
                isfirst: true
            }
        },
        mounted() {
            if (this.editorType == 'table') {
                this.config.toolbars = [[
                    'inserttable', 'deletetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols','|', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'pasteplain', '|', 'forecolor', 'backcolor', 
                        
                ]]
            } else {
                this.config.toolbars = [[
                    'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist'
                ]]
            }

            const _this = this;
            this.editor = window.UE.getEditor(this.editorId, this.config)
            this.editor.addListener("ready", function () {
                // console.log(_this.content, 'contentR')
                _this.editor.setContent(_this.content ? _this.content : '')
            })
            this.editor.addListener("blur", function () {
                var data = {
                    content: _this.editor.getContent(),
                    index: _this.index
                }
                this.isfirst = false
                _this.$emit('setContent', data)
            })
        },
        // watch: {
        //     content () {
        //         if (this.editor && this.isfirst) {
        //             this.editor.setContent(this.content)
        //             this.isfirst = false
        //         }
        //     }
        // },
        destroyed() {
            this.editor.destroy();
        }
    }
</script>
<style lang="scss">
.edui-default {
    .edui-editor-bottomContainer {
        display: none;
    }
}
</style>