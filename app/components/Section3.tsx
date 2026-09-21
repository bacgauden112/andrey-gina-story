import React from 'react';

export default function Section3({ guestName }: { guestName?: string }) {
  return (
    <section style={{ position: 'absolute', top: '2102px', left: 0, width: '100%', overflow: 'hidden' }}>
      {/* Background Textures & Flowers */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {/* Paper texture repeating vertically */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(./assets/ndbasjdhsakjdhaskjdaksd.png)', backgroundSize: 'cover', backgroundRepeat: 'repeat-y' }}></div>
        {/* Top-left flower (flipped) */}
        <img src="./assets/hdaskjdh123j1o2i3j1.png" style={{ position: 'absolute', top: '-100px', left: '-50px', width: '100%', maxWidth: '600px', transform: 'scaleX(-1)', opacity: 0.8 }} alt="" />
        {/* Bottom-right flower */}
        <img src="./assets/jadhaksjdnw1jl1231.png" style={{ position: 'absolute', bottom: '-50px', right: '-50px', width: '100%', maxWidth: '600px', opacity: 0.8 }} alt="" />
      </div>

      {/* Content Wrapper */}
      <div style={{ position: 'relative', zIndex: 1, padding: '60px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px', color: '#928362', fontFamily: 'Lora, Georgia, "Times New Roman", serif' }}>
        
        {/* Parents Names */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', maxWidth: '500px' }}>
          {/* Nhà Trai */}
          <div data-anim-preset="lightSpeedInLeft" style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ fontSize: '21px', textTransform: 'uppercase' }}>NHÀ TRAI</div>
            <div style={{ fontSize: '19px' }}>Ông: Đặng Quang Thuật</div>
            <div style={{ fontSize: '19px' }}>Bà: Trịnh Thị Thìn</div>
          </div>
          {/* Separator */}
          <div style={{ width: '1px', backgroundColor: '#928362', alignSelf: 'stretch', margin: '0 10px', opacity: 0.5 }}></div>
          {/* Nhà Gái */}
          <div data-anim-preset="lightSpeedInRight" style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <div style={{ fontSize: '21px', textTransform: 'uppercase' }}>NHÀ GÁI</div>
            <div style={{ fontSize: '19px' }}>Ông: Trần Mậu Trường</div>
            <div style={{ fontSize: '19px' }}>Bà: Phạm Thị Đam</div>
          </div>
        </div>

        {/* Invitation Text */}
        <div data-anim-preset="fadeInUp" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <div style={{ fontSize: '21px' }}>Trân trọng kính mời</div>
          <div style={{ fontSize: '22px', fontWeight: 'bold', fontStyle: 'italic' }}>{guestName ? guestName : 'Quý khách'}</div>
          <div style={{ fontSize: '20px', letterSpacing: '-2px' }}>----------------------------------------</div>
          <div style={{ fontSize: '21px' }}>Tham dự bữa tiệc chung vui cùng<br/>gia đình chúng tôi</div>
        </div>

        {/* Couple Names */}
        <div data-anim-preset="fadeInUp" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', fontFamily: '"High Spirited", cursive', fontSize: '70px', color: '#a18955' }}>
          <div>Quang Anh</div>
          <div>&amp;</div>
          <div>Ninh Giang</div>
        </div>

        {/* Lễ Thành Hôn */}
        <div data-anim-preset="fadeInUp" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
          <div style={{ fontSize: '21px', textTransform: 'uppercase' }}>LỄ THÀNH HÔN ĐƯỢC TỔ CHỨC<br/>VÀO LÚC 08 GIỜ 00</div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '20px', letterSpacing: '-2px' }}>____________</div>
              <div style={{ fontSize: '25px', fontWeight: 'bold' }}>THÁNG 10</div>
            </div>
            <div style={{ fontSize: '50px', fontWeight: '200' }}>25</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '20px', letterSpacing: '-2px' }}>____________</div>
              <div style={{ fontSize: '25px', fontWeight: 'bold' }}>NĂM 2026</div>
            </div>
          </div>

          <div style={{ fontSize: '21px', fontStyle: 'italic', marginTop: '10px' }}>(Tức ngày 16 tháng 09 năm Bính Ngọ)</div>
          <div style={{ fontSize: '21px' }}>Tại địa điểm</div>
          <div style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase' }}>Trung tâm tổ chức sự kiện tiệc cưới<br/>Nguyên Đình</div>
          <div style={{ fontSize: '21px', fontStyle: 'italic' }}>Tầng 4 - TTTM TRƯƠNG ĐỊNH PLAZA, 461 Trương Định, Phường Tương Mai, TP. Hà Nội</div>
          
          <a href="https://maps.app.goo.gl/RgNM4QepabMrQXEN9" target="_blank" style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '25px', fontWeight: 'bold', textDecoration: 'none', color: '#928362' }}>
            <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
              <path d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="currentColor"></path>
            </svg>
            Chỉ đường
          </a>
        </div>

        {/* Separator */}
        <div style={{ fontSize: '20px', letterSpacing: '-2px', margin: '20px 0' }}>----------------------------------------------------------</div>

        {/* Lễ Ăn Hỏi */}
        <div data-anim-preset="fadeInUp" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '100%' }}>
          <div style={{ fontSize: '21px', textTransform: 'uppercase' }}>LỄ ĂN HỎI ĐƯỢC TỔ CHỨC<br/>VÀO LÚC 11 GIỜ 00</div>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '20px', letterSpacing: '-2px' }}>____________</div>
              <div style={{ fontSize: '25px', fontWeight: 'bold' }}>THÁNG 10</div>
            </div>
            <div style={{ fontSize: '50px', fontWeight: '200' }}>18</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '20px', letterSpacing: '-2px' }}>____________</div>
              <div style={{ fontSize: '25px', fontWeight: 'bold' }}>NĂM 2026</div>
            </div>
          </div>

          <div style={{ fontSize: '21px', fontStyle: 'italic', marginTop: '10px' }}>(Tức ngày 09 tháng 09 năm Bính Ngọ)</div>
          <div style={{ fontSize: '21px' }}>Tại địa điểm</div>
          <div style={{ fontSize: '25px', fontWeight: 'bold', textTransform: 'uppercase' }}>Trung tâm tổ chức sự kiện tiệc cưới<br/>PANDORA CENTER</div>
          <div style={{ fontSize: '21px', fontStyle: 'italic' }}>Sảnh tiệc Athena 1 - Tầng 5<br/>12 Võ Nguyên Giáp, An Biên, Hải Phòng</div>
          
          <a href="https://maps.app.goo.gl/mdHRRwBDcrYHg4dWA" target="_blank" style={{ marginTop: '15px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '25px', fontWeight: 'bold', textDecoration: 'none', color: '#928362' }}>
            <svg width="31" height="31" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
              <path d="M12 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="currentColor"></path>
            </svg>
            Chỉ đường
          </a>
        </div>
      </div>
    </section>
  );
}
