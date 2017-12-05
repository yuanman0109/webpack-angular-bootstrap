(function (window, document) {
  'use strict';
  (angular.module('ng.ckeditor', ['ng']))
    .directive('ngCkeditor', ['$timeout', '$compile', function ($timeout, $compile) {
      return {
        restrict: 'E',
        scope: {
          ngModel: '=ngModel',
          ngChange: '=ngChange',
          ngDisabled: '=ngDisabled',
          ngConfig: '=ngConfig'
        },
        link: function (scope, elem, attrs) {
          elem[0].innerHTML = '<div class="ng-ckeditor"></div> <div class="totalTypedCharacters"></div>';
          var token = localStorage.token;
          var url = '/api/ckeditor/upload?access_token=' + token;
          // var elemEditor = elem[0].querySelectorAll('.ng-ckeditor');
          // console.log(elemEditor);
          console.log(attrs.id);
          var config = {
            removeButtons: (attrs.removeButtons !== undefined) ? 'About,' + attrs.removeButtons : 'About',
            readOnly: scope.ngDisabled ? scope.ngDisabled : false
          };
          if (attrs.removePlugins !== undefined) {
            config.removePlugins = attrs.removePlugins;
          }
          config.toolbar = [
            { name: 'document', items: ['Print'] },
            // { name: 'document', items: ['Source'] },
            { name: 'clipboard', items: ['Cut', 'Copy', '-', 'Undo', 'Redo'] },
            { name: 'styles', items: ['Format', 'Font', 'FontSize'] },
            { name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'RemoveFormat', 'CopyFormatting'] },
            { name: 'colors', items: ['TextColor', 'BGColor'] },
            { name: 'align', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            // { name: 'links', items: ['Link', 'Unlink'] },
            { name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote'] },
            { name: 'insert', items: ['Image', 'Table', 'HorizontalRule', 'SpecialChar', 'Smiley', 'PageBreak'] },
            { name: 'tools', items: ['Maximize', 'ShowBlocks'] }
          ];
          
          config.extraPlugins = 'uploadimage,image2,colorbutton,colordialog,smiley,iframe,iframedialog,flash,find,font,preview,justify,pagebreak,placeholder,newpage,selectall,templates,forms,notificationaggregator,notification,filetools,uploadwidget,widget,showblocks,codesnippet';
          config.uploadUrl = url;
          config.filebrowserUploadUrl = url;
          config.filebrowserImageUploadUrl = url;
          config.image2_alignClasses = ['image-align-left', 'image-align-center', 'image-align-right'];
          config.image2_disableResizer = true;
          config.image2_captionedClass = 'image-captioned';
          config.stylesSet = [{
            name: 'Narrow image',
            type: 'widget',
            widget: 'image',
            attributes: {
              'class': 'image-narrow'
            }
          }, {
            name: 'Wide image',
            type: 'widget',
            widget: 'image',
            attributes: {
              'class': 'image-wide'
            }
          }];

          if (attrs.skin !== undefined) {
            config.skin = attrs.skin;
          }
          if (attrs.width !== undefined) {
            config.width = attrs.width;
          }
          if (attrs.height !== undefined) {
            config.height = attrs.height;
          }
          if (attrs.resizeEnabled !== undefined) {
            config.resize_enabled = attrs.resizeEnabled !== 'false';
          }

          // var editor = CKEDITOR.replace(elemEditor, (scope.ngConfig ? scope.ngConfig : config), '');
          var editor = CKEDITOR.replace(attrs.id, (scope.ngConfig ? scope.ngConfig : config), '');
          var addEventListener = function (editor) {
            (editor).on('change', function (evt) {
              console.log('change work!!');
              scope.$apply(function () {
                scope.ngModel = evt.editor.getData();
              });           
            });
            (editor).on('fileUploadRequest', function (evt) {
              var xhr = evt.data.fileLoader.xhr;
              xhr.setRequestHeader('responseType', 'json');
              xhr.withCredentials = true;
            });

            (editor).on('fileUploadResponse', function (evt) {
              console.log('fileUploadResponse work!');
              // Prevent the default response handler.
              // evt.stop();

              // Get XHR and response.
              var data = evt.data,
                  xhr = data.fileLoader.xhr,
                  response = JSON.parse(xhr.responseText);
                  // response = xhr.responseText.split('|');

              data.fileName = response.fileName;
              data.url = response.url;
              // data.width = 300;
              $timeout(function () {
                scope.ngModel = evt.editor.getData();               
              }, 0);
            });

            // (editor).on('focus', function (evt) {
            //   console.log('focus work!!');
            //   //editor.setData(scope.ngModel);
            // });                        
            (editor).on('key', function (evt) {
              $timeout(function () {
                scope.$apply(function () {
                  scope.ngModel = evt.editor.getData();
                });                
              }, 0);
            });
          };

          var interval;
          var setValue = function (value, editor) {
            if (interval) {
              clearTimeout(interval);
            }
            interval = setTimeout(function () {
              if (value && editor) {
                editor.setData(value);
              } else if (editor) {
                editor.setData('');
              }
            }, 1000);
          };

          addEventListener(editor);

          scope.$watch('ngModel', function (value) {
            if (value !== editor.getData()) {
              setValue(value, editor);
            }
          });

          // scope.$watch('ngDisabled', function (value) {
          //   if (value) {
          //     config.readOnly = true;
          //   } else {
          //     config.readOnly = false;
          //   }

          //   //editor = CKEDITOR.replace(elemEditor[0], (scope.ngConfig ? scope.ngConfig : config), '');
          //   editor.destroy();
          //   editor = CKEDITOR.replace(attrs.id, (scope.ngConfig ? scope.ngConfig : config), '');
          //   addEventListener(editor);
          //   editor.setData(scope.ngModel);
          // });
        }
      };
    }]);
})(window, document);
