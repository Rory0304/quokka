import { HomeBanner } from "@/components/pages/home/HomeBanner";
import { BookCarousel } from "@/components/pages/home/BookCarousel";
import { HomeBookCardPreview } from "@/components/pages/home/HomeBookCardPreview";

export default function Home() {
  return (
    <div>
      <HomeBanner />
      <BookCarousel />
      <HomeBookCardPreview />
    </div>
  );
}
