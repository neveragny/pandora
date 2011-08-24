$(document).ready(function() {  
   applesearch.init();

//

   $("input#srch_fld").bind('onkeyup', function(event) {
            //event.preventDefault();
            applesearch.onChange('srch_fld','srch_clear');
        });

//if ($.cookie('favorite_estates') == null ){
//   $.cookie('favorite_estates', '.', '', '/','nomoveton.co.ua', '');
//}
//else {
//}

g_side_bar = $("div#side_bar");

user_session = $.cookie('user_credentials');
if ( (typeof user_session) == 'string' &&  user_session && user_session != ""){

   g_favorites_estate_ids = $.ajax({
      url:'/estate/all_bookmarks.json',
      dataType: "json" ,
      async: false,
      complete: function(data){
        g_favorites_estate_ids = data;
      }
    }).responseText;

}

g_favorites_counter = new FavoritesCounter();

g_estates_table = new EstatesTable();

g_estates_table.initialize($("div#result_content"));

ajax_pagination();





$("span#favorites_counter").empty();
$("span#favorites_counter").append(FAVORITES_ESTATES.count());




//$('div.estate_search1 input').bind("keypress" ,function(e){
//  if (e.keyCode == 13) {
//    rent_search();
//  }
//});
//
//$("select#district_id").bind('change',function () {
//  $("span#sel_dist").html($("select#district_id option:selected ").text());
//
//});
////
//
//$("select#rooms_num").bind('change', function(){
//  $("span#sel_rooms").html($("select#rooms_num option:selected ").text());
//});
//
////
//
//$('span#search_rent a').bind('click', function(){
//  //rent_search();
//});

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


$("span#search_rent a").click(
        function(event){
            event.preventDefault();
            doSearch();
        }
)


}); // DOCUMENT ON_READY END

oControl= new function (par1, par2) {
    var self= this;
    var val1= par2 * 2;
    var t1;

    var privatF1= function (par3) {
        return par1 + par3 + val1;
    };

    self.pubF1= function (par4) {
        t1= setTimeout(function() {privatF1(par4)}, 50);
    };
} ('abc', 123);

// FUNCTIONS


$('form#new_rent').bind('ajax:complete', function(event, xhr, status){
    $('input#rent_page').val("1");
});


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
      url:'/estate/result.js?dist_code='+dist_code+'&rooms='+rooms+'&page='+page+'&string='+search_string,
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



function object_found(count) {
    $('span#estates_result_count').empty();
    $('span#estates_result_count').append(count);
}


var FAVORITES_ESTATES = new Object();

FAVORITES_ESTATES.add = function(estate_id){
  var user_session = $.cookie('user_credentials');
  if ( typeof user_session === 'string' &&  user_session && user_session != ""){
    $.ajax({
      url:'/estate/add_to_bookmarks.json?rent_id='+estate_id,
      dataType: "json",
      success: function(data){}
    });
  }else {
    var estates = FAVORITES_ESTATES.all();
    estates.push(estate_id);
    estates = $.unique(estates);
    var estates_string = estates.join(",");
    $.cookie("favorite_estates", "null");
    $.cookie("favorite_estates", estates_string, '','/','nomoveton.co.ua','')
  }

};

FAVORITES_ESTATES.remove = function(id){
     var user_session = $.cookie('user_credentials');
     if ( (typeof user_session) == 'string' &&  user_session && user_session != ""){
       $.ajax({
         url:'/estate/remove_from_bookmarks.json?rent_id='+id,
         dataType: "json"//,
//         success: function(data){
//         }
       });

     } else {
        var estates = new Array(FAVORITES_ESTATES.all());
        var idx = estates.indexOf(id+"");
        if(idx != -1) estates.splice(idx, 1);
        //estates.erase(id+"");
        var estates_string = estates.join(",");
        eraseCookie("favorite_estates");
        setCookie("favorite_estates", estates_string, 7)
     }
};

FAVORITES_ESTATES.all = function() {
  var user_session = $.cookie('user_credentials');
  var favorite_estates = $.cookie("favorite_estates");
  if ( (typeof user_session) == 'string' &&  user_session && user_session != "") {
    return g_favorites_estate_ids.split(',');
  } else{
    if( favorite_estates  != null){
      return favorite_estates.split(',');
    }
    
//    estates = estates_string.length == 0 ? [] : estates_string.split(',');
    return [];
  }
};

FAVORITES_ESTATES.count = function() {
  return FAVORITES_ESTATES.all().length;
}

FAVORITES_ESTATES.exists = function(estate_id) {
    return $.inArray(estate_id + "", FAVORITES_ESTATES.all()) != -1 ;
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
    this.label.append(this.count);
  }
    
}

function FavoriteSwitcher(){
  this.initialize = function(container, estate_id) {
    var this_class = this;
    this.button = container.find("A");
    this.estate_id = estate_id;

    if (FAVORITES_ESTATES.exists(estate_id)) {
      this.button.addClass("selected");
    }
    this.button.live('click', function(event) {
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
        this.side_bar_button = $("a.side-bar-button");
        this.descriptions_expanded = false;
        if ($('table#estates_table tbody tr.estate-row').size() > 0 ){
          $("table#estates_table tbody tr:odd").addClass("alt");
        }
        this.description_extra_button.bind('click', function(event) {
            event.preventDefault();
            this_object.toggle_descriptions();
        });
        if (!g_side_bar.is(":visible")) {
            this.side_bar_button.innerHTML = "Показать хуй правую колонку";
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
            //extra.show();
            $(this).removeClass('hide');
        });
        this.description_extra_button.html("коротко");
    },

    this.collapse_descriptions = function() {
        this.description_extras.each(function(extra) {
            //extra.hide();
            $(this).addClass('hide');
        });
        this.description_extra_button.html("развернуто");
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
}

//function ajax_pagination(){
//    $(".paging a").each(function(i, val) {
//        $(this).click(function(event){
//            event.preventDefault();
//            $('input[name="rent[page]"]').val($(this).attr("id"));
//            $('form.new_rent').submit();
//        });
//    });
//}