import Image from 'next/image';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className="flex flex-col items-center mt-6 mb-2 md:mb-8 md:flex-row md:items-center md:justify-start">
      <div className="mb-4 md:mb-0 md:mr-4 flex justify-center">
        <Image src="/icon.png" alt="Logo" width={100} height={100} priority />
      </div>
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-4xl md:text-6xl font-serif mb-2">Stonelinks</h1>
        <ul className="flex list-none gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/luke">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
