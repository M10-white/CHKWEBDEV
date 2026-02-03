export type WPProject = {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    acf?: {
      project?: {
        short_description?: string;
        year?: number;
        tech?: string[] | string;
        cover?: number | { url?: string } | string;
        demo_url?: string;
        repo_url?: string;
      };
    };
  };
  
  export type Project = {
    id: number;
    slug: string;
    title: string;
    description: string;
    year?: number;
    tech: string[];
    coverUrl?: string; // URL finale de l'image
    demoUrl?: string;
    repoUrl?: string;
  };
  
  const WP = process.env.NEXT_PUBLIC_WP_URL;
  
  if (!WP) {
    throw new Error("NEXT_PUBLIC_WP_URL is not set");
  }
  
  function normalizeTech(tech?: string[] | string): string[] {
    if (!tech) return [];
    if (Array.isArray(tech)) return tech.filter(Boolean);
    return tech
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  }
  
  async function fetchJSON<T>(url: string): Promise<T> {
    const res = await fetch(url, {
      // en dev c'est ok; en prod tu peux mettre { next: { revalidate: 60 } }
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`WP fetch failed (${res.status}) for ${url}`);
    }
    return res.json() as Promise<T>;
  }
  
  async function resolveMediaUrl(mediaId?: number): Promise<string | undefined> {
    if (!mediaId) return undefined;
    try {
      const media = await fetchJSON<any>(`${WP}/wp-json/wp/v2/media/${mediaId}`);
      return media?.source_url;
    } catch {
      return undefined;
    }
  }
  
  function mapWpProject(wp: WPProject, coverUrl?: string): Project {
    const acf = wp.acf?.project ?? {};
  
    const description =
      acf.short_description?.trim() ||
      // fallback si jamais tu utilises l’excerpt WP plus tard
      "";
  
    return {
      id: wp.id,
      slug: wp.slug,
      title: wp.title?.rendered ?? wp.slug,
      description,
      year: acf.year,
      tech: normalizeTech(acf.tech),
      coverUrl,
      demoUrl: acf.demo_url || undefined,
      repoUrl: acf.repo_url || undefined,
    };
  }
  
  export async function getProjects(): Promise<Project[]> {
    const list = await fetchJSON<WPProject[]>(`${WP}/wp-json/wp/v2/project?per_page=100`);
  
    // resolve cover URLs (cover est un ID)
    const withCovers = await Promise.all(
      list.map(async (p) => {
        const cover = p.acf?.project?.cover;
        let coverUrl: string | undefined;
  
        if (typeof cover === "number") coverUrl = await resolveMediaUrl(cover);
        else if (typeof cover === "string") coverUrl = cover;
        else if (cover && typeof cover === "object") coverUrl = (cover as any).url;
  
        return mapWpProject(p, coverUrl);
      })
    );
  
    // tri: année desc puis titre
    return withCovers.sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title));
  }
  
  export async function getProjectBySlug(slug: string): Promise<Project | null> {
    const list = await fetchJSON<WPProject[]>(
      `${WP}/wp-json/wp/v2/project?slug=${encodeURIComponent(slug)}`
    );
  
    const wp = list?.[0];
    if (!wp) return null;
  
    const cover = wp.acf?.project?.cover;
    let coverUrl: string | undefined;
  
    if (typeof cover === "number") coverUrl = await resolveMediaUrl(cover);
    else if (typeof cover === "string") coverUrl = cover;
    else if (cover && typeof cover === "object") coverUrl = (cover as any).url;
  
    return mapWpProject(wp, coverUrl);
  }
  