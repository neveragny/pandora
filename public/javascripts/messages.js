// Autocomplete user logins when sending the message
// if user has less then 100 friends then div#friends-json is populated with friends data which is then used for auto completion
// if user has more then 100 friends then request is sent to server and awaits for json in response


function buildElem(value) {
    return $('<div class="token" id="' + value + '"><span class="v">'
        + value + '</span><span class="remove-token">X</span></div>');
}

$(document).ready(function() {

    $('.remove-token').live('click', function() {
        removeToken($(this).parents('.token'));
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
                marginCoeficient = inputBox
                                      .clone(true)
                                      .hide()
                                      .appendTo('body').outerWidth(true) - origWidth - 1, // No idea why, but IE begs for this 1 px badly
                calcOffset = function() {
                    var items = container.children('.token'),
                            lastItem = $(items[items.length - 1]),
                            lastItemWidth = lastItem[0]?
                                    (lastItem.offset().left + lastItem.outerWidth(true)) : (inputBox.offset().left + marginCoeficient);
                    return ( containerRightPos() - lastItemWidth - marginCoeficient ) 
                },
                removeToken = function(token) {
                    token.remove();
                    var currentOffset = calcOffset();

                    if ( currentOffset < minWidth ) {
                        inputBox.width(origWidth);
                    } else {
                        inputBox.width(currentOffset);
                    }
                };

        inputBox.autocomplete({
            minLength: 1,
            source: $.licemerov.user.friends,
            focus: function(event, ui) {
                //     $('#message_recipient').val(ui.item.value);
                return false;
            },
            select: function( event, ui) {
                //$('#message_recipient').val(ui.item.value);
                // $('#please-avatar').val(ui.item.avatar);
                var elem = buildElem(ui.item.value)
                        .hide()
                        .appendTo('body'),
                        elemWidth = elem.outerWidth(true),
                        currentOffset = calcOffset();
                if (currentOffset > elemWidth) {
                    if ( (currentOffset - elemWidth) > minWidth ) {
                        inputBox.before( elem.show() )
                                .width( currentOffset - elemWidth ); 
                    } else {
                        inputBox.before( elem.show() )
                                .width( origWidth ); 
                    }
                } else {
                    inputBox.before( elem.show() )
                            .width( calcOffset() ); 
                }
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
