module ApplicationHelper
# encoding: utf-8
  def favorited?(rent)
    rent.user_fav_in.include? @current_user.id if @current_user
  end

  def link_to_favorite(rent)
    favorited =  favorited?(rent)
    link_to '', "/renter/#{favorited ? 'delete': 'add'}_favorite/#{rent.id}",
            :class => "faveBtn #{favorited ? 'favorited': 'favorite'} naTool tooltip mouseover noBorde ",
            "data-id" => rent.id,
            :title => t(:add_rentfavorite)
  end

  def time_ago(from_time, to_time=Time.now, options = {})
    from_time = from_time.to_time if from_time.respond_to?(:to_time)
    to_time = to_time.to_time if to_time.respond_to?(:to_time)
    distance_in_minutes = (((to_time - from_time).abs)/60).round
    distance_in_seconds = ((to_time - from_time).abs).round
    
    I18n.with_options :locale => options[:locale] do |locale| 
    case distance_in_minutes
      when 0..1
         return distance_in_minutes == 0 ?
           locale.t(:less_than_x_minutes, :count => 1) :
           locale.t(:x_minutes, :count => distance_in_minutes) unless include_seconds

        case distance_in_seconds
          when 0..59 then locale.t :less_than_one_minutes, :count => 1
          else locale.t :x_minutes, :count => 1
        end

      when 2..4 then locale.t :two_four_minutes, :count => distance_in_minutes
      when 5..44 then locale.t :x_minutes, :count => distance_in_minutes
      when 45..89 then locale.t :about_one_hour
      when 90..240 then locale.t :about_x_hours, :count => (distance_in_minutes.to_f / 60.0).round # 2..4 chasa
      when 241..1200 then locale.t :x_hours_chasov, :count => (distance_in_minutes.to_f / 60.0).round       #5..20 chasov
      when 1260..1319 then locale.t :x_hours_21, :count => 21
      when 1440..2519 then locale.t :x_day, :count => 1
      when 2520..43199 then locale.t :x_days, :count => (distance_in_minutes.to_f / 1440.0).round
      when 43200..86399 then locale.t :about_x_months, :count => 1
      when 86400..525599 then locale.t :x_months, :count => (distance_in_minutes.to_f / 43200.0).round
      else
      end
   end
end
end

