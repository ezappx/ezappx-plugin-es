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
  domc.addType('es-ajax',
    {
      model: defaultConentModel.extend(
        {

          init() {
            this.setAttributes({
              'class': 'col button',
              'target-div': 'Id',
              'target-url': 'http://10.109.252.77:8800/',
              'request-type': 'GET'
            });
          },

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
                    console.log("Ezappx builder server memory status: " + JSON.stringify(data));
                    var notificationFull = app.notification.create({
                      icon: '<i class="icon demo-icon"></i>',
                      title: 'Ezappx',
                      titleRightText: 'now',
                      subtitle: 'Server used memory: ' + data.used,
                      text: 'Server total memory: ' + data.total,
                      closeTimeout: 3000,
                    });
                    notificationFull.open();
                  },
                  error: function (request, status, error) {
                    console.error(request);
                    var notificationFull = app.notification.create({
                      icon: '<i class="icon demo-icon"></i>',
                      title: 'Ezappx',
                      titleRightText: 'now',
                      subtitle: 'Ajax error',
                      text: JSON.stringify(request),
                      closeTimeout: 3000,
                    });
                    notificationFull.open();
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
            if ($(el).attr(EZAPPX_COMPONENT_TYPE) == 'es-ajax') {
              return { type: 'es-ajax' };
            }
          },
        }),

      view: defaultConentView
    });

  // TODO实现一种Trait，值改变后移除comp重新添加
  // push service
  domc.addType('es-push-service', {
    model: defaultModel.extend({
      init() {
        console.log('model', this);
        this.listenTo(this, 'change:server', this.changeServer);
        this.setAttributes({
          'server': 'http://push.ezappx.com/gs-guide-websocket',
          'channel': '/topic/greetings'
        });
      },

      changeServer() {
        console.log('change to', this.get('server'));
      },

      defaults: {
        ...defaultModel.prototype.defaults,
        traits: [{
          type: 'js-trait',
          label: 'Server',
          name: 'server'
        }, {
          type: 'js-trait',
          label: 'Channel',
          name: 'channel'
        },
        ],
        script: function () {
          var displayList = $(this);
          var server = displayList.attr('server'); // http://push.ezappx.com/gs-guide-websocket
          var channel = displayList.attr('channel'); // /topic/greetings
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
                text: 'This message was created at (' + JSON.parse(receivedMsg.body).createAt + ')',
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
          if ($(el).attr(EZAPPX_COMPONENT_TYPE) == 'es-push-service') {
            return { type: 'es-push-service' };
          }
        },
      }),

    // Define the View
    view: defaultType.view.extend({
      init() {
        console.log('view', this);
      }
    }),
  });

  // tencent map
  domc.addType('es-tencent-map', {
    model: defaultModel.extend({

      init() {
        console.log('es-tencent-map model', this);
        // FIXME 不能使用$(this).attr(k,v)初始化，否则UI不现实内容
        this.setAttributes({
          key: '2VMBZ-JXJRP-A6MDS-VOUUP-7WKSH-ZNFXX'
        })
      },

      defaults: {
        ...defaultModel.prototype.defaults,
        traits: [
          'key'
        ],
        script: function () {
          $(this).append('<div id = "tencent-map-container" style="min-width: 100%;min-height: 100%;"></div>');
          window.initTencentMap = function () {
            // 配置地图
            var myOptions = {
              zoom: 8,
              center: new qq.maps.LatLng(39.914850, 116.403765),
              mapTypeId: qq.maps.MapTypeId.ROADMAP
            }
            var map = new qq.maps.Map(document.getElementById('tencent-map-container'), myOptions);

            // 添加比例尺
            var scaleControl = new qq.maps.ScaleControl({
              align: qq.maps.ALIGN.BOTTOM_LEFT,
              margin: qq.maps.Size(85, 15),
              map: map
            });

            // 地图位置点击事件
            qq.maps.event.addListener(
              map,
              'click',
              function (event) {
                console.log('您点击的位置为:[' + event.latLng.getLng() + ',' + event.latLng.getLat() + ']');
              }
            );
            console.log('已渲染腾讯地图');
          };


          if (typeof qq == 'undefined') {
            console.log('导入腾讯地图JS');
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://map.qq.com/api/js?v=2.exp&key=' + $(this).attr('key') + '&callback=initTencentMap';
            document.body.appendChild(script);
          };

        }
      },
    },

      {
        isComponent: function (el) {
          if ($(el).attr(EZAPPX_COMPONENT_TYPE) == 'es-tencent-map') {
            return { type: 'es-tencent-map' };
          }
        },
      }),

    // Define the View
    view: defaultType.view,
  });

  // cordova dialogs
  domc.addType('cordova-dialogs-alert', {
    model: defaultModel.extend({
      init() { 
        console.log("set default attrs on cordova-dialogs-alert")      
        this.setAttributes({
          'server': 'http://push.ezappx.com/gs-guide-websocket',
          'channel': '/topic/greetings'
        });
      },

      defaults: {
        ...defaultModel.prototype.defaults,
        traits: [{
          type: 'js-trait',
          label: 'Server',
          name: 'server'
        }, 
        {
          type: 'js-trait',
          label: 'Channel',
          name: 'channel'
        }, 
        ],
        script: function () {
          console.log("server:", $(this).attr("server"));
          console.log("channel:", $(this).attr("channel"));
        }
      },
    },
      {
        isComponent: function (el) {
          if ($(el).attr(EZAPPX_COMPONENT_TYPE) == 'cordova-dialogs-alert') {
            return { type: 'cordova-dialogs-alert' };
          }
        },
      }),

    // Define the View
    view: defaultType.view,
  });
}
