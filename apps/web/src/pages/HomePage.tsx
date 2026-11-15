import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import StaggeredText from '../components/home/StaggeredText';
import './home-hero.css';

let introSeenThisLoad = false;

export default function HomePage() {
  const [ready, setReady] = useState(() => introSeenThisLoad || window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    videoRef.current?.pause();
    introSeenThisLoad = true;
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      introSeenThisLoad = true;
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const video = videoRef.current;
    let active = true;
    if (video) void video.play().catch(() => { if (active) finish(); });
    return () => {
      active = false;
      document.body.style.overflow = previousOverflow;
      video?.pause();
    };
  }, [ready, finish]);

  return (
    <main className="home-hero-page">
      <section className="home-opening" aria-label="Giới thiệu DAYORA">
        {ready ? (
          <img className="home-hero-media" src="/hero-last-frame.webp" alt="" />
        ) : (
          <video ref={videoRef} className="home-hero-media" src="/dayora-picnic-intro-optimized.mp4" poster="/hero-last-frame.webp" muted playsInline preload="auto" onEnded={finish} onError={finish} aria-label="Video giới thiệu DAYORA" />
        )}
        {ready ? (
          <div className="home-hero-copy">
            <p className="home-hero-eyebrow">PICNIC · HẸN HÒ · ĐI BIỂN</p>
            <h1 aria-label="Gói gọn đồ dùng, mở trọn cuộc vui.">
              <StaggeredText text="Gói gọn đồ dùng," />
              <br />
              <StaggeredText text="mở trọn cuộc vui." offset={0.4} />
            </h1>
            <p>Chuẩn bị cho chuyến đi trong ngày theo cách thật nhẹ nhàng.</p>
            <div className="home-hero-actions">
              <Link to="/tao-bo">Tạo bộ cho chuyến đi <span aria-hidden="true">→</span></Link>
              <Link to="/san-pham">Xem sản phẩm</Link>
            </div>
          </div>
        ) : (
          <button className="home-hero-skip" type="button" onClick={finish}>Bỏ qua giới thiệu <span aria-hidden="true">→</span></button>
        )}
      </section>
      <section id="trips-title" className="mx-auto max-w-4xl px-6 py-12" aria-label="Ba chuyến đi">
        <h2>Ba chuyến đi</h2>
        <p>Nội dung đang xây dựng.</p>
      </section>
    </main>
  );
}
