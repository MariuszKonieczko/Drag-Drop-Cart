$(document).ready(function () {
  $('.fruit')
    .hover(
      function (event) {
        $('.description', this).fadeIn(400);
      },
      function (event) {
        $('.description', this).fadeOut(100);
      }
    )
    .dragstart(function (e) {
      e.dataTransfer.setData('text', $(this).attr('id'));
      $('#transferInformation').fadeIn();
    })
    .dragend(function () {
      $('#transferInformation').fadeOut();
    });

  const defaultColor = $('#cartContainer').css('background-color');

  $('#cartContainer')
    .dragover(function (e) {
      e.preventDefault();
      $(this).css('background-color', 'teal');
    })
    .dragleave(function (e) {
      $(this).css('background-color', defaultColor);
    })
    .drop(function (e) {
      e.preventDefault();
      $(this).css('background-color', defaultColor);
      const fruitId = e.dataTransfer.getData('text');
      const name = $('#' + fruitId + ' .name').text();
      const price = $('#' + fruitId + ' .price').text();

      const li =
        "<li class='productInTheCart'><b>" +
        name +
        "</b><span class='priceInTheCart'>" +
        price +
        '</span></li>';

      $('#cart').append(li);

      let sum = 0;
      $('#cart .priceInTheCart').each(function () {
        sum += parseFloat($(this).text());
      });

      $('#price span').text(sum.toFixed(2));
    });
});
