'use client';

import React, { useState, KeyboardEvent, ChangeEvent, useRef, useEffect, useCallback } from 'react';
import { ArrowUpCircle, X, ShipWheel, CreditCard } from 'lucide-react';
import Playground from '../components/Playground';
import { useUser } from '@clerk/nextjs';

// Örnek kodları JSON formatında saklıyoruz
const exampleCodes: { [key: string]: string } = {
  button: `
    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
      Button
    </button>
  `,
  // Diğer örnek kodlar burada eklenebilir
};

interface UserCredits {
  amount: number;
  lastUpdated: string;
}

const AIChatUI: React.FC = () => {
  const { user } = useUser();
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState<UserCredits | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [code, scrollToBottom]);

  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputMessage, adjustTextareaHeight]);

  const fetchCredits = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/credits');
      if (!response.ok) {
        throw new Error('Failed to fetch credits');
      }
      const data = await response.json();
      setCredits(data);
    } catch (err) {
      console.error('Error fetching credits:', err);
      setError('Failed to load credits. Please try again later.');
    }
  }, [user]);

  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  const enhanceUserInput = useCallback((input: string): string => {
    const enhancement = `
      Best Design Principles:
      - Top Quality: Modern, user-centric design
      - Consistency: Align with overall design language
      - Accessibility: Comply with WCAG AAA standards
      - Responsiveness: Perfect functionality across devices
      - Performance: Optimize for fast loading and efficiency
      - Visual Appeal: High-quality, coherent imagery
      - Custom Icons: SVG icons for enhanced UX
      - Tailwind CSS: Utilize Tailwind classes exclusively
      - Customization: Easy theme adaptation
      - Intuitive UX: Effortless user interaction
      - Clear Hierarchy: Emphasize important elements
      - Smooth Animations: Purposeful motion effects
      - Typography: Readable, scalable fonts
      - Inclusive Language: User-friendly content
      - Security: Robust data protection measures
      - Maintainability: Modular, extensible code
      - Cross-browser Compatibility: Consistent functionality
      - User Feedback: Clear, immediate responses
      - Error Handling: User-friendly error management
      - Internationalization: Support multiple languages
      - Documentation: Clear code comments and user guides
      - Micro-interactions: Meaningful animations
      - Color Psychology: Influence user behavior
      - White Space: Effective use of negative space
      - Intuitive Navigation: Logical site structures
      - Progressive Enhancement: Layer advanced features gracefully
      - Data-Driven Design: Utilize A/B testing for optimization
      - Emotional Design: Evoke positive user emotions
      - Personalization: Adapt to user preferences
      - Sustainable Design: Eco-friendly digital solutions
      - Use modern React patterns (hooks, functional components)
      - Implement proper error handling and user feedback
      - Implement responsive design with Tailwind CSS
    `;

    return `${input} | ${enhancement.replace(/\n\s+/g, ' ')}`;
  }, []);

  const decreaseCredits = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch('/api/credits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decrease' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update credits');
      }

      await fetchCredits(); // Kredileri yeniden yükle
    } catch (err) {
      console.error('Error updating credits:', err);
      setError('Failed to update credits. Please try again later.');
    }
  }, [user, fetchCredits]);

  const handleSendMessage = useCallback(async (): Promise<void> => {
    if (inputMessage.trim() === '' || !credits || credits.amount <= 0) return;

    const enhancedMessage = enhanceUserInput(inputMessage);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: enhancedMessage }),
        signal: abortControllerRef.current.signal
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const codeMatch = data.response.match(/```(?:jsx?|tsx?|html?)([\s\S]*?)```/i);
      const codeContent = codeMatch ? codeMatch[1].trim() : data.response;

      const exampleCode = exampleCodes[inputMessage.trim().toLowerCase()] || codeContent;

      const wrappedCode = `
        function App() {
          return (
            ${exampleCode}
          );
        }
        export default App;
      `;

      setCode(wrappedCode);

      // Decrease credits after successful response
      await decreaseCredits();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          console.log('Request was cancelled');
        } else {
          console.error('Error:', error.message);
          setError(`An error occurred: ${error.message}`);
        }
      } else {
        console.error('An unknown error occurred');
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [inputMessage, enhanceUserInput, credits, decreaseCredits]);

  const handleCancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    setInputMessage(e.target.value);
  }, []);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className="flex flex-col h-screen w-full dark:bg-neutral-900 bg-neutral-200 relative">
      <div className="flex justify-end p-4">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5 text-blue-500" />
          <span className="text-lg font-bold">{credits?.amount ?? 0}</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto w-full p-2 sm:p-2 pt-2 sm:pt-2 custom-scrollbar">
        {code && <Playground code={code} />}
        <div ref={messagesEndRef} />
      </div>
      <div className="mx-auto flex flex-col rounded-lg p-0 my-1 px-4 sm:px-0 w-full sm:w-2/3 md:w-1/2">
        <div className="relative w-full mt-2 mb-4">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Send a message to Hylse..."
            className="w-full custom-scrollbar overflow-auto text-balance leading-relaxed pr-7 pl-4 p-2 min-h-[40px] sm:min-h-[49px] max-h-[200px] resize-none text-sm sm:text-base rounded-2xl border border-neutral-500 focus:outline-none focus:ring-1 dark:focus:ring-neutral-600 focus:ring-neutral-900 transition-all duration-200 ease-in-out"
            disabled={isLoading || !credits || credits.amount <= 0}
            rows={1}
          />
          
          <button
            onClick={handleSendMessage}
            className={`absolute sm:right-3 sm:bottom-4 right-2 bottom-3 focus:outline-none transition-colors duration-200 ${
              isLoading || !credits || credits.amount <= 0 ? "text-gray-400" : "text-neutral-800 hover:text-gray-700 dark:text-neutral-300 dark:hover:text-neutral-400"
            }`}
            disabled={isLoading || !credits || credits.amount <= 0}
          >
            <ArrowUpCircle strokeWidth={1.50} className="h-6 w-6 sm:h-8 sm:w-8" />
          </button>
        </div>
      </div>
      
      {/* Thinking Modal with Cancel Button */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2">
              <ShipWheel strokeWidth={1.25} className="h-12 w-12 text-purple-500 animate-spin" />
              <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">Thinking...</span>
            </div>
            <button
              onClick={handleCancelRequest}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <X size={20} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatUI;