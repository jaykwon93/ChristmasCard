'use client';

import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// 디자인 시스템
const theme = {
  bgPrimary: '#1a3c2a',
  bgSecondary: '#2d5a3f',
  cardBg: '#f5f0e6',
  cardBorder: '#e0d5c5',
  textLight: '#f5f0e6',
  textDark: '#2d3b2d',
  textMuted: '#a8b5a8',
  red: '#c41e3a',
  redHover: '#a31830',
  gold: '#d4a574',
  cream: '#f5f0e6',
};

// 카드 템플릿 정의 (이미지 기반)
const cardTemplates = [
  { id: 'snowman', name: '야옹이', image: '/1-test.jpg' },
  { id: 'postbox', name: '우체통', image: '/2-test.jpg' },
  { id: 'rudolph', name: '강남언니', image: '/3-test.PNG' },
  { id: 'gift', name: '선물', image: '/4-gift.jpeg' },
  { id: 'tree', name: '트리', image: '/5-tree.jpeg' },
];

// 텍스트 색상 프리셋
const TEXT_COLORS = [
  { name: '흰색', value: '#ffffff' },
  { name: '크림', value: '#f5f0e6' },
  { name: '골드', value: '#d4a574' },
  { name: '레드', value: '#c41e3a' },
  { name: '그린', value: '#2d5a3f' },
  { name: '네이비', value: '#1a2744' },
];

