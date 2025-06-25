import ReactMarkdown from 'react-markdown';

export const MarkdownContent: React.FC<{ content: string }> = ({ content }) => (
  <div>
    <ReactMarkdown
      components={{
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        p: ({ children }) => <p className="mt-8">{children}</p>,
        li: ({ children }) => <li className="list-disc ml-6">{children}</li>,
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);
