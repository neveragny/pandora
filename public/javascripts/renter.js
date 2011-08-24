var SearchListings = {
  setup: function() {
    $('#searchButton').click(function() {
      $('#search').submit();
      return false;
    });

    // Nav
//    var populate_neighborhoods = function(borough_id) {
//      var neighborhood_options = $('#neighborhoodOptions');
//      var neighborhood_dropdown = $('#neighborhoodDropdown');
//      var options = neighborhood_dropdown.find('.fancyDropdownOptions');
//      if(borough_id == "0") {
//        neighborhood_dropdown.unbind('click');
//        neighborhood_dropdown.find('.selected').html('&nbsp;');
//        neighborhood_options.html('');
//        $('#nids').val('');
//        return false;
//      }
//      neighborhood_dropdown.find('.selected').html('Loading...');
//      $.get('/listings/serp-neighborhood-dropdown/' + borough_id, function(html) {
//        neighborhood_options.html(html);
//        neighborhood_dropdown.fancyDropdown({multiple:true});
//        if($('#parentNeighborhoods').length > 0)
//          options.addClass('withParents');
//        else
//          options.removeClass('withParents');
//      });
//    };

    $('#boroughDropdown').fancyDropdown({afterSelect: function(id, parent) {
      $('#nids').val('');
      populate_neighborhoods(id);
    }});
		
    // on page load...
//    if($('#bid').length > 0) {
//      populate_neighborhoods($('#bid').val());
//    }
    $('.fancyDropdownMultiple').fancyDropdown({multiple:true});
    $('.fancyDropdown').fancyDropdown();
    $('#neighborhoodDropdown').click(function() {
      if($('#bid').val() == '0')
        alert('Please first select a borough before choosing a neighborhood');
    });
    
    $('#saveSearchButton').fancybox({
      'onComplete': function() {
        $(this).hide();
        ga_track_event('Listing Search', 'Click', 'Saved search');
      }
    });
  },
  highlightRow: function(self, is_selected) {
    if(is_selected) {
      $(self).addClass('highlightRow');
    } else {
      $(self).removeClass('highlightRow');
    }
  }
};

var Reviews = {
  setup: function() {
    if($('#reviewPublish').length > 0) {
      this.rating.setup();
      $('#previewReview').click(function() {
        var j_elm = $('#reviewPublish #thanksBoxWide');
        var url = '/renter/reviews/preview';
        if($('.edit_review').length > 0) {
          url = j_elm.attr('action').replace('publish', 'preview');
        }
        j_elm.attr('action', url);
        j_elm.submit();
        return false;
      });
      $('#editReview').click(function() {
        var j_elm = $('#reviewPreview');
        var url = '/renter/reviews/preview';
        if($('.edit_review').length > 0) {
          url = j_elm.attr('action').replace('publish', 'edit');
        }else if($('.new_review').length > 0) {
          url = j_elm.attr('action').replace('publish', 'new');
        }
        j_elm.attr('action', url);
        j_elm.submit();
        return false;
      });
    }      
  },
  rating: {
    setup: function() {
      var self = this;
      // click event
      this.select();
      // set hidden field values
      var hidden_fields = ['overall','honesty','reliability','listings'];
      $.each(hidden_fields, function(i, v) {
        var hf_id = '#review_' + v + '_rating';
        var rating = $(hf_id).val();
        
        if(rating != "") {
          rating = parseInt(rating);
        } else {
          return true;
        }
         
        $(hf_id).siblings('.star-rating').children('li').each(function() {
          var a = $(this).children('a');
          var r = parseInt( a.html() );
          if(r == rating) {
            self.highlight(a);
          }
        });
      });
    },
    select: function() {
      var self = this;
      $('.star-rating li a').click(function() {
        self.highlight(this);
        return false;
      });
    },
    highlight: function(parent) {
      var rating = parseInt($(parent).html());
      
      $(parent).parent('li').siblings('li').each(function() {
        var r = parseInt($(this).children('a').html());
        $(this).removeClass('current-rating');
        if(r <= rating) {
          $(this).addClass('current-rating');
        }
      });
      $(parent).parent('li').addClass('current-rating');
      // add value to hidden field
      $(parent).parent('li').parent('ul').parent('.row').find('input').val(rating);
    }
  }
};

