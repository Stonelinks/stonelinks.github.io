import { serve } from 'bun';

const port = 3000;
const directory = './out'; // Replace with your static directory

serve({
  fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname === '/' ? '/index.html' : url.pathname;
    return new Response(Bun.file(directory + path));
  },
  port,
});

console.log(`Server running at http://localhost:${port}`);
