$(function() {
  $('li.active').removeClass('active');
  $('li a[href="' + window.location.pathname + '"]').parent().addClass('active');
});

var submit = $('input[type="submit"]');
submit.button();
$('form').submit(function() {
  submit.button('loading');
  $.ajax({
    type  : 'POST',
    url   : '/ingredients',
    data  : {
      package : {
        name        : $('#name').val(),
        os          : $('#os').val(),
        description : $('#description').val(),
        summary     : $('#summary').val(),
        category    : $('#category').val()
      }  
    },
    success : function(xhr, status) {
      $('#response').show()
        .empty()
        .html('Successfully submitted package +' + $('#name').val())
        .addClass('alert-success');
      $('form')[0].reset();
      submit.button('reset').val('Submit');
    },
    error   : function(xhr, status, err) {
      $('#response').show()
        .empty()
        .html('Failed to submit package: ' + err)
        .addClass('alert-error');
      submit.button('reset').val('Submit');
    }
  });
  return false;
});