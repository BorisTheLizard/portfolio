$(document).ready(function () {
  $("#myCarousel").on("slide.bs.carousel", function () {
    $(".video").each(function () {
      this.contentWindow.postMessage(
        '{"event":"command","func":"stopVideo","args":""}',
        "*"
      );
    });
  });
});
