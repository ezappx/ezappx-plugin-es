import {
  EZAPPX_COMPONENT_TYPE,
} from './consts'

export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  const CATEGORY_EXTERNAL_SERVICE = "External Service";
  const CATEGORY_CORDOVA_PLUGIN = "Cordova Plugin";
  bm.add('es-ajax', {
    label: 'Ajax',
    attributes: { class: 'fa fa-cloud' },
    category: CATEGORY_EXTERNAL_SERVICE,
    content: `
            <button ${EZAPPX_COMPONENT_TYPE}='es-ajax'>Button</button>
            `
  });

  bm.add('es-push-service', {
    label: 'Push Service',
    attributes: { class: 'fa fa-bell' },
    category: CATEGORY_EXTERNAL_SERVICE,
    content: {
      type: 'es-push-service',
      // 可视化js块
      style: {
        width: '100%',
        height: '50px',
      }
    }
  })

  bm.add('es-tencent-map', {
    label: 'Tencent Map',
    attributes: { class: 'fa fa-map' },
    category: CATEGORY_EXTERNAL_SERVICE,
    content: {
      type: 'es-tencent-map',
      // 可视化js块
      style: {
        width: '100%',
        height: '500px',
      }
    }
  })

  // cordova plugin add cordova-plugin-dialogs
  bm.add('cordova-dialogs-alert', {
    label: 'Alert',
    attributes: { class: 'fa fa-bell' },
    category: CATEGORY_CORDOVA_PLUGIN,
    content: {
      type: 'cordova-dialogs-alert',
      // 可视化js块
      style: {
        width: '100%',
        height: '100px',
      }
    }
  })
}
