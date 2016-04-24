module ApplicationHelper
  def flash_class
    if flash[:notice]
      'bg-success'
    elsif flash[:error]
      'bg-danger'
    elsif flash[:alert]
      'bg-warning'
    end
  end
end
