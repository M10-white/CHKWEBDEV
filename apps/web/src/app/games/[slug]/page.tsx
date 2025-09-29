import type { Metadata } from 'next';

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const title = `Jeu — ${params.slug}`;
  return { title };
}

export default async function GameFullscreen({ params }: { params: Params }) {
  const slug = params.slug;
  const src = `/games/${slug}/index.html`;

  return (
    <main className="min-h-dvh px-6 py-8">
      <div className="relative w-full aspect-video md:aspect-[16/9] max-w-6xl mx-auto rounded-2xl overflow-hidden border border-neutral-800 bg-black">
        <iframe
          src={src}
          title={slug}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; gamepad; xr-spatial-tracking"
          loading="eager"
        />
      </div>
    </main>
  );
}
