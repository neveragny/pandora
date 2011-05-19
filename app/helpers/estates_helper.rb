module EstatesHelper

end





#function append_paging(size, dist_code, rooms, page){
#  var page = parseInt(page);
#  var items = [];
#  if (size < 10){
#    for (var i=1;i<=size;i++){
#      if(i == page){
#
#      }
#      else{
#        items.push($('<a href="#">'+ i +'</a>').click(
#          function(event) {
#            event.preventDefault();
#            rent_search($(this).text());//render_result(dist_code, rooms, $(this).text());
#          }))
#        }
#      }
#  }
#  else{
#    var startRange;
#    var endRange;
#    if( page <= 5){
#      startRange = 1;
#      endRange = 10;
#    }
#    else{
#      startRange = page >= size ? (page - 11) : page - 5;
#      endRange = page >= (size -4) ? size : (page + 5) ;
#    }
#    items.push($('<a class="page_first" title="Первая страница" href="#">←</a>').click(function(event) {
#          event.preventDefault();
#          rent_search(1);
#          //render_result(dist_code, rooms, 1);
#        }));
#
#    for (var i = startRange; i<= endRange; i++){
#      if(i == page){
#        items.push($('<em>'+i+'</em>'));
#      }
#      else{
#        items.push($('<a class="page_link" href="#">'+ i +'</a>').click(function(event) {
#          event.preventDefault();
#          rent_search($(this).text());
#          //render_result(dist_code, rooms, $(this).text());
#        }))
#      }
#    }
#        items.push($('<a class="page_last" title="Последняя страница" href="#">→</a>').click(function(event) {
#          event.preventDefault();
#          rent_search(size);
#          //render_result(dist_code, rooms, size);
#        }))
#  }
#
#  $.each(items, function() {
#      $(this).appendTo('span.paging');
#
#  });
#
#  if(page > 6 && page < size - 5){
#    $('a.page_first').show();
#    $('a.page_last').show();
#  }
#  else if(page < size - 5){
#    $('a.page_last').show();
#  }
#  else if(page > 6){
#    $('a.page_first').show();
#  }
#
#
#}