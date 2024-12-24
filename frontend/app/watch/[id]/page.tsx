import { WatchContent } from '@/components/watch-content';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  
  return <WatchContent id={id} />;
}