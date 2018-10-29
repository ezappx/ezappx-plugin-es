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
        }, {
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

  // ajax button
  domc.addType('ajax-button',
    {
      model: defaultConentModel.extend(
        {
          defaults: {
            ...defaultConentModel.prototype.defaults,

            script: function () {
              $(this).click(function (e) {
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

  // push service
  domc.addType('push-service', {
    // Define the Model
    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        traits: [
          'Server',
          'Channel',
        ],
        script: function () {
          console.log(this);
          var displayList = $(this);
          var server = displayList.attr('Server'); // http://push.ezappx.com/gs-guide-websocket
          var channel = displayList.attr('Channel'); // /topic/greetings
          var socket = new SockJS(server);
          stompClient = Stomp.over(socket);
          stompClient.connect({ "Origin": "test" }, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe(channel, function (receivedMsg) {
              var notificationFull = app.notification.create({
                icon: '<i class="icon demo-icon"></i>',
                title: 'Ezappx',
                titleRightText: 'now',
                subtitle: 'Received msg: ' + JSON.parse(receivedMsg.body).content,
                text: 'created at (' +JSON.parse(receivedMsg.body).createAt + ')',
                closeTimeout: 3000,
              });
              notificationFull.open();
            });
          });
        }
      },
    },
      {
        isComponent: function (el) {
          if ($(el).attr(EZAPPX_COMPONENT_TYPE) == 'push-service') {
            return { type: 'push-service' };
          }
        },
      }),

    // Define the View
    view: defaultType.view.extend({
      init() {
        this.model.setAttributes({
          'Server': 'http://push.ezappx.com/gs-guide-websocket',
          'Channel': '/topic/greetings'
        });
      }
    }),
  });
}
