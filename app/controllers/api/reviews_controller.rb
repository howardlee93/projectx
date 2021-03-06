class Api::ReviewsController < ApplicationController
	
	def index
		current_restaurant = Restaurant.find(params[:restaurantId]) if params[:restaurantId]
		if current_restaurant
			@reviews = current_restaurant.reviews.order(:created_at)
		else
			render json: ["Restauarant not found "], status: 404 
		end 
	end 

	def show
		@review = Review.find(params[:id])
	end

	def create
		@review = Review.new(review_params)
		if @review.save
			@review
			render :show
		else
			render json: @review.errors.full_messages, status: 422 
		end 
	end 

	def destroy
		review = Review.find(params[:id])
		if review
			review.destroy
			render json: review
		else 
			render json: ["Review does not exist"], status: 404 
		end  
	end 

	def update
		@review = Review.find(params[:id])
		if @review.update_attributes(review_params)
			render :show
		else 
			render json: @review.errors.full_messages, status: 422
		end 
	end 

	private 
	def review_params
		params.require(:review).permit(:user_id,
										:restaurant_id,
										:rating,
										:comment)
	end 
end
