'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedCodeEditorProps {
  texts: string[];
  interval?: number;
}

const AnimatedCodeEditor: React.FC<AnimatedCodeEditorProps> = ({ texts, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  const typeWriter = useCallback((text: string, index: number = 0) => {
    if (index < text.length) {
      setDisplayText(text.slice(0, index + 1));
      typingRef.current = setTimeout(() => typeWriter(text, index + 1), 20);
    }
  }, []);

  useEffect(() => {
    const startNewText = () => {
      if (typingRef.current) clearTimeout(typingRef.current);
      setDisplayText('');
      typeWriter(texts[currentIndex]);
    };

    startNewText();

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [currentIndex, texts, interval, typeWriter]);

  return (
    <div className="h-full w-full flex items-center justify-center rounded-lg overflow-hidden">
      <div className="w-full max-w-3xl bg-gray-800 rounded-lg shadow-inner overflow-hidden">
        <div className="flex items-center justify-start p-2 bg-gray-700">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="p-4 font-mono text-sm sm:text-base md:text-base text-green-400"
          >
            <pre>
              <code>{displayText}</code>
            </pre>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnimatedCodeEditor;
