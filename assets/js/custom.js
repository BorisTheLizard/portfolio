// @codekit-prepend "/vendor/hammer-2.0.8.js";
import { m1, m2, m3 } from "./models.js";

$(document).ready(function () {
  // sync side and outer navigations
  function updateNavs(nextPos) {
    $(".side-nav, .outer-nav").children().removeClass("is-active");
    $(".side-nav").children().eq(nextPos).addClass("is-active");
    $(".outer-nav").children().eq(nextPos).addClass("is-active");
  }

  // update main content area
  function updateContent(curPos, nextPos, lastItem) {
    $(".main-content").children().removeClass("section--is-active");
    $(".main-content").children().eq(nextPos).addClass("section--is-active");
    $(".main-content .section")
      .children()
      .removeClass("section--next section--prev");

    if (
      (curPos === lastItem && nextPos === 0) ||
      (curPos === 0 && nextPos === lastItem)
    ) {
      $(".main-content .section")
        .children()
        .removeClass("section--next section--prev");
    } else if (curPos < nextPos) {
      $(".main-content")
        .children()
        .eq(curPos)
        .children()
        .addClass("section--next");
    } else {
      $(".main-content")
        .children()
        .eq(curPos)
        .children()
        .addClass("section--prev");
    }

    if (nextPos !== 0 && nextPos !== lastItem) {
      $(".header--cta").addClass("is-active");
    } else {
      $(".header--cta").removeClass("is-active");
    }
  }

  $(".header--logo").click(function () {
    updateNavs(0);
    updateContent(3, 0, 3);
  });

  function modelSlider() {
    let activeModelIndex = 0;
    const maxIndex = 2;
    const models = {
      0: { model: m1, loaded: true },
      1: { model: m2, loaded: false },
      2: { model: m3, loaded: false },
    };

    m1.start();
    $(".slider--prev").click(function () {
      if (activeModelIndex === 0) {
        activeModelIndex = maxIndex;
      } else {
        activeModelIndex--;
      }
      if (!models[activeModelIndex].loaded) {
        models[activeModelIndex].model.start();
        models[activeModelIndex].loaded = true;
      }
      const sliderItems = document.getElementsByClassName("slider--item");
      const sliderItemsArray = Array.from(sliderItems);
      sliderItemsArray.forEach((item) => {
        item.className = "slider--item hidden";
      });
      sliderItemsArray[activeModelIndex].className = "slider--item active";
    });

    $(".slider--next").click(function () {
      if (activeModelIndex === maxIndex) {
        activeModelIndex = 0;
      } else {
        activeModelIndex++;
      }
      if (!models[activeModelIndex].loaded) {
        models[activeModelIndex].model.start();
        models[activeModelIndex].loaded = true;
      }
      const sliderItems = document.getElementsByClassName("slider--item");
      const sliderItemsArray = Array.from(sliderItems);
      sliderItemsArray.forEach((item) => {
        item.className = "slider--item hidden";
      });
      sliderItemsArray[activeModelIndex].className = "slider--item active";
    });
  }
  modelSlider();
});
