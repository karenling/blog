class ContactMailer < ApplicationMailer
  def contact(name, email, message)
    @name = name
    @email = email
    @message = message

    mail to: ENV['EMAIL_ADDRESS'], subject: 'Something'
  end
end
