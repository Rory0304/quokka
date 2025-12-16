import { GlobalLayout } from '@/components/blocks/global';
import { HomeFloatingButton } from '@/components/pages/home/HomeFloatingButton';
import { HomeMainContent } from '@/components/pages/home/HomeMainContent';

export default function Home() {
  return (
    <GlobalLayout>
      <div>
        <HomeMainContent />
        <HomeFloatingButton />
      </div>
    </GlobalLayout>
  );
}
