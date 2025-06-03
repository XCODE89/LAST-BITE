import { motion } from 'framer-motion';
import React from 'react'

const FeatureAbout = ({icon, title, content }) => {

  return (
    <motion.div 
            className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-lastbite-pink/20 hover:border-lastbite-pink/50 transition-all"
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <div className="w-16 h-16 bg-lastbite-pink rounded-full flex items-center justify-center mb-6 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns={icon}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h4 className="text-xl font-playfair font-semibold mb-3 text-white text-center">{title}</h4>
            <p className="text-gray-300 text-center">
              {content}
            </p>
          </motion.div>
  )
}

export default FeatureAbout