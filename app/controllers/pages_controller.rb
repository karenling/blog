class PagesController < ApplicationController
  def about
  end

  def contact
  end

  def send_contact
    error_message = validate_contact

    unless error_message.empty?
      flash.now[:error] = "Please enter #{error_message.to_sentence}."
      render :contact and return
    end

    ContactMailer.contact(params[:name], params[:email], params[:message]).deliver_now
    flash[:notice] = 'Message sent! I\'ll get back to you as soon as I can!'
    redirect_to contact_path
  end

  def validate_contact
    error_message = []
    error_message << 'your name' if params[:name].blank?
    error_message << 'your email address' if params[:email].blank?
    error_message << 'a valid email' if !params[:email].blank? && !params[:email].match(/@/)
    error_message << 'a message' if params[:message].blank?
    error_message
  end
end
