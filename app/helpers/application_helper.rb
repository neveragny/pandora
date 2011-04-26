module ApplicationHelper
  def get_traffic
    traffic = Hash.new
    agent = Mechanize.new { |a|
      a.user_agent_alias = 'Mac Safari'
      a.read_timeout=100 }
    begin
      xml = Nokogiri::HTML(agent.get_file('http://jgo.maps.yandex.net/trf/stat.xml'))
    rescue Exception => e
      logger.debug("ERROR:ApplicationHelper.get_traffic: cant get xml from yandex, gentle reminder to check connection")
      logger.debug(e)
    end
    traffic["time"] = xml ? xml.xpath("//region[@id='143']/localtime").text : ""
    traffic["level"] = xml ? xml.xpath("//region[@id='143']/level").text : ""
    traffic["info"] = xml ? xml.xpath("//region[@id='143']/hint").text : ""
    traffic["icon"] = xml ? xml.xpath("//region[@id='143']/icon").text + ".png" : "green.png"
    traffic["level"] = case traffic["level"]
        when "0" then "0 баллов"
        when "1" then "1 балл"
        when "2" then "2 балла"
        when "3" then "3 балла"
        when "4" then "4 балла"
        when "5" then "5 баллов"
        else "#{traffic["level"]} баллов"
    end

    logger.debug("######################")
    logger.debug(traffic)
    traffic
  end
end
