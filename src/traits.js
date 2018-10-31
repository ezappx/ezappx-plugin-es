export default function (editor, opt = {}) {
    const trm = editor.TraitManager;
    const textTrat = trm.getType('text');
    const domc = editor.DomComponents;
    const sm = editor.StorageManager;

    trm.addType('js-trait', {
        events: {
            'focusout': 'onChange',
        },

        onValueChange: function () {
            // FIXME 属性改变后无法存储至本地
            var target = this.target;
            var model = this.model;
            target.get("attributes")[model.get('name')] = this.getValueForTarget();
            console.log("onValueChange", this);
        },

        getInputEl: function () {
            // 基于input trait
            if (!this.inputEl) {
                this.inputEl = textTrat.prototype.getInputEl.bind(this)();
                // 设置trait中的显示内容
                this.inputEl.value = this.getInputEl().value;
            }
            return this.inputEl;
        }
    });
}
