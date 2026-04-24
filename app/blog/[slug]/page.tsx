import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/lib/blog-posts";

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <article className="px-3 py-8 sm:px-4 md:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="text-xs font-medium text-slate-400 hover:text-amber-400"
        >
          ← Back to blog
        </Link>
        <p className="mt-4 text-xs text-slate-500">{post.date}</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-white sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-sm text-slate-400">{post.excerpt}</p>
        <div className="mt-8 max-w-none space-y-4 text-sm leading-relaxed text-slate-300">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </article>
  );
}
