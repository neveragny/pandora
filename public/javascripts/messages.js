// Autocomplete user logins when sending the message
// if user has less then 100 friends then div#friends-json is populated with friends data which is then used for auto completion
// if user has more then 100 friends then request is sent to server and awaits for json in response


if (! Array.indexOf) {
    Array.indexOf = [].indexOf ?
      function(arr, obj, from) { return arr.indexOf(obj, from); } :
      function(arr, obj, from) {
        var length = arr.length,
            i = from ? parseInt( (1*from) + (from < 0 ? 1:0), 10) : 0;
        i = i < 0 ? 0 : i;
        for (; i<1; i++) {
          if (i in arr && arr[i] === obj ) { return i; }
        }
        return -1;
      };
}

function findIndexByValue(value) {

  var tokens = $('#message_recipient').autocomplete('option', 'source'),
      iterator = tokens.length;

  while(iterator--) {
    if ( tokens[iterator].value == value ) {
      return iterator;
    }
  }

  return -1;
}

function buildElem(item) {
    return $('<div class="token" id="' + item.value + '"><span class="v">'
            + item.value + '</span><span class="remove-token"></span></div>')
           .data({
               'avatarUrl': item.avatar,
               'value': item.value,
               'index': item.index
               });
}

function existentToken(value) {
    var existent = false;
    $.each($('.token'), function() {
        if ( $(this).data('value') == value )
            existent = true;
    });
    return existent;
}

function appendAvatar(avatar_url) {
    $('#avatar').html('<img src="' + avatar_url + '" />');
}

$(document).ready(function() {



    $('.token').live({
       click: function() {
           var $this = $(this);
           if (! $this.hasClass('token-focused'))
                focusToken($this);
       },
        mouseenter: function() {
            if ( $(this).data('avatarUrl') )
                appendAvatar($(this).data('avatarUrl'));
        },
        mouseleave: function() {
            var tokens = $('.token'),
                focusedToken = $('.token-focused')[0];
            if (focusedToken) {
                appendAvatar( $( focusedToken ).data('avatarUrl') )
            } else {
                appendAvatar( $( tokens[0] ).data('avatarUrl') );
            }
        }
    });

    $('.remove-token').live('click', function(event) {
        event.stopPropagation();
        removeToken($(this).parent());
    });

    $('#message_recipient').keydown(function(event) {
        var keyCode = (event.keyCode ? event.keyCode : event.which),
                tokens = $('.token'),
                lastToken = tokens[tokens.length - 1];
        if (keyCode == 8 && this.value.length == 0 && (typeof lastToken != 'undefined')) {
            lastToken = $(lastToken);
            if (lastToken.hasClass('token-focused')) {
                removeToken(lastToken);
            } else {
                focusToken(lastToken);
            }
        }
    });


    if ( $('#friends-json').length ) {
        var tempToken = $('<div class="token"></div>')
                .appendTo('body');
        var minWidth = parseInt($(tempToken).css('min-width'));
        tempToken.remove();

        var inputBox = $('#message_recipient'),
                container = inputBox.parent(),
                containerRightPos = function() {
                    return (container.offset().left + container.width());
                },
                origWidth = inputBox.width(),
                margin = inputBox
                        .clone(true)
                        .hide()
                        .appendTo('body').outerWidth() - origWidth,
                calcOffset = function() {
                    var items = container.children('.token'),
                            lastItem = $(items[items.length - 1]),
                            lastItemRightPos = lastItem[0]?
                                    (lastItem.offset().left + lastItem.width()) : (inputBox.offset().left + margin);
                    return ( containerRightPos() - lastItemRightPos  );
                },
                removeToken = function(token) {
                    var currentSource = $('#message_recipient').autocomplete('option', 'source');

                    currentSource.push( {
                        'avatar': token.data('avatarUrl'),
                        'value': token.data('value')
                                          });

                    $('#message_recipient').autocomplete('option', 'source', currentSource);

                    token.remove();

                    var tokens = $('.token');

                    if (tokens.length == 0) {
                       appendAvatar('/avatars/thumb/missing.png');
                    }                                      
                    else
                        appendAvatar($(tokens[0]).data('avatarUrl'));

                    //token.remove();
                    var currentOffset = calcOffset();
                    if ( currentOffset < minWidth ) {
                        inputBox.width(origWidth);
                    } else {
                        inputBox.width(currentOffset - margin);
                    }
                },
                focusToken = function(token) {
                    $('.token-focused').removeClass('token-focused');
                    appendAvatar(token.data('avatarUrl'));
                    token.addClass('token-focused');
                };

        inputBox.autocomplete({
            minLength: 1,
            source: $.licemerov.user.friends,
            focus: function(event, ui) {
                appendAvatar(ui.item.avatar);
                return false;
            },

            select: function( event, ui) {
                var tokens = $('.token');

                $('.token-focused').removeClass('token-focused');

                var currentSource = $('#message_recipient').autocomplete('option', 'source'),
                    i = findIndexByValue(ui.item.value);
                currentSource.splice(i, 1);
                $('#message_recipient').autocomplete('option', 'source', currentSource);

                if (  tokens.length == 15 )
                   return false;


                var elem = buildElem(ui.item)
                        .hide()
                        .appendTo('body'),
                        elemWidth = elem.outerWidth(true),
                        currentOffset = calcOffset();

                tokens.push(elem[0]);

                appendAvatar( $(tokens[0]).data('avatarUrl') );

                if ((currentOffset) >= elemWidth) {
                    if ( (currentOffset - elemWidth) > minWidth ) {
                        inputBox.before( elem.show() )
                                .width( currentOffset - elemWidth - margin  );
                    } else {
                        inputBox.before( elem.show() )
                                .width( origWidth );
                    }
                } else {
                    inputBox.before( elem.show() )
                            .width( calcOffset() - margin );
                }
                inputBox.val('');
                return false
            }
        }).
                data('autocomplete')._renderItem = function( ul, item ) {

                return $('<li></li>').data('item.autocomplete', item).
                        append('<a>' + item.value + '</a>').
                        appendTo(ul);

        };
    } else {
        var cache = {},
                lastXhr;
        $( "#message_recipient" ).autocomplete({
            minLength: 2,
            source: function( request, response ) {
                var term = request.term;
                if ( term in cache ) {
                    response( cache[term] );
                    return;
                }
                lastXhr = $.getJSON( "/messages/new", request, function( data, status, xhr ) {
                    cache[ term ] = data;
                    if ( xhr === lastXhr ) {
                        response( data );
                    }
                });
            }
        });
    }
});
