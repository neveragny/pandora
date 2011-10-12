deploy_to = "/home/agny/pandora"
rails_root = "/home/agny/pandora"
pid_fild = "#{deploy_to}/shared/pids/unicorn.pid"
socket_file= "#{deploy_to}/shared/unicorn.sock"
log_file   = "#{rails_root}/log/unicorn.log"
err_log    = "#{rails_root}/log/unicorn_error.log"
old_pid    = pid_file + '.oldbin'

timeout 30
worker_processes 4 # Здесь тоже в зависимости от нагрузки, погодных условий и текущей фазы луны
listen socket_file, :backlog => 1024
pid pid_file
stderr_path err_log
stdout_path log_file

preload_app # master process load app before forking workers

GC.copy_on_write_friendly = true if GC.respond_to?(:copy_on_write_friendly=)

before_exec do |server|
  ENV["BUNDLE_GEMFILE"] = "#{rails_root}/Gemfile"
end


before_fork do |server, worker|
  # Before create first worker - master disconecting from DB.
  defined?(ActiveRecord::Base) and
  ActiveRecord::Base.connection.disconnect!

  # little magic reg. 0 downtime deploy.
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end
end

after_fork do |server, worker|
  # Once the worker create - connection to DB should be restored :)
  defined?(ActiveRecord::Base) and
  ActiveRecord::Base.establish_connection
end
