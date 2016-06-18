class Api::PagesController < ApplicationController
  def send_contact
    error_message = validate_contact

    unless error_message.empty?
      render json: "Please enter #{error_message.to_sentence}.", status: :unprocessable_entity
      return
    end

    ContactMailer.contact(params[:name], params[:email], params[:message]).deliver_now
    render json: { status: 'success', message: 'Message sent! I\'ll get back to you as soon as I can!' }
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
