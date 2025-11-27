import { GlobalLayout } from "@/components/blocks/global";
import { HomeBookCardPreview } from "@/components/pages/home/HomeBookCardPreview";
import { HomeFloatingButton } from "@/components/pages/home/HomeFloatingButton";

export default function Home() {
  return (
    <GlobalLayout>
      <div>
        <HomeBookCardPreview />
        <HomeFloatingButton />
      </div>
    </GlobalLayout>
  );
}
