import {
  EZAPPX_COMPONENT_TYPE,
} from './consts'

export default (editor, config = {}) => {  
  const bm = editor.BlockManager;
  const CATEGORY_AJAX = "Ajax"
  bm.add('ajax-button', {
    label: 'Button',
    attributes: { class: 'fa fa-square' },
    category: CATEGORY_AJAX,
    content: `
            <button ${EZAPPX_COMPONENT_TYPE}='ajax-button'>Button</button>
            `
});
}
