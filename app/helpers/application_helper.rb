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

  def ajax_response(view_name)
    respond_to do |format|
      format.html { render view_name }
      format.js { render view_name, formats: [:js], handlers: [:erb] }
    end
  end
end
