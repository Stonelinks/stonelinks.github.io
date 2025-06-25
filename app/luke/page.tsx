import { MarkdownContent } from '@/components/MarkdownContent';
import { PageWrapper } from '@/components/PageWrapper';
import Image from 'next/image';
import Link from 'next/link';

const PostsIndex = () => {
  return (
    <PageWrapper>
      <h1>About</h1>
      <hr />

      <div className="mb-4">
        <Image src="/author.png" alt="Lucas Doyle" width={200} height={200} />
      </div>

      <div className="mb-4">
        <ul className="flex gap-4 list-none">
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="http://stonelinks.github.io/resume/"
            >
              Resume
            </Link>
          </li>
          <li className="border-l-2 border-gray-300"></li>
          <li>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:lucas.p.doyle@gmail.com?Subject=Hello"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <MarkdownContent
        content={`
Hi! I'm Lucas Doyle, an engineer who likes building stuff for robots, IoT, autonomous vehicles and industrial machinery. Or whatever. Sounds cliché, but making code do something in the real world is what excites me!

I have been in San Francisco for 10 years (!!!) working on software, IoT, drones, you name it. Prior to SF, I spent a couple years in Japan at a small company optimizing industrial / manufacturing robotics at [MUJIN](http://mujin.co.jp/en/). And even before that I worked at the Harvard-Smithsonian Center for Astrophysics on an [experimental X-ray optic production facility](/projects/amf/).

In my personal life, I'm serious about spending time outdoors away from cities and screens, and continue to enjoy all Northern CA has to offer (which is a lot). Also constantly have random, sometimes useless, usually entertaining side projects going on probably in various states of disarray.

Hope you enjoy my (probably horribly outdated by now) website! Oh and here is my [cryptographic proof of identity](https://gist.github.com/Stonelinks/1df867c1bb830a8c0c67) for all the nerds out there.        
        `}
      />
    </PageWrapper>
  );
};

export default PostsIndex;
