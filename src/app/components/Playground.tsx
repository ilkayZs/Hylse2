import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { Monitor, Tablet, Smartphone, Code, Copy, ClipboardCopy } from 'lucide-react';

interface PlaygroundProps {
  code: string;
}

type ViewMode = 'desktop' | 'tablet' | 'mobile';

const Playground: React.FC<PlaygroundProps> = ({ code }) => {
  const [internalCode, setInternalCode] = useState<string>(code);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInternalCode(code);
  }, [code]);

  const wrapCode = (code: string) => {
    return `
      ${code.replace(/export\s+default\s+App\s*;\s*$/, '')}
      ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    `;
  };

  const renderHTML = useCallback(() => {
    if (iframeRef.current) {
      const iframeDoc = iframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <script src="https://cdn.tailwindcss.com"></script>
              <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
              <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
              <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
              </style>
            </head>
            <body>
              <div id="root"></div>
              <script type="text/babel">
                ${wrapCode(internalCode)}
              </script>
            </body>
          </html>
        `);
        iframeDoc.close();
      }
    }
  }, [internalCode]);

  useEffect(() => {
    renderHTML();
  }, [renderHTML]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(internalCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [internalCode]);

  const getIframeWidth = useMemo(() => {
    switch (viewMode) {
      case 'desktop':
        return '100%';
      case 'tablet':
        return '768px';
      case 'mobile':
        return '375px';
      default:
        return '100%';
    }
  }, [viewMode]);

  const getIframeHeight = useCallback(() => {
    if (containerRef.current) {
      return `${containerRef.current.clientHeight}px`;
    }
    return '600px';
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="w-full">
        <div className="flex justify-center gap-2 items-center mb-2">
          <button
            className="dark:bg-white dark:hover:bg-gray-300 bg-neutral-950 hover:bg-neutral-800 text-neutral-50 dark:text-gray-950 py-1 px-4 rounded flex flex-row gap-2 transition-all duration-150"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? 'Hide Code' : 'Show Code'}
            <Code />
          </button>
          {showCode && (
            <button
              className="bg-red-500 text-white hover:bg-red-600 py-1 px-4 rounded flex flex-row gap-2"
              onClick={handleCopy}
            >
              <p>{copied ? 'Copied' : 'Copy'}</p>
              {copied ? <ClipboardCopy /> : <Copy />}
            </button>
          )}
        </div>
        {showCode && (
          <Editor
            height="40vh"
            defaultLanguage="javascript"
            value={internalCode}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              folding: false,
            }}
            onChange={(value) => setInternalCode(value || '')}
          />
        )}
      </div>
      <div className="w-full" ref={containerRef}>
        <div className="flex justify-between items-center mb-1 p-1">
          <h2 className="text-xl font-bold text-neutral-950 dark:text-neutral-50 px-2">Preview</h2>
          <div className="flex gap-2">
            {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
              <button
                key={mode}
                className={`p-1 rounded ${viewMode === mode ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                onClick={() => handleViewModeChange(mode)}
                title={mode.charAt(0).toUpperCase() + mode.slice(1)}
              >
                {mode === 'desktop' && <Monitor size={24} />}
                {mode === 'tablet' && <Tablet size={24} />}
                {mode === 'mobile' && <Smartphone size={24} />}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-center custom-scrollbar bg-gray-200 dark:bg-neutral-800 p-3 h-[760px] w-full">
          <iframe
            ref={iframeRef}
            style={{
              width: getIframeWidth,
              height: '100%',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#F5F5F5',
            }}
            title="preview"
          />
        </div>
      </div>
    </div>
  );
};

export default Playground;
