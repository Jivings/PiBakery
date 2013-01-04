$(function() {
  $('li.active').removeClass('active');
  $('li a[href="' + window.location.pathname + '"]').parent().addClass('active');
});

$('form').submit(function() {
  $.ajax({
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
    success : function() {
      $('#response').show()
        .empty()
        .html('Successfully submitted package')
        .addClass('alert-success');
      $('form')[0].reset();
    },
    error   : function(xhr, status, err) {
      console.log(xhr.status);
      console.log(status);
      console.log(err);
      $('#response').show()
        .empty()
        .html('Failed to submit package')
        .addClass('alert-error');
    }
  });
  return false;
});