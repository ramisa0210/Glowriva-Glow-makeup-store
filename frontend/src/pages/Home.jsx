import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";

const Home = () => {
  // State management
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState({
    skincare: [],
    haircare: [],
    makeup: [],
    bodycare: [],
    under2000: []
  });
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });

  // Show notification function
  const showNotification = (message, type = "info") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Handle Add to Cart button click
  const handleAddToCart = () => {
    showNotification("You need to login first to add items to cart", "warning");
  };

  // Handle Get Advice button click
  const handleGetAdvice = () => {
    showNotification("Advice will be provided soon", "info");
  };

  // API data fetching
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        const data = response.data;
        
        setProducts({
          skincare: data.filter(p => p.category === "skincare"),
          haircare: data.filter(p => p.category === "haircare"),
          makeup: data.filter(p => p.category === "makeup"),
          bodycare: data.filter(p => p.category === "bodycare"),
          under2000: data.filter(p => p.price <= 2000)
        });
      } catch (error) {
        console.error("Error fetching products:", error);
        // Fallback data if API fails
        setProducts({
          skincare: [
            { id: 1, img: "/images/product-06.jpg", name: "Glow Serum", desc: "Brightens skin", price: 1850 },
            { id: 2, img: "/images/product-05.jpg", name: "Night Cream", desc: "Rejuvenates overnight", price: 1050 },
            { id: 3, img: "/images/product-03.jpg", name: "Face Cleanser", desc: "Gentle cleansing", price: 999 }
          ],
          haircare: [
            { id: 1, img: "/images/product-01.jpg", name: "Keratin Shampoo", desc: "Smooths hair", price: 2250 },
            { id: 2, img: "/images/product-08.jpg", name: "Hair Mask", desc: "Deep conditioning", price: 1070 },
            { id: 3, img: "/images/product-10.jpg", name: "Hair Oil", desc: "Nourishes scalp", price: 1200 }
          ],
          makeup: [
            { id: 1, img: "/images/foundation.jpg", name: "Foundation", desc: "Flawless base", price: 1750 },
            { id: 2, img: "/images/blush.jpg", name: "Blush", desc: "Natural glow", price: 880 },
            { id: 3, img: "/images/mascara.jpg", name: "Mascara", desc: "Volumizing", price: 1120 }
          ],
          bodycare: [
            { id: 1, img: "/images/scrub.jpg", name: "Body Scrub", desc: "Exfoliates skin", price: 1690 },
            { id: 2, img: "/images/lotion.jpg", name: "Body Lotion", desc: "Hydrates skin", price: 880 },
            { id: 3, img: "/images/cream.jpg", name: "Foot Cream", desc: "Repairs heels", price: 750 }
          ],
          under2000: [
            { img: "/images/product-01.jpg", price: "৳1699", name: "Hydrating Toner", rating: "★★★★★" },
            { img: "/images/product-02.jpg", price: "৳1299", name: "Glow Serum", rating: "★★★★☆" },
            { img: "/images/product-03.jpg", price: "৳1190", name: "Face Cleanser", rating: "★★★★★" },
            { img: "/images/product-11.jpg", price: "৳1599", name: "Boosting Serum", rating: "★★★★★" },
            { img: "/images/product-17.jpg", price: "৳1099", name: "Body Oil", rating: "★★★★★" }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Parallax effects
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Voice recognition
  const recognitionRef = useRef(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          setInputMessage(transcript);
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Chat functionality
  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]); // ✅ safer state update
    setInputMessage('');

    setTimeout(() => {
      let aiReply = "Sorry, I didn't understand that. Can you rephrase?";

      const msg = inputMessage.toLowerCase();

      // Skin care advice
      if (
        msg.includes("recommend product for oily skin") ||
        msg.includes("recommend product for dry skin") ||
        msg.includes("recommend product for normal skin") ||
        msg.includes("recommend product for combination skin")
      ) {
        aiReply =
          "We recommend our Hydrating Toner and Night Cream. Apply the toner in the morning and the cream at night for best results.";
      }

      // Offers / discounts
      else if (
        msg.includes("tell me the offers") ||
        msg.includes("discount") ||
        msg.includes("sale") ||
        msg.includes("promotion")
      ) {
        aiReply =
          "We currently have a 15% discount on all skincare products. You can check the 'Offers' section for more exciting deals!";
      }

      // Shipping / delivery
      else if (
        msg.includes("shipping") ||
        msg.includes("delivery") ||
        msg.includes("ship") ||
        msg.includes("order")
      ) {
        aiReply =
          "We provide free shipping on orders over ৳3000. Standard delivery usually takes 3-5 business days within Bangladesh.";
      }

      // Makeup products
      else if (
        msg.includes("makeup") ||
        msg.includes("lipstick") ||
        msg.includes("foundation") ||
        msg.includes("eyeshadow")
      ) {
        aiReply =
          "You can find all our makeup products in the 'Makeup' section, including Lipsticks, Foundation, and Eyeshadows.";
      }

      // Best-selling / recommended products
      else if (
        msg.includes("tell me your best product") ||
        msg.includes("recommend") ||
        msg.includes("popular") ||
        msg.includes("top seller")
      ) {
        aiReply =
          "Our best-selling product is the Glow Serum. It's suitable for all skin types and helps achieve radiant skin!";
      }

      // Order tracking (optional enhancement)
      else if (msg.includes("track") && msg.includes("order")) {
        aiReply =
          "You can track your order using the 'Order Tracking' page. Enter your order ID to see the latest status.";
      }

      const aiMessage = { text: aiReply, sender: 'ai' };
      setMessages((prev) => [...prev, aiMessage]); // ✅ safer update
    }, 1000);
  };


  // Carousel auto-rotate
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600 dark:border-pink-400"></div>
      </div>
    );
  }

  return (
    <main className="flex-grow dark:bg-gray-900 transition-colors duration-300">
      {/* Notification */}
      {notification.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
            notification.type === "warning" 
              ? "bg-yellow-100 text-yellow-800 border border-yellow-300" 
              : "bg-blue-100 text-blue-800 border border-blue-300"
          }`}
        >
          {notification.message}
        </motion.div>
      )}

      {/* AI Chat Bot */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${chatOpen ? 'w-80 h-96' : 'w-16 h-16'}`}>
        {chatOpen ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl h-full flex flex-col border border-pink-200 dark:border-gray-600">
            <div className="bg-pink-600 dark:bg-pink-800 text-white p-3 rounded-t-2xl flex justify-between items-center">
              <h3 className="font-bold">GlorivaGlow Assistant</h3>
              <button onClick={() => setChatOpen(false)} className="text-white hover:text-pink-200">
                <ion-icon name="close"></ion-icon>
              </button>
            </div>
            <div className="flex-1 p-3 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 h-full flex items-center justify-center">
                  <p>Ask me about our products!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <div key={index} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-lg p-3 ${msg.sender === 'user' ? 'bg-pink-100 dark:bg-pink-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400 dark:bg-gray-700 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={toggleListening}
                  className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 dark:bg-gray-600'}`}
                >
                  <ion-icon name="mic"></ion-icon>
                </button>
                <button 
                  onClick={handleSendMessage}
                  className="p-2 bg-pink-600 text-white rounded-full"
                >
                  <ion-icon name="send"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 bg-pink-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-pink-700 transition-colors"
            aria-label="Open chat"
          >
            <ion-icon name="chatbubble-ellipses" class="text-2xl"></ion-icon>
          </button>
        )}
      </div>

      {/* Hero Section */}
      <section ref={ref} className="relative h-[100vh] overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <video
            className="object-cover w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            src="/images/Cosmetics.mp4"
          ></video>
        </motion.div>
      
        <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center relative z-10 h-full flex flex-col justify-center items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Discover Your Inner Beauty
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-white mb-8"
          >
            Shop our curated collection of premium makeup products.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <a
              href="/products"            
              className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-pink-600 transition duration-300 text-sm md:text-base"
            >        
              Shop Now
            </a>
            <a
              href="/about"            
              className="bg-pink-700 text-white px-6 py-3 rounded-lg hover:bg-white hover:text-pink-600 transition duration-300 text-sm md:text-base"
            >        
              Learn More
            </a>
           
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="animate-bounce flex flex-col items-center">
            <p className="text-white mb-2 text-sm">Scroll Down</p>
            <ion-icon name="chevron-down" class="text-white text-xl"></ion-icon>
          </div>
        </motion.div>
      </section>
      
      {/* Featured Products Carousel */} 
      <section className="py-16 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-pink-600 dark:text-pink-400 mb-12"
          >
            Featured Products
          </motion.h2>
          
          <div className="relative overflow-hidden rounded-2xl shadow-xl">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {/* Slide 1 */}
              <div className="w-full flex-shrink-0 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-96 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-4">New Arrival</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">Discover our revolutionary skincare line</p>
                      <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full transition duration-100">
                        Shop Now
                      </button>
                    </div>
                  </div>
                  <div className="h-96 bg-pink-50 dark:bg-gray-700 flex items-center justify-center">
                    <img 
                      src="/images/style.png" 
                      alt="Featured Product" 
                      className="h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              
              {/* Slide 2 */}
              <div className="w-full flex-shrink-0 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-96 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">Best Sellers</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">Products our customers love</p>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition duration-100">
                        Shop Now
                      </button>
                    </div>
                  </div>
                  <div className="h-96 bg-purple-50 dark:bg-gray-700 flex items-center justify-center">
                    <img 
                      src="/images/blog-4.png" 
                      alt="Best Seller" 
                      className="h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              
              {/* Slide 3 */}
              <div className="w-full flex-shrink-0 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="h-96 bg-gradient-to-r from-blue-100 to-teal-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center p-8">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">Limited Offer</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-6">Special discounts for a limited time</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition duration-100">
                        Shop Now
                      </button>
                    </div>
                  </div>
                  <div className="h-96 bg-blue-50 dark:bg-gray-700 flex items-center justify-center">
                    <img 
                      src="/images/compact.png" 
                      alt="Limited Offer" 
                      className="h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carousel Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-pink-600' : 'bg-gray-300'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Under ৳2000 Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-8 px-6 bg-transparent"
      >
        <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold dark:text-white">Under ৳2000</h2>
            <a href="/products" className="text-sm text-bold-pink-900 hover:underline dark:text-pink-400">Shop All Products &rarr;</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {products.under2000.map((product, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="text-center bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
              >
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="mx-auto mb-2 rounded-lg h-32 w-full object-cover"
                  loading="lazy"
                />
                <p className="text-sm font-semibold dark:text-white">{product.price}</p>
                <p className="text-sm dark:text-gray-300">{product.name}</p>
                <p className="text-xs text-pink-500">{product.rating}</p>
                <button 
                  onClick={handleAddToCart}
                  className="mt-2 w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Makeup Items Section with Discounts & Ratings */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-pink-600 dark:text-pink-400">Makeup Must-Haves</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Glam up with our top picks – now at amazing prices!</p>
          </div>

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {/* Product Card */}
            {[
              { name: "Combo Offer", image: "/images/lipstick.jpg", discount: "50%", stars: 4 },
              { name: "Silky Blush", image: "/images/brush.jpg", discount: "18%", stars: 5 },
              { name: "Radiant Foundation", image: "/images/found.png", discount: "15%", stars: 4 },
              { name: "Glittery Eyeshadow", image: "/images/blush.jpg", discount: "10%", stars: 5 },
              { name: "Matte Lipstick", image: "/images/lipstick.png", discount: "25%", stars: 5 },
              { name: "Matte Compact", image: "/images/powder.png", discount: "12%", stars: 4 },
            ].map((product, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 relative group transition transform hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Discount Label */}
                <div className="absolute top-4 left-4 bg-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                  {product.discount} OFF
                </div>

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-xl mb-4"
                  loading="lazy"
                />

                {/* Product Info */}
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">{product.name}</h3>

                {/* Stars */}
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < product.stars ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.565-.955L10 0l2.947 5.955 6.565.955-4.756 4.635 1.122 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={handleAddToCart}
                  className="mt-2 w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Winter Skincare Section - 3D Enhanced */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative py-16 md:py-24 overflow-hidden"
      >
        {/* Floating Blush Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, window.innerHeight * 0.3],
              x: [0, (i % 2 === 0 ? 50 : -50)],
              opacity: [0.8, 0]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 2
            }}
            className="absolute"
            style={{
              left: `${10 + (i * 15)}%`,
              top: '-10%'
            }}
          >
            <img 
              src="/images/abb.jpg" 
              className="w-16 h-16 rounded-full object-cover shadow-lg border-2 border-pink-200 dark:border-pink-800"
              alt="floating beauty product"
              loading="lazy"
            />
          </motion.div>
        ))}

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 p-1 rounded-3xl shadow-2xl"
          >
            <div className="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 rounded-3xl p-8 md:p-12">
              <motion.h2 
                initial={{ y: -30 }}
                whileInView={{ y: 0 }}
                className="text-5xl font-bold text-center bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent mb-6"
              >
                Winter Skincare Products
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-pink-600 dark:text-pink-300 text-center max-w-2xl mx-auto mb-8 md:mb-12"
              >
                Combat dryness with our <span className="font-semibold">clinical-strength hydrators</span> and <span className="font-semibold">ceramide-rich</span> formulas
              </motion.p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative rounded-2xl overflow-hidden shadow-xl h-96 lg:h-full"
                >
                  <img 
                    src="/images/lad.png" 
                    alt="Winter Skincare Routine" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute bottom-8 left-8"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-8 py-3 rounded-xl font-medium shadow-lg"
                    >
                      25% Off Winter Essentials
                    </motion.button>
                  </motion.div>
                </motion.div>
                
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { img: "/images/skinn.png", label: "Hydrating Creams" },
                    { img: "/images/blog-3.png", label: "Facewash" },
                    { img: "/images/style.png", label: "Facial Scrub" },
                    { img: "/images/blog-4.png", label: "Facial Oils" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg"
                    >
                      <div className="h-40 md:h-48 relative">
                        <img 
                          src={item.img} 
                          alt={item.label} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white font-medium">{item.label}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                className="text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-10 py-4 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <a href="/products">
                    Discover Winter Collection
                  </a>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 3D Animated Customer Reviews Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 relative overflow-hidden"
      >
        {/* Floating 3D cosmetic elements (background) */}
        <motion.div 
          animate={{ 
            y: [0, 15, 0],
            rotateZ: [0, 5, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -left-20 top-1/4 opacity-30 dark:opacity-10"
        >
          <img src="/images/lipstick.png" alt="3D Lipstick" className="w-40 h-40" />
        </motion.div>

        <motion.div 
          animate={{ 
            y: [15, 0, 15],
            rotateZ: [5, 0, 5]
          }}
          transition={{ 
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute -right-20 bottom-1/4 opacity-30 dark:opacity-10"
        >
          <img src="/images/powder.png" alt="3D Compact" className="w-32 h-32" />
        </motion.div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent dark:from-pink-400 dark:to-rose-400 mb-4">
              Customer Reviews
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of customers who found their perfect glow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {[
              { 
                img: "/images/c1.jpg", 
                name: "Waziha", 
                review: "My skin has never looked better since switching to GlorivaGlow's skincare line",
                rating: 5
              },
              { 
                img: "/images/c2.jpg", 
                name: "Jannat", 
                review: "The foundation blends like a dream and lasts all day without fading",
                rating: 5
              },
              { 
                img: "/images/c3.jpg", 
                name: "Ramisa", 
                review: "Finally found lipsticks that don't dry out my lips! The formula is magical",
                rating: 5
              }
            ].map((customer, index) => (
              <motion.div 
                key={index}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-opacity-10 border-white dark:border-gray-700 backdrop-blur-sm"
              >
                <div className="flex flex-col items-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="mb-6 relative"
                  >
                    <img 
                      src={customer.img} 
                      alt={customer.name} 
                      className="w-20 h-20 rounded-full shadow-lg object-cover border-4 border-pink-200 dark:border-pink-900/50"
                      loading="lazy"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg"
                    >
                      <ion-icon name="heart" class="text-xs text-white"></ion-icon>
                    </motion.div>
                  </motion.div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.565-.955L10 0l2.947 5.955 6.565.955-4.756 4.635 1.122 6.545z" />
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-6 italic">
                    "{customer.review}"
                  </p>
                  
                  <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                    {customer.name}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>




{/* About Section - 3D Interactive */}
<motion.section
  className="relative py-20 overflow-hidden"
>
  {/* Floating Blush Elements */}
  <motion.div 
    animate={{
      y: [0, 30, 0],
      rotate: [0, 5, 0]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute left-0 top-1/3 opacity-20 dark:opacity-10"
  >
  </motion.div>

  <div className="max-w-7xl mx-auto px-6">
    <div className="flex flex-col lg:flex-row gap-12 items-center">
      {/* 3D Image Container */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 relative"
      >
        <div className="perspective-1000">
          <motion.div
            whileHover={{ rotateY: 15 }}
            className="transform-style-preserve-3d transition-all duration-500 ease-out"
          >
            <img 
              src="/images/professional.jpg" 
              alt="GlorivaGlow Products" 
              className="w-full rounded-2xl shadow-2xl border-8 border-white dark:border-gray-800"
              loading="lazy"
            />
          </motion.div>
        </div>
        
        {/* Floating product badges */}
        <motion.div
          animate={{
            y: [0, 15, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
        </motion.div>
        
        <motion.div
          animate={{
            y: [15, 0, 15]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
        </motion.div>
      </motion.div>

      {/* Content */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full lg:w-1/2"
      >
        <motion.h1
          whileInView={{ 
            backgroundSize: ['100% 2px', '100% 2px', '0% 2px', '100% 2px'],
            backgroundPosition: ['0% 100%', '0% 100%', '50% 100%', '0% 100%']
          }}
          transition={{ 
            duration: 2,
            ease: "easeInOut"
          }}
          className="text-5xl font-bold text-pink-600 dark:text-pink-400 mb-8 pb-4 bg-no-repeat bg-gradient-to-r from-pink-500 to-rose-500 bg-[length:100%_2px] bg-[position:0_100%]"
        >
          Our Beauty Philosophy
        </motion.h1>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-pink-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-3 flex items-center">
              <span className="w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mr-3">1</span>
              Skin-First Makeup
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              We formulate cosmetics with skincare benefits—hyaluronic acid-infused foundations, vitamin E-enriched lipsticks, and caffeine-powered concealers that work while you wear them.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-pink-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-3 flex items-center">
              <span className="w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mr-3">2</span>
              Real People Focused
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Whether you have 2 minutes or 20, our multi-tasking products adapt to your routine. No complex steps, no unrealistic expectations—just radiant results for busy lives.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-pink-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-pink-600 dark:text-pink-400 mb-3 flex items-center">
              <span className="w-8 h-8 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mr-3">3</span>
              Ethical Beauty
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Clean ingredients, sustainable packaging, and cruelty-free practices—because feeling beautiful shouldn't come at the cost of your values or the planet.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</motion.section>



{/* Back to top button */}
<motion.button
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="fixed bottom-6 left-6 z-50 p-3 bg-pink-600 text-white rounded-full shadow-lg hover:bg-pink-700 transition-colors"
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  aria-label="Back to top"
>
  <ion-icon name="arrow-up"></ion-icon>
</motion.button>
    </main>
  );
};
      export default Home;