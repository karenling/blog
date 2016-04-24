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

  def copyright_text
    "&copy; Copyright 2016. Karen Ling. All Rights Reserved.".html_safe
  end
end
