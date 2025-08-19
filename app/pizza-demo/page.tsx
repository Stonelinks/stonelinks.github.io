import dynamic from 'next/dynamic';

const PizzaViewer = dynamic(() => import('../components/PizzaViewer'), {
  ssr: false,
  loading: () => (
    <div
      className="border border-gray-200 rounded-lg overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center"
      style={{ width: 400, height: 400 }}
    >
      <div className="text-gray-500">Loading 3D model...</div>
    </div>
  ),
});

export default function PizzaDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          3D Pizza Model Demo
        </h1>

        {/* Large centered pizza */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
            Pizza
          </h2>
          <p className="text-gray-600 mb-6 text-center max-w-2xl mx-auto">
            This is a larger view of the Holy Pepperoni pizza model with full
            texture detail.
          </p>
          <div className="flex justify-center">
            <PizzaViewer width={600} height={400} />
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500">
          <p>
            Model: &ldquo;Holy Pepperoni&rdquo; by inciprocal from Sketchfab
          </p>
          <p className="text-xs mt-2">
            Powered by Three.js and React Three Fiber with manual texture
            loading
          </p>
        </div>
      </div>
    </div>
  );
}
