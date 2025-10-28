import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SpecialOffers = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      offerId: 1,
      userName: "Emma Watson",
      userAvatar: "/images/c1.jpg",
      rating: 4.5,
      comment: "The free skin test was incredibly accurate! Recommended products actually worked for my skin type.",
      timestamp: "2 hours ago",
      likes: 24,
      liked: false
    },
    {
      id: 2,
      offerId: 2,
      userName: "Sarah Johnson",
      userAvatar: "/images/c2.jpg",
      rating: 5,
      comment: "BOGO offer is legit! Got my favorite serum and a free moisturizer. Amazing deal!",
      timestamp: "1 day ago",
      likes: 42,
      liked: true
    },
    {
      id: 3,
      offerId: 3,
      userName: "Minaal",
      userAvatar: "/images/c3.jpg",
      rating: 4,
      comment: "App discount was easy to apply. Smooth checkout process.",
      timestamp: "3 days ago",
      likes: 15,
      liked: false
    },
    {
      id: 4,
      offerId: 4,
      userName: "Ena Millie",
      userAvatar: "/images/c3.jpg",
      rating: 4.5,
      comment: "Summer skincare package saved my skin from sun damage. Highly recommend!",
      timestamp: "5 days ago",
      likes: 31,
      liked: false
    },
    {
      id: 5,
      offerId: 5,
      userName: "Priya Sharma",
      userAvatar: "/images/c2.jpg",
      rating: 5,
      comment: "Used the money-back guarantee when a product didn't work for me. Full refund with no questions asked!",
      timestamp: "1 week ago",
      likes: 56,
      liked: true
    },
    {
      id: 6,
      offerId: 6,
      userName: "David Wilson",
      userAvatar: "/images/c1.jpg",
      rating: 4.8,
      comment: "The free consultation helped me identify my skin issues. Doctor was very knowledgeable.",
      timestamp: "2 weeks ago",
      likes: 38,
      liked: false
    }
  ]);

  const [activeOffer, setActiveOffer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([1, 2]); // Default selected products

  const features = [
    {
      id: 1,
      title: "FREE Skin Test",
      description: "Discover your perfect skincare match with our advanced AI-powered skin analysis",
      image: "/images/free-skin.png",
      bgGradient: "from-blue-100 to-cyan-200",
      textColor: "text-blue-700",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      icon: "🔍",
      averageRating: 4.7,
      reviewCount: 128
    },
    {
      id: 2,
      title: "Buy One Get One",
      description: "Double the joy! Get another product free when you purchase selected items",
      image: "/images/bogo-offer.png",
      bgGradient: "from-yellow-100 to-orange-200",
      textColor: "text-amber-700",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      icon: "🎁",
      averageRating: 4.8,
      reviewCount: 96
    },
    {
      id: 3,
      title: "15% Off First App Purchase",
      description: "Download our mobile app and get 15% off your first order",
      image: "/images/app-discount.png",
      bgGradient: "from-purple-100 to-pink-300",
      textColor: "text-purple-700",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      icon: "📱",
      averageRating: 4.5,
      reviewCount: 87
    },
    {
      id: 4,
      title: "10% Off Summer Skincare",
      description: "Stay protected and save with our special summer skincare collection",
      image: "/images/summer-skincare.png",
      bgGradient: "from-green-50 to-teal-50",
      textColor: "text-green-700",
      buttonColor: "bg-green-600 hover:bg-green-700",
      icon: "☀️",
      averageRating: 4.6,
      reviewCount: 72
    },
    {
      id: 5,
      title: "100% Money-Back Guarantee",
      description: "Not satisfied? We offer full refunds for any skin concerns with proof",
      image: "/images/money-back.png",
      bgGradient: "from-emerald-50 to-cyan-50",
      textColor: "text-emerald-700",
      buttonColor: "bg-emerald-600 hover:bg-emerald-700",
      icon: "💰",
      averageRating: 4.9,
      reviewCount: 153
    },
    {
      id: 6,
      title: "Free Doctor's Consultation",
      description: "Get expert advice from certified dermatologists completely free",
      image: "/images/doctor-consultation.png",
      bgGradient: "from-indigo-50 to-blue-50",
      textColor: "text-indigo-700",
      buttonColor: "bg-indigo-600 hover:bg-indigo-700",
      icon: "👨‍⚕️",
      averageRating: 4.8,
      reviewCount: 201
    }
  ];

  // Frequently bought together products data
  const frequentlyBoughtProducts = [
    {
      id: 1,
      name: "Glowriva Body Mist Floral",
      variant: "FLORAL",
      originalPrice: 760,
      price: 605,
      image: "/images/floral.jpg",
      rating: 4.8,
      size: "250ml"
    },
    {
      id: 2,
      name: "Glowriva Body Mist Extreme",
      variant: "EXTREME",
      originalPrice: 700,
      price: 600,
      image: "/images/Extreme.jpg",
      rating: 4.7,
      size: "250ml"
    }
  ];

  const shippingOffer = {
    title: "Shipping Offer",
    description: "Free Shipping",
    details: "Glowriva Deals Free Delivery from ৳999 Taka",
    expiryDate: "Jan 1, 2026"
  };

  const handleLike = (reviewId) => {
    setReviews(reviews.map(review => {
      if (review.id === reviewId) {
        return {
          ...review,
          likes: review.liked ? review.likes - 1 : review.likes + 1,
          liked: !review.liked
        };
      }
      return review;
    }));
  };

  const handleAddReview = (offerId, rating, comment) => {
    const newReview = {
      id: Date.now(),
      offerId,
      userName: "You",
      userAvatar: "/images/c3.jpg",
      rating,
      comment,
      timestamp: "Just now",
      likes: 0,
      liked: false
    };
    
    setReviews([newReview, ...reviews]);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    
    return stars;
  };

  const toggleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const calculateTotal = () => {
    return frequentlyBoughtProducts
      .filter(product => selectedProducts.includes(product.id))
      .reduce((total, product) => total + product.price, 0);
  };

  const calculateSavings = () => {
    const originalTotal = frequentlyBoughtProducts
      .filter(product => selectedProducts.includes(product.id))
      .reduce((total, product) => total + product.originalPrice, 0);
    
    const discountedTotal = frequentlyBoughtProducts
      .filter(product => selectedProducts.includes(product.id))
      .reduce((total, product) => total + product.price, 0);
    
    return (originalTotal - discountedTotal);
  };

  const ReviewSection = ({ offerId }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(5);
    const offerReviews = reviews.filter(review => review.offerId === offerId);
    
    return (
      <div className="mt-6 border-t pt-4">
        <h4 className="font-semibold mb-3 dark:text-white">Customer Reviews</h4>
        
        {/* Add Review Form */}
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="flex items-center mb-3">
            <span className="mr-2 dark:text-gray-300">Rate this offer:</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)}
                  className="text-2xl focus:outline-none"
                >
                  {star <= rating ? 
                    <span className="text-yellow-400">★</span> : 
                    <span className="text-gray-300">★</span>
                  }
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="w-full p-3 border rounded-lg mb-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows="3"
            placeholder="Share your experience with this offer..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            onClick={() => {
              handleAddReview(offerId, rating, comment);
              setComment("");
            }}
            disabled={!comment.trim()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Post Review
          </button>
        </div>
        
        {/* Reviews List */}
        {offerReviews.length > 0 ? (
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {offerReviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <div className="flex items-start">
                  <img 
                    src={review.userAvatar} 
                    alt={review.userName}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h5 className="font-medium dark:text-white">{review.userName}</h5>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{review.timestamp}</span>
                    </div>
                    <div className="flex items-center my-1">
                      <div className="flex mr-2">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={() => handleLike(review.id)}
                        className={`flex items-center mr-4 ${review.liked ? 'text-blue-600' : 'text-gray-500'}`}
                      >
                        {review.liked ? '❤️' : '🤍'} 
                        <span className="ml-1 dark:text-gray-300">{review.likes}</span>
                      </button>
                      <button className="text-gray-500 flex items-center dark:text-gray-400">
                        💬 <span className="ml-1">Reply</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </div>
    );
  };

  const FrequentlyBoughtTogether = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-16 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Frequently Bought Together
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Products List */}
          <div className="space-y-6">
            {frequentlyBoughtProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -5 }}
                className={`flex items-center p-4 rounded-2xl border-2 ${
                  selectedProducts.includes(product.id) 
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20' 
                    : 'border-gray-200 dark:border-gray-700'
                } transition-colors cursor-pointer`}
                onClick={() => toggleProductSelection(product.id)}
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                </div>
                
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-800 dark:text-white">
                    {product.name}
                  </h3>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {product.size}
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-lg font-bold text-gray-800 dark:text-white">
                      ৳{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ৳{product.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-2">
                    <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {product.variant}
                    </span>
                  </div>
                </div>
                
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedProducts.includes(product.id) 
                    ? 'bg-pink-500 border-pink-500' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {selectedProducts.includes(product.id) && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Shipping Offer */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-700">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-800 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-300 font-bold">02</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{shippingOffer.title}</h3>
                  <p className="text-blue-600 dark:text-blue-300 font-medium">{shippingOffer.description}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{shippingOffer.details}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Offer Expiry Date: {shippingOffer.expiryDate}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Summary */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl h-fit sticky top-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Purchase Together
            </h3>
            
            <div className="space-y-3 mb-6">
              {frequentlyBoughtProducts
                .filter(product => selectedProducts.includes(product.id))
                .map(product => (
                  <div key={product.id} className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-600 dark:text-gray-300">{product.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">{product.variant}</span>
                    </div>
                    <span className="font-medium text-gray-800 dark:text-white">
                      ৳{product.price.toFixed(2)}
                    </span>
                  </div>
                ))
              }
            </div>
            
            {calculateSavings() > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-300">Savings</span>
                <span className="text-green-600 font-bold">-৳{calculateSavings().toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
              <div className="flex justify-between font-bold text-lg">
                <span className="text-gray-800 dark:text-white">Total Price</span>
                <span className="text-pink-600">৳{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg mb-4"
            >
              ADD SELECTED ITEMS TO CART
            </motion.button>
            
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Free shipping on orders over ৳999
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">DESCRIPTION</h3>
          
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className="px-4 py-2 font-medium text-pink-600 dark:text-pink-400 border-b-2 border-pink-600 dark:border-pink-400">
              DESCRIPTION
            </button>
            <button className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400">
              REVIEWS (0)
            </button>
            <button className="px-4 py-2 font-medium text-gray-500 dark:text-gray-400">
              Q&A (0)
            </button>
          </div>
          
          <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <p>Product Type: Body Mist.</p>
            <p>Model: Floral.</p>
            <p>Gender: Women.</p>
            <p>Country of Origin: UAE.</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Special Offers & Services
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover our exclusive promotions and premium services designed to give you the best beauty experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className={`rounded-3xl overflow-hidden shadow-xl bg-gradient-to-br ${feature.bgGradient} dark:from-gray-800 dark:to-gray-700 border border-white dark:border-gray-600`}
          >
            <div className="relative h-56 overflow-hidden">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
                className="absolute top-4 right-4 text-3xl z-10"
              >
                {feature.icon}
              </motion.div>
              
              {/* Rating badge */}
              <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 px-3 py-1 rounded-full flex items-center shadow">
                <div className="flex text-yellow-400 mr-1">
                  {renderStars(feature.averageRating)}
                </div>
                <span className="text-sm font-medium ml-1 dark:text-white">{feature.averageRating}</span>
                <span className="text-xs text-gray-500 ml-1 dark:text-gray-300">({feature.reviewCount})</span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className={`text-2xl font-bold mb-3 ${feature.textColor} dark:text-white`}>
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {feature.description}
              </p>
              
              <div className="flex space-x-3 mb-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${feature.buttonColor} text-white px-6 py-3 rounded-full font-medium flex-1 transition-colors`}
                >
                  <a href="/consultation">Learn More</a>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveOffer(activeOffer === feature.id ? null : feature.id)}
                  className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-white px-4 py-3 rounded-full font-medium transition-colors"
                  aria-label="See reviews"
                >
                  {activeOffer === feature.id ? '▲' : '💬'}
                </motion.button>
              </div>
              
              {/* Review section that expands when active */}
              {activeOffer === feature.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <ReviewSection offerId={feature.id} />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="text-center mt-20"
      >
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Ready to Experience These Offers?
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
        >
          <a href="/products">Claim Your Offers Now</a>
        </motion.button>
      </motion.div>

      {/* Frequently Bought Together Section - Always Visible Now */}
      <FrequentlyBoughtTogether />
    </div>
  );
};

export default SpecialOffers;