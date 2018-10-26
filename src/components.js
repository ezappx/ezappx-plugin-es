import {
  EZAPPX_COMPONENT_TYPE
} from './consts'


export default (editor, config = {}) => {
  const domc = editor.DomComponents;
  const defaultType = domc.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  // 编辑显示文本
  domc.addType('defualtContent', {
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        traits: [{
          type: 'content',
          label: 'Text',
          name: 'text',
        } , {
          type: 'text',
          label: 'Id',
          name: 'id',
        }]
      }
    }),

    // Define the View
    view: defaultView,
  });

  var defaultConentType = domc.getType('defualtContent');
  var defaultConentModel = defaultConentType.model;
  var defaultConentView = defaultConentType.view;

  // form button
  domc.addType('ajax-button',
    {
      model: defaultConentModel.extend(
        {
          defaults: {
            ...defaultConentModel.prototype.defaults,

            script: function () {
              $(this).click(function (e) {
                var t = $(e.target).attr("target-div")
                console.log($(e.target).attr("request-type") + " " + $(e.target).attr("target-url"));
                $.ajax({
                  url: $(e.target).attr("target-url"),
                  type: $(e.target).attr("request-type"),
                  timeout: 3000, // 3 sec
                  contentType: 'application/json;',
                  dataType: 'json',
                  crossDomain: true,
                  success: function (data) {
                    alert("Ezappx builder server memory status: \n" + JSON.stringify(data));
                  },
                  error: function (request, status, error) {
                    console.error(request);
                  }
                });
              });
            },

            traits: defaultConentModel.prototype.defaults.traits.concat([{
              type: 'class',
              label: 'Style',
              name: 'class',
              options: [
                { value: '', name: 'Default' },
                { value: 'button-fill', name: 'Fill' },
                { value: 'button-raised', name: 'Raised' },
              ]
            }, {
              type: 'text',
              label: 'Target url',
              name: "target-url",
            }, {
              type: 'text',
              label: 'Target div',
              name: "target-div",
            }, {
              type: 'select',
              label: 'Reqeust type',
              name: 'request-type',
              options: [
                { value: 'GET', name: 'GET' },
                { value: 'POST', name: 'POST' }
              ]
            },
            ])
          },
        },
        {
          isComponent: function (el) {
            if ($(el).attr(EZAPPX_COMPONENT_TYPE) == 'ajax-button') {
              return { type: 'ajax-button' };
            }
          },
        }),

      view: defaultConentView.extend({
        init() {
          this.model.setAttributes({
            'class': 'col button',
            'target-div': 'Id',
            'target-url': 'http://10.109.252.77:8800/',
            'request-type': 'GET'
          });
        },
      })
    });
}
