$(document).ready(function() {  
  window.onload = function () { applesearch.init(); };

if ( ! $('#estates_table td').length  && window.location.pathname == "/") {
  render_result(0, 0, 1, "");
}

$('div.estate_search1 input').bind("keypress" ,function(e){
  if (e.keyCode == 13) {
    rent_search();
  }
});

$("select#district_id").bind('change',function () {
  $("span#sel_dist").html($("select#district_id option:selected ").text());
         
});
//

$("select#rooms_num").bind('change', function(){
  $("span#sel_rooms").html($("select#rooms_num option:selected ").text());
});
//

$('span#search_rent a').bind('click', function(){
  rent_search();
});
//

$('a.green.description-extra-button').click(function(){
//  event.preventDefault();
  if($('span.description-extra').is(":visible")){
    $('span.description-extra').css("diplay", "none");
    $('a.green.description-extra-button').text("развернуто");
  }
  else{
    $('span.description-extra').css("diplay", "inline-block");
    $('a.green.description-extra-button').text("коротко");
  }
});
//
//
$('td#side_bar_toggler').hover(
  function(){
//    $('td#side_bar_toggler a span').removeClass('arrtoggle');
//    $('td#side_bar_toggler a span').addClass('white');
  },
  function(){
    $('td#side_bar_toggler a span').removeClass('white');
    $('td#side_bar_toggler a span').addClass('arrtoggle');
  });

function hide_sidebar(){
  var main = document.getElementById("main");
  var cont = document.getElementById("content");
  if($('td#side_bar_toggler a').attr('data-status') == "show" ){
    main.style.margin= "0";
    cont.style.padding = "0";
    $('td#side_bar_toggler a').attr('data-status', "hide");}
  else{
    main.style.margin= "0 0 0 -325px";
    cont.style.padding = "0 0 0 325px";
    $('td#side_bar_toggler a').attr('data-status', "show");}
}

$('td#side_bar_toggler').click(function(){
  hide_sidebar();
});

$("a.side-bar-button").click(function(){
  hide_sidebar();
});


}); // DOCUMENT ON_READY END

// FUNCTIONS

function rent_search(page){
      var dist_code = $("select#district_id option:selected")[0].value;
      var rooms = $("select#rooms_num option:selected")[0].value;
      var search_string = $("input#srch_fld").val() == undefined ? "" :$("input#srch_fld").val();

      if (dist_code == "" ) {
          page == undefined ? render_result('0', rooms, 1, search_string) : render_result('0', rooms, page, search_string)
      }
      else{
          page == undefined ? render_result(dist_code, rooms, 1, search_string) : render_result(dist_code, rooms, page, search_string)
      }


}

function render_result(dist_code, rooms, page, search_string){
$.ajax({
  url:'estate/result.json?dist_code='+dist_code+'&rooms='+rooms+'&page='+page+'&string='+search_string,
  dataType: "json",
  beforeSend: function(){
    $('table#estates_table tbody').fadeOut('fast', function(){
       $('span.paging').empty();
       $('div#spinner').show();
       $('span#estates_result_count').empty();
    });
  },
  success: function(data){
    $('div#spinner').hide();
    var items = [];
    $.each(data.rents, function(key, val) {
      items.push('<tr id="' + val.rent.id +'" class="estate-row">'+
               '<td class="chk">'+ "<span class ='ob-addfav'><a class='' href='#'><div></div></a></span>" + '</td>'+
               '<td class="rooms">'+ val.rent.rooms + '</td>' +
               '<td class="station">'+ val.rent.adress.split(",")[2] + '</td>' +
               '<td class="floor">'+ getFloors(val.rent.floor_at, val.rent.floors) +  '</td>' +
               '<td class="price">'+ val.rent.price + '</td>' +
               '<td class="desc">'+ images_amount(val.img_amount) + subs(val.rent.info) + (val.rent.info == null ? "" : "...") +'<span class="description-extra">'+  extra("..."/*val.rent.info*/)  +'</span> ' +
               '<a class="green" target="_blank" href="/estate/' + val.rent.id + '">&nbsp;Подробнее о квартире<i class ="ico new_win"></i></a>'  + '</td>' +
               '<td class="contacts"><ul>');
      $.each(val.rent.phones.split(","), function(key,value) {
        items.push('<li>'+ value + '</li>');
      });
      items.push('</ul></td></tr>');

    });

    $('table#estates_table tbody tr.estate-row').remove();
    $('table#estates_table tbody').append(items.join(''));       //div#result_content_table div#search-results.search-results table#estates_table tbody

    if ($('table#estates_table tbody tr.estate-row').size() > 0 ){
      $("table#estates_table tbody tr:odd").addClass("alt");
    }

    $('table#estates_table tbody').fadeIn('fast', function(){
          append_paging(data.pages, dist_code, rooms, page);
    });
    $('span#estates_result_count').append(data.amount);
  }
});
}   //end of render_result

function images_amount(size){
    if(size > 0){
        span = "<span class='with_photo_link'>" + size + "фото</span>";
        return span
    }
    else{
        return "";
    }
}

function subs(value){
  var x = new String(value);
  return x.length > 140 ? x.substring(0,140) : "";
}

function extra(value){
    var x = new String(value);
    return x.length > 140 ? x.substring(141, (x.length - 1) ) : "" ;
}

function getFloors(at, all){
    return at == null ? "" : "" + at + "/" + all
}

function append_paging(size, dist_code, rooms, page){
  var page = parseInt(page);
  var items = [];
  if (size < 10){
    for (var i=1;i<=size;i++){
      if(i == page){
        items.push($('<em>'+i+'</em>'));
      }
      else{
        items.push($('<a href="#">'+ i +'</a>').click(
          function(event) {
            event.preventDefault();
            rent_search($(this).text());//render_result(dist_code, rooms, $(this).text());
          }))
        }
      }
  }
  else{
    var startRange;
    var endRange;
    if( page <= 5){
      startRange = 1;
      endRange = 10;
    }
    else{
      startRange = page >= size ? (page - 11) : page - 5;
      endRange = page >= (size -4) ? size : (page + 5) ;
    }
    items.push($('<a class="page_first" title="Первая страница" href="#">←</a>').click(function(event) {
          event.preventDefault();
          rent_search(1);
          //render_result(dist_code, rooms, 1);
        }));

    for (var i = startRange; i<= endRange; i++){
      if(i == page){
        items.push($('<em>'+i+'</em>'));
      }
      else{
        items.push($('<a class="page_link" href="#">'+ i +'</a>').click(function(event) {
          event.preventDefault();
          rent_search($(this).text());
          //render_result(dist_code, rooms, $(this).text());
        }))
      }
    }
        items.push($('<a class="page_last" title="Последняя страница" href="#">→</a>').click(function(event) {
          event.preventDefault();
          rent_search(size);
          //render_result(dist_code, rooms, size);
        }))
  }

  $.each(items, function() {
      $(this).appendTo('span.paging');

  });

  if(page > 6 && page < size - 5){
    $('a.page_first').show();
    $('a.page_last').show();
  }
  else if(page < size - 5){
    $('a.page_last').show();
  }
  else if(page > 6){
    $('a.page_first').show();
  }


}
