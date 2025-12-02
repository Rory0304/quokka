import { GlobalLayout } from "@/components/blocks/global";
import { HomeBookCardList } from "@/components/pages/home/HomeBookCardList";
import { HomeFloatingButton } from "@/components/pages/home/HomeFloatingButton";

export default function Home() {
  return (
    <GlobalLayout>
      <div>
        <HomeBookCardList />
        <HomeFloatingButton />
      </div>
    </GlobalLayout>
  );
}
