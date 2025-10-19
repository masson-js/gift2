'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { createGiftWish } from '@/actions/giftWish';

// Define the shape of the form data
interface FormData {
  name: string;
  class: string;
  age: string;
  giftWish: string;
  giftLink: string;
}

// Define the expected return type of createGiftWish
interface GiftWishResult {
  success: boolean;
  error?: string;
}

export function GiftForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    class: '',
    age: '',
    giftWish: '',
    giftLink: '',
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result: GiftWishResult = await createGiftWish(formData);
      
      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: '',
          class: '',
          age: '',
          giftWish: '',
          giftLink: '',
        });
      } else {
        alert(result.error || 'Wystąpił błąd');
      }
    } catch (error) {
      alert('Wystąpił błąd podczas wysyłania');
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', bounce: 0.5 }}
        className="relative z-10 w-full max-w-2xl mx-auto"
      >
        <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-3xl shadow-2xl overflow-hidden border-8 border-yellow-400 p-12">
          {/* Decorative stars */}
          <div className="absolute top-4 left-4 text-yellow-300 text-4xl animate-pulse">⭐</div>
          <div className="absolute top-4 right-4 text-yellow-300 text-4xl animate-pulse" style={{ animationDelay: '0.3s' }}>⭐</div>
          <div className="absolute bottom-4 left-8 text-yellow-300 text-3xl animate-pulse" style={{ animationDelay: '0.6s' }}>✨</div>
          <div className="absolute bottom-4 right-8 text-yellow-300 text-3xl animate-pulse" style={{ animationDelay: '0.9s' }}>✨</div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-8xl mb-6"
            >
              🎅
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Gratulacje!
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-8 border-4 border-white/30"
            >
              <p className="text-2xl md:text-3xl text-white font-semibold mb-4">
                Twój list dotarł do Świętego Mikołaja! 🎄
              </p>
              <p className="text-xl text-white/90">
                Mikołaj i jego elfy już pracują nad Twoim prezentem!
              </p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: 'spring', bounce: 0.6 }}
              className="flex justify-center gap-4 text-6xl"
            >
              🎁 🎄 ⛄
            </motion.div>

            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              onClick={() => setIsSubmitted(false)}
              className="mt-8 px-8 py-3 bg-white text-red-600 font-bold rounded-full shadow-lg hover:bg-yellow-100 transition-all border-4 border-yellow-300"
            >
              Wyślij kolejny list
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
      className="relative z-10 w-full max-w-md mx-auto"
    >
      {/* Gift Box Shape */}
      <div className="relative bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-2xl overflow-hidden border-4 border-red-800">
        {/* Ribbon Horizontal */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-full bg-gradient-to-b from-yellow-300 via-yellow-400 to-yellow-500 z-0 shadow-lg" />
        
        {/* Ribbon Vertical */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-20 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 z-0 shadow-lg" />
        
        {/* Bow on top - cartoon style */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            {/* Left bow loop */}
            <div className="absolute -left-10 top-2 w-12 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full rotate-45 border-4 border-yellow-600" />
            {/* Right bow loop */}
            <div className="absolute -right-10 top-2 w-12 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full -rotate-45 border-4 border-yellow-600" />
            {/* Center of bow */}
            <div className="relative w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-4 border-yellow-700 shadow-lg" />
          </div>
        </div>

        {/* Form Container */}
        <div className="relative z-10 bg-white m-5 mt-16 rounded-xl p-8 shadow-2xl border-4 border-blue-200">
          <h1 className="text-center mb-6 text-red-600 text-2xl font-bold">
            Lista życzeń dla Świętego Mikołaja
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Imię
              </label>
              <input
                id="name"
                type="text"
                placeholder="Twoje imię"
                value={formData.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                Klasa
              </label>
              <input
                id="class"
                type="text"
                placeholder="np. 3A"
                value={formData.class}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, class: e.target.value })}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Wiek
              </label>
              <input
                id="age"
                type="number"
                placeholder="Twój wiek"
                value={formData.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, age: e.target.value })}
                required
                min="1"
                max="99"
                disabled={isLoading}
                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="giftWish" className="block text-sm font-medium text-gray-700">
                Jaki prezent chcesz?
              </label>
              <input
                id="giftWish"
                type="text"
                placeholder="Opisz swój wymarzony prezent"
                value={formData.giftWish}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, giftWish: e.target.value })}
                required
                disabled={isLoading}
                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="giftLink" className="block text-sm font-medium text-gray-700">
                Link do prezentu
              </label>
              <input
                id="giftLink"
                type="url"
                placeholder="https://..."
                value={formData.giftLink}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, giftLink: e.target.value })}
                disabled={isLoading}
                className="w-full px-3 py-2 border border-red-200 rounded-md focus:outline-none focus:border-red-400 focus:ring-2 focus:ring-red-200 disabled:opacity-50"
              />
            </div>

            <motion.div whileHover={{ scale: isLoading ? 1 : 1.05 }} whileTap={{ scale: isLoading ? 1 : 0.95 }}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-md shadow-xl border-4 border-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '📮 Wysyłanie...' : '🎅 Wyślij do Świętego Mikołaja'}
              </button>
            </motion.div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}