export default function Home() {
  const [selectedCard, setSelectedCard] = useState(cardTemplates[0]);
  const [message, setMessage] = useState('');
  const [fontSize, setFontSize] = useState(18);
  const [textColor, setTextColor] = useState('#ffffff');
  const [position, setPosition] = useState(50);
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current || !message) return;
    setIsDownloading(true);

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
      });

      const link = document.createElement('a');
      link.download = `christmas-card-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Download failed:', error);
      alert('다운로드에 실패했습니다.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <main
      className="min-h-screen py-8 px-4"
      style={{ background: `linear-gradient(180deg, ${theme.bgPrimary} 0%, ${theme.bgSecondary} 100%)` }}
    >
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <header className="text-center mb-10">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl mb-4"
            style={{ fontFamily: '"Great Vibes", cursive', color: theme.cream }}
          >
            Merry Christmas
          </h1>
          <p style={{ fontFamily: '"Noto Sans KR", sans-serif', color: theme.textMuted }}>
            카드를 선택하고 메시지를 작성하세요
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center">

          {/* 카드 프리뷰 */}
          <section className="flex flex-col items-center w-full max-w-md">
            <div
              ref={cardRef}
              className="overflow-hidden w-full relative"
              style={{
                borderRadius: '16px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
              }}
            >
              {/* 카드 이미지 */}
              <img
                src={selectedCard.image}
                alt={selectedCard.name}
                className="w-full h-auto block"
                style={{ display: 'block' }}
              />

              {/* 메시지 오버레이 */}
              {message && (
                <div
                  className="absolute left-0 right-0 text-center px-6"
                  style={{ top: `${position}%`, transform: 'translateY(-50%)' }}
                >
                  <p style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: `${fontSize}px`,
                    color: textColor,
                    fontStyle: 'italic',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    lineHeight: 1.4,
                    whiteSpace: 'pre-line',
                  }}>
                    {message}
                  </p>
                </div>
              )}
            </div>
            <p className="mt-4 text-sm" style={{ color: theme.textMuted }}>
              ✨ 카드 미리보기 ✨
            </p>
          </section>

          {/* 컨트롤 패널 */}
          <section
            className="w-full max-w-md rounded-2xl p-6 md:p-8"
            style={{ backgroundColor: theme.cardBg, boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}
          >
            {/* 카드 선택 */}
            <div className="mb-6">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: theme.textDark, fontFamily: '"Noto Sans KR", sans-serif' }}
              >
                🎄 카드 선택
              </label>
              <div className="grid grid-cols-5 gap-2">
                {cardTemplates.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setSelectedCard(card)}
                    className="relative overflow-hidden rounded-lg transition-all duration-200"
                    style={{
                      aspectRatio: '1',
                      border: selectedCard.id === card.id ? `3px solid ${theme.red}` : `2px solid ${theme.cardBorder}`,
                      transform: selectedCard.id === card.id ? 'scale(1.05)' : 'scale(1)',
                    }}
                  >
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-center mt-2" style={{ color: theme.textMuted }}>
                {selectedCard.name}
              </p>
            </div>

            {/* 메시지 입력 */}
            <div className="mb-6">
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: theme.textDark, fontFamily: '"Noto Sans KR", sans-serif' }}
              >
                💌 메시지 입력
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="예: To. 사랑하는 가족에게&#10;메리 크리스마스!"
                maxLength={50}
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-base outline-none resize-none"
                style={{
                  backgroundColor: '#fff',
                  border: `2px solid ${theme.cardBorder}`,
                  color: theme.textDark,
                  fontFamily: '"Noto Sans KR", sans-serif',
                }}
                onFocus={(e) => e.target.style.borderColor = theme.red}
                onBlur={(e) => e.target.style.borderColor = theme.cardBorder}
              />
              <p className="text-xs mt-2 text-right" style={{ color: theme.textMuted }}>
                {message.length}/50
              </p>
            </div>

            {/* 글자 크기 */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="text-sm font-semibold"
                  style={{ color: theme.textDark, fontFamily: '"Noto Sans KR", sans-serif' }}
                >
                  📏 글자 크기
                </label>
                <span
                  className="text-sm px-2 py-1 rounded-md"
                  style={{ backgroundColor: theme.bgSecondary, color: theme.cream }}
                >
                  {fontSize}px
                </span>
              </div>
              <input
                type="range"
                min="14"
                max="28"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${theme.red} 0%, ${theme.red} ${((fontSize - 14) / 14) * 100}%, ${theme.cardBorder} ${((fontSize - 14) / 14) * 100}%, ${theme.cardBorder} 100%)`,
                }}
              />
            </div>

            {/* 글자 색상 */}
            <div className="mb-6">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: theme.textDark, fontFamily: '"Noto Sans KR", sans-serif' }}
              >
                🎨 글자 색상
              </label>
              <div className="flex gap-2 flex-wrap">
                {TEXT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setTextColor(color.value)}
                    className="w-9 h-9 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: color.value,
                      border: color.value === '#ffffff' || color.value === '#f5f0e6'
                        ? '2px solid #ddd'
                        : '2px solid transparent',
                      transform: textColor === color.value ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: textColor === color.value
                        ? `0 0 0 3px ${theme.cardBg}, 0 0 0 5px ${theme.red}`
                        : '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* 위치 조절 */}
            <div className="mb-6">
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: theme.textDark, fontFamily: '"Noto Sans KR", sans-serif' }}
              >
                ↕️ 메시지 위치
              </label>
              <input
                type="range"
                min="10"
                max="90"
                value={position}
                onChange={(e) => setPosition(Number(e.target.value))}
                className="w-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${theme.red} 0%, ${theme.red} ${((position - 10) / 80) * 100}%, ${theme.cardBorder} ${((position - 10) / 80) * 100}%, ${theme.cardBorder} 100%)`,
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: theme.textMuted }}>
                <span>↑ 위로</span>
                <span>아래로 ↓</span>
              </div>
            </div>

            {/* 다운로드 버튼 */}
            <button
              onClick={handleDownload}
              disabled={isDownloading || !message}
              className="w-full py-4 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              style={{
                backgroundColor: (!message || isDownloading) ? theme.cardBorder : theme.red,
                color: (!message || isDownloading) ? '#999' : '#fff',
                cursor: (!message || isDownloading) ? 'not-allowed' : 'pointer',
                fontFamily: '"Noto Sans KR", sans-serif',
              }}
            >
              {isDownloading ? '다운로드 중...' : (message ? '🎄 카드 다운로드' : '메시지를 입력해주세요')}
            </button>

            <p className="text-center text-xs mt-4" style={{ color: theme.textMuted }}>
              💝 카카오톡, 인스타그램에 공유하세요!
            </p>
          </section>
        </div>

        {/* 푸터 */}
        <footer className="text-center mt-16">
          <p className="text-3xl" style={{ fontFamily: '"Great Vibes", cursive', color: theme.cream }}>
            Happy Holidays!
          </p>
          <p className="text-2xl mt-2">🎅 🎁 🦌 ❄️ 🎄</p>
        </footer>
      </div>
    </main>
  );
}
