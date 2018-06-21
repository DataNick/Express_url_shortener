$('.btn-shorten').on('click', function() {
  console.log('hello');
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: { url: $('#url-field').val() },
    success: function(data) {
      var resultHtml = '<a class="result" href="' + data.shortUrl + '">' + data.shortUrl + '</a>';
      $('#link').html(resultHtml);
      $('#link').hide().fadeIn('slow');
    }
  })
});