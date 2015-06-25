(function() {
  'use strict';

  angular
    .module('app')
    .directive('mpDeLightboxOpenClose', modalOpen);

  /* @ngInject */
  function modalOpen($rootScope) {
    return {
      restrict: 'A',
      scope: {
        mpDeModalOpen: '='
      },
      link: function(scope, element) {

        //lightboxes
        $('.launch-lightbox').on('click', function() {
          var lightboxID = $(this).attr('id');

          $('.lightbox-container').addClass('launch-lightbox');
          setTimeout(function() {
            $('#' + lightboxID + 'Lightbox').toggleClass('launch-lightbox');
          }, 50);
        });
        $('.close-lightbox').on('click', function() {
          $(this).closest('.right-lightbox').removeClass('launch-lightbox');
          $(this).closest('.top-lightbox').removeClass('launch-lightbox');
          if (!$('.right-lightbox').hasClass('launch-lightbox')) {
            setTimeout(function() {
              $('.lightbox-container').removeClass('launch-lightbox');
            }, 200);
          }
        });

        /*
        var config = scope.mpDeModalOpen;
        //if (!config || !config.selector) {
        //    return;
        //}
        //var level = config.level || 1;

        element.bind('click', function() {

            var modalContainerEl,
                modalEl = angular.element(document.querySelector(config.selector));
                console.log('=================== ' + modalEl);
            //if (scope.arDeModalOpen.preventLoad) {
            //    return;
            //}

            // find modal container
            var el = modalEl.parent();
            console.log('=================== ' + el);
            while (el[0] !== undefined && el[0].localName !== 'html') {
                if (el.hasClass('modal-container') || el.hasClass('lightbox-container')) {
                    modalContainerEl = el;
                    break;
                }
                el = el.parent();
            }
            if (!modalContainerEl) {
                return;
            }

            if (scope.arDeModalOpen.isLightbox) {
                if (!modalEl.hasClass('launch-lightbox')) {
                    modalEl.addClass('launch-lightbox');
                    modalContainerEl.addClass('launch-lightbox');
                } else {
                    modalEl.removeClass('launch-lightbox');
                    if (level === 1) {
                        modalContainerEl.removeClass('launch-lightbox');
                    }
                }
            } else {
                // open modal container and modal element
                if (!modalEl.hasClass('launch-modal')) {
                    modalEl.addClass('launch-modal');
                    modalContainerEl.addClass('launch-modal');
                } else {
                    modalEl.removeClass('launch-modal');
                    if (level === 1) {
                        modalContainerEl.removeClass('launch-modal');
                    }
                }
            }

            $rootScope.$broadcast('openModal', modalEl[0].id);
            var focusEl = angular.element(document.querySelector('#' + modalEl[0].id + ' .modal-focus'));
            if (focusEl) {
                focusEl.focus();
            }
        });*/
      }
    };
  }

})();
