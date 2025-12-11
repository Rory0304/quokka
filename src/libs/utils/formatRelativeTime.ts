/**
 * 날짜를 상대 시간 형식으로 변환 (예: "3일 전", "2시간 전", "방금 전")
 * @param date - 변환할 날짜
 * @returns 상대 시간 문자열
 */
export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000
  );

  // 미래 날짜인 경우
  if (diffInSeconds < 0) {
    return '방금 전';
  }

  // 1분 미만 (60초 미만)
  if (diffInSeconds < 60) {
    return '방금 전';
  }

  // 1시간 미만 (60분 미만)
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  // 1일 미만 (24시간 미만)
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  // 1주일 미만 (7일 미만)
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  }

  // 1개월 미만 (30일 미만)
  if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks}주 전`;
  }

  // 1년 미만 (365일 미만)
  if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months}개월 전`;
  }

  // 1년 이상
  const years = Math.floor(diffInDays / 365);
  return `${years}년 전`;
}
