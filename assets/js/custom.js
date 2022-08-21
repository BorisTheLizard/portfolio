// @codekit-prepend "/vendor/hammer-2.0.8.js";

$( document ).ready(function() {


  // sync side and outer navigations
  function updateNavs(nextPos) {

    $('.side-nav, .outer-nav').children().removeClass('is-active');
    $('.side-nav').children().eq(nextPos).addClass('is-active');
    $('.outer-nav').children().eq(nextPos).addClass('is-active');

  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {
    $('.main-content').children().removeClass('section--is-active');
    $('.main-content').children().eq(nextPos).addClass('section--is-active');
    $('.main-content .section').children().removeClass('section--next section--prev');

    if (curPos === lastItem && nextPos === 0 || curPos === 0 && nextPos === lastItem) {
      $('.main-content .section').children().removeClass('section--next section--prev');
    }
    else if (curPos < nextPos) {
      $('.main-content').children().eq(curPos).children().addClass('section--next');
    }
    else {
      $('.main-content').children().eq(curPos).children().addClass('section--prev');
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $('.header--cta').addClass('is-active');
    }
    else {
      $('.header--cta').removeClass('is-active');
    }

  }

    $('.header--logo').click(function(){
      updateNavs(0);
      updateContent(3,0,3);
    });

    function modelSlider() {


         $('.slider--prev').click(function() {
            $('.slider').animate({ opacity : 0 }, 400);
            setTimeout(function(){
                const allModels = $('.slider').children();
                const currentActive = $('.slider').find('.slider--item-active');
                const currentActiveIndex = currentActive.index();
                const futureIndex = currentActiveIndex - 1;
                if(futureIndex < 0) {
                    currentActive.removeClass('slider--item-active').addClass('slider--item-hidden');
                    allModels.eq(allModels.length - 1).removeClass('slider--item-hidden').addClass('slider--item-active');
                } else {
                    currentActive.removeClass('slider--item-active').addClass('slider--item-hidden');
                    allModels.eq(futureIndex).removeClass('slider--item-hidden').addClass('slider--item-active');
                }
            }, 400);
             $('.slider').animate({ opacity : 1 }, 400);
         })

         $('.slider--next').click(function() {
            $('.slider').animate({ opacity : 0 }, 400);
            setTimeout(function(){
                const allModels = $('.slider').children();
                const currentActive = $('.slider').find('.slider--item-active');
                const currentActiveIndex = currentActive.index();
                const futureIndex = currentActiveIndex + 1;
                if(futureIndex > allModels.length - 1) {
                    currentActive.removeClass('slider--item-active').addClass('slider--item-hidden');
                    allModels.eq(0).removeClass('slider--item-hidden').addClass('slider--item-active');
                } else {
                    currentActive.removeClass('slider--item-active').addClass('slider--item-hidden');
                    allModels.eq(futureIndex).removeClass('slider--item-hidden').addClass('slider--item-active');
                }   
            }, 400);
             $('.slider').animate({ opacity : 1 }, 400);
         })
  }
  modelSlider();

});
