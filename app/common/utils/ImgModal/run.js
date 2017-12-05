angular.module('imgModal').run(['$templateCache', function ($templateCache) {
  'use strict';

  $templateCache.put('imglightbox.html',
    `<div class=modal-body ng-swipe-left=Lightbox.nextImage() ng-swipe-right=Lightbox.prevImage()>
      <div class=lightbox-nav>
        <button class=close aria-hidden=true ng-click=$dismiss()>×</button>
        <div class=btn-group>
          <a class=\"btn btn-xs btn-default prev\"  ng-if=\"Lightbox.images.length > 1\" ng-click=Lightbox.prevImage()>‹ 上一张</a> 
          <a ng-href={{Lightbox.imageUrl}} target=_blank class=\"btn btn-xs btn-default newtab\" title=\"在新标签页打开b\">在新标签页打开</a> 
          <a class=\"btn btn-xs btn-default next\"  ng-if=\"Lightbox.images.length > 1\" ng-click=Lightbox.nextImage()>下一张 ›</a>
          <a class=\"btn btn-xs btn-default rotate\" ng-click=Lightbox.rotate()>旋转</a>
        </div>
      </div>
      <div class=lightbox-image-container title="{{Lightbox.imageCaption}}">
          <div class=lightbox-image-caption><span>{{Lightbox.imageCaption}}</span></div>
        <span class=\"loadfail\" ng-if=\"Lightbox.loadfail && Lightbox.loadfail === \'noImg\'\">暂无图片</span>
        <span class=\"loadfail\" ng-if=\"Lightbox.loadfail && Lightbox.loadfail !== \'noImg\'\">图片加载失败</span>
        <img  imglightbox-src={{Lightbox.imageUrl}}>
      </div>
    </div>`
  );
}]);