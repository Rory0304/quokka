import { EditorBackgroundColorType } from "@/data/interfaces/editor/EditorBackgroundColor";

// 상하좌우 그라데이션
export const BackgroundColor: EditorBackgroundColorType[] = [
  // 위에서 아래 (상 → 하)
  {
    alt: "위에서 아래로 어두워지는 밤하늘",
    bgColor: "linear-gradient(180deg, #0a0e27 0%, #1a1b3a 100%)",
  },
  // 아래에서 위 (하 → 상)
  {
    alt: "아래에서 위로 밝아지는 석양",
    bgColor: "linear-gradient(0deg, #ff6b6b 0%, #ffd93d 100%)",
  },
  // 왼쪽에서 오른쪽 (좌 → 우)
  {
    alt: "왼쪽에서 오른쪽으로 변화하는 보라빛",
    bgColor: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
  },
  // 오른쪽에서 왼쪽 (우 → 좌)
  {
    alt: "오른쪽에서 왼쪽으로 변화하는 바다색",
    bgColor: "linear-gradient(270deg, #11998e 0%, #38ef7d 100%)",
  },
] as const;
