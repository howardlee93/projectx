
class User < ApplicationRecord
	validates :email, :first_name, :last_name, :password_digest, :session_token, presence: true 
	validates :password, length: {minimum: 6, allow_nil: true}

	has_many :reservations,
		primary_key: :id,
		foreign_key: :user_id,
		class_name: :Reservation

	has_many :reviews,
		primary_key: :id,
		foreign_key: :user_id,
		class_name: :Review

	has_many :favorites

	has_many :favorited_restaurants,
		through: :favorites,
		source: :restaurant


	attr_reader :password

	after_initialize :ensure_session_token

	def self.find_by_credentials(email, password)
		user = User.find_by(email: email)
		user && user.is_password?(password) ? user : nil
	end 


	def password=(password)
		@password = password
		self.password_digest = BCrypt::Password.create(password)
	end 

	def is_password?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)

	end 

	def reset_session_token!
		self.session_token = SecureRandom.urlsafe_base64
		self.save!
		self.session_token
	end 

	def ensure_session_token
		self.session_token ||= SecureRandom.urlsafe_base64
	end 


end