var RenterProfile = {
  setup: function() {
    if($('#renter_signup').length > 0) {
      this.neccessityRating.setup();
      this.signup();
      this.credit_check();
    }
    
    if($('#renter_profile, #preferences').length > 0) {
      this.neccessityRating.setup();
      
      var survey_elm = $('#emailNotificationsSurvery');
      $('#user_notify_by_email_false').click(function() {
        if($(this).is(':checked')) survey_elm.show();
      });
      
      $('#user_notify_by_email_true').click(function() {
        if($(this).is(':checked')) survey_elm.hide();
      });
    }

    $('#selectApartmentSize .checkboxContSm, .boroughs .checkboxCont').click(function(event) {
      if(event.target.nodeName.toLowerCase() == 'input') return true;
      var i = $(this).children('input');
      i.attr('checked', !i.is(':checked'));
      return false;
    });

    
    // show/hide help comments onfocus
    $.each(['email', 'phone', 'salary', 'credit', 'guarantor'], function(index, id) {
      $('#' + id + ' input').focus(function() {
        $('#' + id + ' .help').fadeIn('fast');
        return false;
      }).focusout(function() {
        $('#' + id + ' .help').fadeOut('fast');
        return false;
      });
    });
    
  },
  agree_to_terms: function(elm) {
    // have they agreed to the terms?
    if($('#agreeToTerms').attr('checked') == false) {
      alert('You must agree to the Naked Apartments Terms of Service before continuing.');
      return false;
    }
  },
  signup: function() {
    // once this is added to broker side, need to move to global function
    var other = $('#renter_user_referral_other');
    var dropdown = $('#userReferralOption');
    // setup event
    dropdown.change(function() {
      if($(this).val() == "999") {
        other.show();
      } else {
        other.hide();
      }
    });

    if(dropdown.val() == "999") {
      other.show();
    }

    var after_submit = function(elm) {
        $('.formActions').html(ajax_loader_centered());
    };

    submit_button('#renterSignupSelfReport', {
      before_submit: this.agree_to_terms,
      after_submit: after_submit
    });
  },
  credit_check: function() {
    // self report
    submit_button('#submitRenterSelfReport', {
      before_submit: this.agree_to_terms,
      after_submit: function(elm) {
        $('.formActions').html(ajax_loader());
      }
    });

    // credit check through ZIP
    submit_button('#submitRenterCreditCheck', {
      before_submit: this.agree_to_terms,
      after_submit: function(elm) {
        $(elm).after(ajax_loader());
        $(elm).hide();
      }
    });
    
    // auto tab
    $('#dob_month, #dob_day, #dob_year').autotab_magic();
    $('#credit_check_ssn_1, #credit_check_ssn_2, #credit_check_ssn_3').autotab_magic();
  },
  neccessityRating: {
    setup: function() {
      var rating_elm = $('#renter_necessity_rating');
      $('#necessityRatingSlider').slider({
        value: rating_elm.val(),
        min: 1,
        max: 10,
        step: 1,
        slide: function(event, ui) {
          rating_elm.val(ui.value);
        }
      });
    }
  }
};

var RenterHomepage = {
  setup: function() {
    $('.modsub ul li').naSimpleTabs();
    
    $('#home .invitedOffer a').click(function() {
      var self = this;
      $('#TB_window').unload(function() {
        if($('#suggestedListings tr').length == 1) {
          refresh_page();
          return false;
        }
        // fade out + remove row
        $(self).parents('tr').fadeOut('fast').remove();
      });
      return false;
    });
  }
};

