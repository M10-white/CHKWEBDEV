import type { Metadata } from 'next';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const title = `Jeu — ${params.slug}`;
  return { title };
}

export default function GameFullscreen({ params }: { params: Params }) {
  const src = `/games/${params.slug}/index.html`;
  return (
    <main>
      <div className="relative w-full aspect-video md:aspect-[16/9] max-w-6xl mx-auto mt-6 md:mt-10">
        <iframe
          src={src}
          title={params.slug}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; gamepad; xr-spatial-tracking"
        />
      </div>
    </main>
  );
}
