'use client';
import { CopyButton } from '@/components/docs/copy-button';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, showLineNumbers = false }: CodeBlockProps) {
  const lines = code.split('\n');
  const maxLineNumberWidth = lines.length.toString().length;

  return (
    <div className="relative w-full max-w-[calc(100vw-2rem)] md:max-w-full rounded-lg border border-[#1E1E1E] bg-[#1E1E1E]">
      <div className="absolute right-4 top-4 z-20">
        <CopyButton value={code} className="bg-[#313131] hover:bg-[#3c3c3c]" />
      </div>
      <div className="max-h-[400px] w-full overflow-auto custom-scrollbar">
        <div className="flex min-w-full">
          {showLineNumbers && (
            <div
              className="flex-none select-none border-r border-[#404040] bg-[#1E1E1E]"
              style={{
                width: `${maxLineNumberWidth * 1.5}rem`,
              }}
            >
              <div className="py-4 px-4">
                {lines.map((_, i) => (
                  <div
                    key={i}
                    className="text-[#858585] text-right leading-6 text-sm tabular-nums"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="w-full min-w-[calc(100%-${maxLineNumberWidth * 1.5}rem)]">
            <pre className="p-4 text-sm">
              <code className="text-white leading-6 inline-block">{code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