var AnonymousRenter = {
  alert: {
    init: function(open_modal) {
      var self = this;
      if(open_modal && $.cookie('anon_renter_suggestions') != '1') {
        $.fn.colorbox({
          inline: true,
          open: true,
          href: '#anonymousSuggestionsContainer',
          onComplete: function(){
            self.form();
            ga_track_event('Listing Search', 'Open', 'listings alert: signup form');
          },
          onClosed: self.disable
        });
      }
      
      $('#renterSearchAlert').colorbox({
        inline: true,
        href: '#anonymousSuggestionsContainer',
        onComplete: function(){
          self.form(true);
          ga_track_event('Listing Search', 'Click', 'listings alert: signup form');
        }
      });
    }, 
    form: function(remove_serp_button) {
      var self = this;
      $('#noThanks').click(function() {
        $.colorbox.close();
        ga_track_event('Listing Search', 'Click', 'listings alert: no thanks');
      });
      rollover_button('#cboxLoadedContent .btnGreen');
      
      // AJAX form
      var options = {
        'success': function(response) {
          $("#cboxLoadedContent").html(response);
          $.colorbox.resize();
          
          if($('#errorExplanation').length > 0) {
            self.form();
            submit_button('#cboxLoadedContent .submitButton');
          } else {
            if(remove_serp_button)
              $('#renterSearchAlert').hide();
            self.disable();
          }
        }
      };
      $('#anonSuggestionSignup form').ajaxForm(options);
    },
    disable: function() {
      $.cookie('anon_renter_suggestions', '1');
    }
  }
};

var RenterPagination = {
  setup: function (){
    $(".paging a").each(function(i, val) {
        $(this).click(function(event){
            event.preventDefault();
            $('input[name="page"]').val($(this).attr("id"));
            $('form.renter').submit();
        });
    });
}
};




(function($) {
  /**
   * Listing Favorites Buttons
   */
  $.fn.listingFavoriteButtons = function(callback) {
    var sel = this;
    $(sel).click(function() {
      var elm = this;
      
      is_span = elm.nodeName.toLowerCase() == 'span'

      if(is_span)
        elm = $(elm).children('a');

      // ajax request
      var listing_id = $(elm).attr('data-id');
      var type = ($(elm).attr('href').search('add_') != -1) ? 'add' : 'delete'

      $.getJSON($(elm).attr('href') + '.json', function(data) {
        if(data.success) {
         if(typeof callback == 'function')
          callback(listing_id, type);
        }
      });
			
      // update button
      if(type == 'add') {
        $(elm).attr('href', $(elm).attr('href').replace('add_', 'delete_'));
        if(is_span)
          $(elm).parent().addClass('favorited');
        else
          $(elm).addClass('favorited');

				ga_track_event('Site Wide', 'Click', 'listing: add favorite');
      } else {
        $(elm).attr('href', $(elm).attr('href').replace('delete_', 'add_'));
        if(is_span)
          $(elm).parent().removeClass('favorited');
        else
          $(elm).removeClass('favorited');
      }

      return false;
    });
  };

})(jQuery);


/* AJAX HELPER FUNCTIONS EXTENDED ************************************ */
Ajax = $.extend(Ajax, {
  get_broker_profile: function(url, elm) {
    if($(elm).html() == '') {
      $(elm).html(ajax_loader_centered());

      // ajax request
      $.get(url, {partial:1}, function(html) {
        $(elm).html(html);
        new ContactAgent();
      });
    }
  }
});


$(document).ready(function() {
  try {
    SearchNav.setup();
  } catch(e) {}
  SearchListings.setup();
  Reviews.setup();
  RenterProfile.setup();
  RenterHomepage.setup();
  RenterPagination.setup();

  $('#listingDetail .favorite:not(.infoModal)').listingFavoriteButtons();
  $('#listingSERPOuter .favorite').listingFavoriteButtons(function(listing_id, type) {
    if(type == 'delete') {
      $('#listing_' + listing_id + '_row1, #listing_' + listing_id + '_row2').remove();
      if($('#listingSERPTable tbody tr').length == 0)
        refresh_page();
    }
  });
  $('#favoritedListings .favorite').listingFavoriteButtons(function(listing_id, type) {
    if(type == 'delete') {
      $('#listing_favorite_' + listing_id).remove();
      if($('#favoritedListings tbody tr').length == 0)
        refresh_page();
    }
  });
});
