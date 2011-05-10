$(document).ready(function() {  
   applesearch.init(); 

//g_favorites_counter = FavoritesCounter;

g_side_bar = $("div#side_bar");
g_favorites_counter = new FavoritesCounter();

g_estates_table = new EstatesTable();

g_estates_table.initialize($("div#result_content"));


$("span#favorites_counter").empty();
$("span#favorites_counter").append(FAVORITES_ESTATES.count());




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
  //rent_search();
});

if ($('table#estates_table tbody tr.estate-row').size() > 0 ){
  $("table#estates_table tbody tr:odd").addClass("alt");
}



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
  url:'estate/result.js?dist_code='+dist_code+'&rooms='+rooms+'&page='+page+'&string='+search_string,
//  dataType: "js",
  beforeSend: function(){
    $('table#estates_table tbody').fadeOut('fast', function(){
       $('span.paging').empty();
       $('div#spinner').show();
       $('span#estates_result_count').empty();
    });
  },
  success: function(data){

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

function object_found(count) {
    $('span#estates_result_count').empty();
    $('span#estates_result_count').append(count);
}


var FAVORITES_ESTATES = new Object();

FAVORITES_ESTATES.add = function(estate_id){
  if ( $.cookie('user_id' == undefined) || $.cookie('user_id' == "")  ){
    var estates = FAVORITES_ESTATES.all();
    estates.push(estate_id);
    estates = $.unique(estates);
    var estates_string = estates.join(",");
    $.cookie("favorite_estates", estates_string, {path: "/"})
  }else {
    //TODO create ajax request to add to bookmarks
  }
  
};

FAVORITES_ESTATES.remove = function(id){
     if ( $.cookie('user_id' == undefined) || $.cookie('user_id' == "")  ){
        var estates = FAVORITES_ESTATES.all();
        var idx = estates.indexOf(id+"");
        if(idx != -1) estates.splice(idx, 1);
        //estates.erase(id+"");
        var estates_string = estates.join(",");
        $.cookie("favorite_estates", estates_string, {path: "/"})
     } else {
        //TODO create ajax request to add to bookmarks
     }
};

FAVORITES_ESTATES.all = function() {
  if ( $.cookie('user_id' == undefined) || $.cookie('user_id' == "") ){
    var estates_string = $.cookie("favorite_estates");
    var estates = [];
    if ( (typeof estates_string) == 'string' &&  estates_string && estates_string != "") {
      estates = estates_string.split(',');
    }
    return estates;
  } else{
    return g_favorites_estate_ids.split(",");
  }
};

FAVORITES_ESTATES.count = function() {
  return FAVORITES_ESTATES.all().length;
}

FAVORITES_ESTATES.exists = function(estate_id) {
    return $.inArray(estate_id + "", FAVORITES_ESTATES.all()) != -1 ;
//  return FAVORITES_ESTATES.all().contains(estate_id+"");
}

function FavoritesCounter(){
  
  this.label = $("span#favorites_counter");
  this.count = FAVORITES_ESTATES.count();


  this.increment = function() {
    this.change(+1);
  },
  
  this.decrement = function() {
    this.change(-1);
  },

  //private
  this.change = function(diff) {
    this.count = this.count + diff
    this.label.empty();
    this.label.append(this.count); //innerHTML = this.count;
  }
    
};

function FavoriteSwitcher(){
  this.initialize = function(container, estate_id) {
    var this_class = this;
    this.button = container.find("A");
    this.estate_id = estate_id;

    if (FAVORITES_ESTATES.exists(estate_id)) {
      this.button.addClass("selected");
    }
    this.button.bind('click', function(event) {
      event.preventDefault();
      this_class.toggle_favorite();
    });
  },

  this.toggle_favorite = function() {
    if (this.button.hasClass("selected")){
      FAVORITES_ESTATES.remove(this.estate_id);
      g_favorites_counter.decrement();
    } else {
      FAVORITES_ESTATES.add(this.estate_id);
      g_favorites_counter.increment();
    }
    this.button.toggleClass("selected");
  }
    
};

function EstatesTable(){

    this.initialize = function(container) {
        var this_object = this;
        this.description_extras = $(".description-extra");
        this.description_extra_button = $(".description-extra-button");
        this.side_bar_button = $(".side-bar-button");
        this.descriptions_expanded = false;
        this.description_extra_button.bind('click', function(event) {
            event.preventDefault();
            this_object.toggle_descriptions();
        });
        if (!g_side_bar.is(":visible")) {
            this.side_bar_button.innerHTML = "Показать правую колонку";
        }
        this.side_bar_button.bind('click', function(event) {
            event.preventDefault();
            this_object.toggle_side_bar();
        });
        this.estate_rows = $(".estate-row");
        this.estate_rows.each(function() {
            var favorite_container = $(this).find(".ob-addfav");
            var estate_id = $(this).attr("estate_id");
            var fav_swtch = new FavoriteSwitcher();
            fav_swtch.initialize(favorite_container, estate_id);
        });
//        this.toggle_map_button = container.getElement(".estates-table-toggle-map-button");
//        this.map_hidden = false;
//        this.toggle_map_button.addEvent('click', function(event) {
//            this_object.toggle_map();
//        });
    },

    this.toggle_descriptions =  function() {
        if (this.descriptions_expanded) {
            this.collapse_descriptions();
        } else {
            this.expand_descriptions();
        }
        this.descriptions_expanded = !this.descriptions_expanded;
    },

    this.expand_descriptions = function() {
        this.description_extras.each(function(extra) {
            extra.show();
        });
        this.description_extra_button.innerHTML = "коротко";
    },

    this.collapse_descriptions = function() {
        this.description_extras.each(function(extra) {
            extra.hide();
        });
        this.description_extra_button.innerHTML = "развернуто";
    },

    this.toggle_side_bar = function() {
        if (!g_side_bar.is(":visible")) {
            g_side_bar.show();
            this.side_bar_button.innerHTML = "Скрыть правую колонку";
        } else {
            g_side_bar.hide();
            this.side_bar_button.innerHTML = "Показать правую колонку";
        }
    },

    this.toggle_map = function() {
        if (this.map_hidden) {
            this.toggle_map_button.innerHTML = "Свернуть карту";
        } else {
            this.toggle_map_button.innerHTML = "Показать карту";
        }
        g_estates_search_map.toggle();
        this.map_hidden = !this.map_hidden;
    }
};


//$(document).ready(function(){
//    g_favorites_counter = new FavoritesCounter();
//});
