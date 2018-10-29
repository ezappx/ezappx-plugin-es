import {
  EZAPPX_COMPONENT_TYPE,
} from './consts'

export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  const CATEGORY_AJAX = "Ajax"
  const CATEGORY_PUSH = "Push Service"
  bm.add('ajax-button', {
    label: 'Button',
    attributes: { class: 'fa fa-square' },
    category: CATEGORY_AJAX,
    content: `
            <button ${EZAPPX_COMPONENT_TYPE}='ajax-button'>Button</button>
            `
  });

  bm.add('push-service', {
    label: 'Push Service',
    attributes: { class: 'fa fa-debug' },
    category: CATEGORY_PUSH,
    content: {
      type: 'push-service',
      // 可视化js块
      style: {
        width: '100%',
        height: '50px',
      }
    }
  })
}
