import { Nanum_Pen_Script, Noto_Serif_KR } from 'next/font/google';

// Editor에서만 사용할 폰트들
const notoSerifKR = Noto_Serif_KR({
  variable: '--font-editor-serif',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const nanumPenScript = Nanum_Pen_Script({
  variable: '--font-editor-handwriting',
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
});

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${notoSerifKR.variable}  ${nanumPenScript.variable} h-screen overflow-scroll`}
    >
      {children}
    </div>
  );
}
