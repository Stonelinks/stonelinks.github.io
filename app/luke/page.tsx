import { PageWrapper } from '@/components/PageWrapper';

import ReactMarkdown from 'react-markdown';

const MarkdownContent: React.FC<{ content: string }> = ({ content }) => (
  <div className="text-gray-700">
    <ReactMarkdown
      components={{
        p: ({ children }) => <p className="mt-2">{children}</p>,
        li: ({ children }) => <li className="list-disc ml-6">{children}</li>,
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
);

const PostsIndex = () => {
  return (
    <PageWrapper>
      <MarkdownContent
        content={`
# About

![Lucas Doyle](/author.png)

[Resume](http://stonelinks.github.io/resume/) | [Contact](mailto:lucas.p.doyle@gmail.com?Subject=Hello)

[GitHub](https://github.com/Stonelinks) | [LinkedIn](http://www.linkedin.com/pub/lucas-doyle/25/550/169) | [YouTube](https://www.youtube.com/c/LukeDoyle0) | [Dribbble](https://dribbble.com/Stonelinks)

I'm Lucas Doyle, an engineer who likes building interfaces for robots, autonomous vehicles and industrial machinery. Sounds cliché, but making code do something in the real world is what excites me.

I have been in San Francisco working on drones the last four-ish years at [Airware](https://www.airware.com/). Previously, I spent a couple years in Japan working on optimizing industrial / manufacturing robotics at [MUJIN](http://mujin.co.jp/en/). Prior to that, I worked at the Harvard-Smithsonian Center for Astrophysics on an [experimental X-ray optic production facility](http://stonelinks.github.io/projects/amf/) on an internship / part time basis. Check out my [Resume](http://stonelinks.github.io/resume/) or this website if you want to learn more.

I'm serious about spending time outdoors away from cities and screens, and continue to enjoy all Northern CA has to offer (which is a lot). Also constantly have random, sometimes useless, usually entertaining side projects going on probably in various states of disarray.

Hope you enjoy my (probably horribly outdated by now) website! Oh and here is my [cryptographic proof of identity](https://gist.github.com/Stonelinks/1df867c1bb830a8c0c67) for all the nerds out there.

        
        
        `}
      />
    </PageWrapper>
  );
};

export default PostsIndex;
