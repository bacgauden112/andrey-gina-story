// @ts-nocheck
import React from 'react';
import React, { useState } from 'react';

export default function Section10({ guestName, guestId }: { guestName?: string, guestId?: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!guestId) {
      alert('Vui lòng truy cập bằng link dành riêng cho bạn để gửi RSVP.');
      return;
    }
    
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const willAttend = formData.get('willAttend');
    const numberOfGuests = formData.get('numberOfGuests');
    
    try {
      const res = await fetch(`/api/guests/${guestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: willAttend === 'yes' ? 'THAM_GIA' : 'KHONG_THAM_GIA',
          guestCount: Number(numberOfGuests) || 1
        })
      });
      if (res.ok) setSuccess(true);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <>
<div data-node-id="element_image_tnpiwou4hwe" style={{"position":"absolute","left":"-1.291883680555543px","top":"8906.072048611111px","width":"574.7977430555555px","height":"560.4379340277778px","zIndex":"0","opacity":"1","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","overflow":"hidden","borderRadius":"0px"}}>
          <div style={{"position":"relative","width":"100%","height":"100%"}}>
            <img src="./assets/jadhaksjdnw1jl1231.png" alt="" style={{"width":"100%","height":"100%","objectFit":"cover","objectPosition":"50% 50%","display":"block","transform":"scale(1, 1)","transformOrigin":"center","borderRadius":"0px"}} />
          </div>
        </div>
<section data-node-id="element_rsvp_dni58kn4w7l" data-miu-rsvp="1" data-miu-rsvp-id="element_rsvp_dni58kn4w7l" data-slug="quang-anh-ninh-giang-2026-12-31" data-anim-preset="fadeIn" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="0" style={{"position":"absolute","left":"-1.9568142361111072px","top":"8564.474392361111px","width":"575.3487413194445px","height":"auto","zIndex":"0","opacity":"0","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","overflow":"visible","minHeight":"660.5944010416666px","--miu-rsvp-accent":"#928362","background":"transparent","borderRadius":"14px","padding":"40px 18px","fontFamily":"Lora","color":"#111827"}}>
          <div className="miu-rsvp-inner" style={{"width":"100%","height":"auto","display":"flex","flexDirection":"column","gap":"14px"}}>
            <div style={{"textAlign":"center"}}>
              <div className="miu-rsvp-title" style={{"fontWeight":"500","fontSize":"40px","lineHeight":"1.1","color":"#928362","fontFamily":"Lora"}}>
                Xác Nhận Tham Dự
              </div>
              <div className="miu-rsvp-subtitle" style={{"marginTop":"8px","fontSize":"20px","opacity":"0.85","lineHeight":"1.35","color":"#928362","whiteSpace":"pre-line","fontFamily":"Lora"}}>
                Việc xác nhận giúp chúng mình chuẩn bị chu đáo hơn. Cảm ơn bạn!
              </div>
            </div>

            <div className="miu-rsvp-form-wrap" style={{"background":"rgba(17, 24, 39, 0.06)","borderRadius":"12px","padding":"14px"}}>
              {success ? (
                <div style={{ textAlign: 'center', fontSize: '20px', color: '#928362', padding: '20px 0' }}>
                  Cảm ơn <strong>{guestName || 'bạn'}</strong> đã xác nhận!<br/>Chúng mình rất mong được gặp bạn.
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
                  <div style={{ fontSize: '22px', color: '#928362', textAlign: 'center', marginBottom: '10px' }}>
                    Xin chào <strong>{guestName || 'Quý khách'}</strong>
                  </div>
                  
                  <label className="miu-rsvp-label">
                    <div className="miu-rsvp-label-text">Số người tham dự</div>
                    <input type="number" name="numberOfGuests" min="1" step="1" defaultValue="1" placeholder="Ví dụ: 2" className="miu-rsvp-input" style={{"fontSize":"20px","color":"#928362"}} />
                  </label>
                  
                  <div className="miu-rsvp-radio" data-kind="attendance">
                    <label><input type="radio" name="willAttend" value="yes" defaultChecked />
                      Có, tôi sẽ tham dự</label>
                    <label><input type="radio" name="willAttend" value="no" /> Xin
                      lỗi, tôi bận mất rồi!</label>
                  </div>
                  
                  <textarea name="message" placeholder="Lời nhắn cho Cô Dâu &amp; Chú Rể" className="miu-rsvp-textarea" style={{"fontSize":"20px","color":"#928362"}}></textarea>
  
                  <div style={{"display":"flex","alignItems":"center","justifyContent":"center","marginTop":"22px"}}>
                    <button type="submit" disabled={loading || !guestId} style={{"appearance":"none","border":"0","background":"#928362","color":"#ffffff","borderRadius":"999px","padding":"12px 18px","fontWeight":"600","cursor":"pointer","whiteSpace":"nowrap","fontSize":"20px","minWidth":"180px", opacity: (loading || !guestId) ? 0.5 : 1}}>
                      {loading ? 'Đang gửi...' : (guestId ? 'Xác nhận' : 'Vui lòng truy cập bằng link cá nhân')}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
<div data-node-id="element_image_rfzilsl6fuj" style={{"position":"absolute","left":"-4.745876736111114px","top":"9436.993055555557px","width":"581.2215711805555px","height":"968.9624565972222px","zIndex":"0","opacity":"1","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","overflow":"hidden","borderRadius":"0px"}}>
          <div style={{"position":"relative","width":"100%","height":"100%"}}>
            <img src="./assets/jadhaksjdnw1jl1231.png" alt="" style={{"width":"100%","height":"100%","objectFit":"cover","objectPosition":"50% 50%","display":"block","transform":"scale(1, 1)","transformOrigin":"center","borderRadius":"0px"}} />
          </div>
        </div>
<section data-node-id="element_wishes_hafv0w9720j" data-miu-wishes="1" data-miu-wishes-id="element_wishes_hafv0w9720j" data-slug="quang-anh-ninh-giang-2026-12-31" data-initial-limit="3" data-submit-text="Gửi lời chúc" data-loadmore-text="Xem thêm lời chúc ↓" data-empty-text="Chưa có lời chúc nào" data-anim-preset="fadeIn" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="0" style={{"position":"absolute","left":"-2.9893663194444327px","top":"9597.25542534722px","width":"579.666232638889px","height":"778.6076388888889px","zIndex":"0","opacity":"0","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","overflow":"visible","background":"transparent","borderRadius":"14px","padding":"18px","fontFamily":"Lora","color":"#1f2937","--miu-wishes-list-name-size":"20px","--miu-wishes-list-comment-size":"20px","--miu-wishes-list-name-color":"#928362","--miu-wishes-list-comment-color":"#928362"}}>
          <div className="miu-wishes-inner" style={{"width":"100%","height":"100%","minHeight":"0","display":"flex","flexDirection":"column","gap":"14px"}}>
            <div style={{"textAlign":"center"}}>
              <div className="miu-wishes-title" style={{"fontWeight":"400","fontSize":"80px","lineHeight":"1.1","color":"#928362","fontFamily":"'High Spirited', 'Brush Script MT', cursive"}}>
                Sổ lưu bút
              </div>
              <div className="miu-wishes-subtitle" style={{"marginTop":"8px","fontSize":"20px","opacity":"0.85","lineHeight":"1.35","color":"#1f29a37","whiteSpace":"pre-line","fontFamily":"Lora"}}>
                Cảm ơn bạn rất nhiều vì đã gửi những lời chúc mừng tốt đẹp nhất
                đến đám cưới của chúng tôi!
              </div>
            </div>

            <div className="miu-wishes-form-wrap" style={{"background":"#928362","borderRadius":"12px","padding":"14px"}}>
              <form data-miu-wishes-form="1" data-miu-wishes-id="element_wishes_hafv0w9720j" style={{"display":"flex","flexDirection":"column","gap":"10px"}}>
                <input type="text" name="fullname" placeholder="Nhập tên của bạn*" required="" style={{"width":"100%","border":"1px solid rgba(0, 0, 0, 0.12)","borderRadius":"10px","padding":"10px 12px","fontSize":"20px","color":"#928362"}} />
                <textarea name="comment" placeholder="Nhập lời chúc của bạn*" required="" style={{"width":"100%","border":"1px solid rgba(0, 0, 0, 0.12)","borderRadius":"10px","padding":"10px 12px","fontSize":"20px","minHeight":"30px","resize":"vertical","color":"#928362"}}></textarea>
                <div style={{"display":"flex","alignItems":"center","justifyContent":"center"}}>
                  <button type="submit" data-miu-wishes-submit="1" data-miu-wishes-id="element_wishes_hafv0w9720j" style={{"appearance":"none","border":"0","background":"#928362","color":"#ffffff","borderRadius":"10px","padding":"10px 16px","fontWeight":"900","cursor":"pointer","whiteSpace":"nowrap","fontSize":"20px","fontFamily":"Lora"}}>
                    Gửi lời chúc
                  </button>
                </div>
              </form>
            </div>

            <div data-miu-wishes-list="1" data-miu-wishes-id="element_wishes_hafv0w9720j" style={{"background":"rgba(255, 255, 255, 0.6)","borderRadius":"12px","flex":"1 1 auto","minHeight":"0px","overflow":"auto"}}>
              <div className="miu-wishes-item">
                <div className="miu-wishes-name">Hoàng</div>
                <div className="miu-wishes-comment">
                  Chúc hai bạn luôn đồng hành cùng nhau, ăn ngon ngủ kỹ, kiếm
                  nhiều tiền và hạnh phúc mỗi ngày 😄 Mãi giữ được tình yêu ngọt
                  ngào như hôm nay nha 💖✨
                </div>
              </div>
              <div className="miu-wishes-item">
                <div className="miu-wishes-name">Hiếu</div>
                <div className="miu-wishes-comment">
                  🎉 Happy Wedding Giang &amp; Anh 💒❤️
                </div>
              </div>
              <div className="miu-wishes-item">
                <div className="miu-wishes-name">Lan nè</div>
                <div className="miu-wishes-comment">
                  💌 Chúc mừng đám cưới Giang &amp; Anh nhaaa 🥰 Cuối cùng cũng
                  về chung một nhà rồi ❤️ Chúc hai bạn mãi hạnh phúc, lúc nào
                  cũng yêu thương và nhường nhịn nhau như bây giờ ✨ Sớm có thêm
                  nhiều niềm vui và thật nhiều kỷ niệm đẹp cùng nhau nhé 💕
                </div>
              </div>
            </div>
            <button type="button" data-miu-wishes-more="1" data-miu-wishes-id="element_wishes_hafv0w9720j" style={{"appearance":"none","border":"0px","background":"transparent","color":"rgb(29, 78, 216)","fontWeight":"900","cursor":"pointer","padding":"8px 0px","display":"none"}}>
              Xem thêm lời chúc ↓
            </button>
          </div>
        </section>
<div data-node-id="element_image_orawxgf8amu" data-anim-preset="fadeIn" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="0" style={{"position":"absolute","left":"-27.75086805555555px","top":"10401.419704861111px","width":"601.8897569444445px","height":"439.2137586805556px","zIndex":"0","opacity":"0","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","overflow":"hidden","borderRadius":"0px"}}>
          <div style={{"position":"relative","width":"100%","height":"100%"}}>
            <img src="https://res.cloudinary.com/qfehnx6t/image/upload/q_auto,f_auto/v1789790117/TIT04199.jpg" alt="" style={{"width":"100%","height":"100%","objectFit":"cover","objectPosition":"50% 50%","display":"block","transform":"scale(1, 1)","transformOrigin":"center","borderRadius":"0px"}} />
            <div aria-hidden="true" style={{"position":"absolute","inset":"0","background":"linear-gradient(\n                  to top,\n                  rgba(0, 0, 0, 0.4) 0%,\n                  rgba(0, 0, 0, 0) 60%\n                )","opacity":"1","mixBlendMode":"normal","pointerEvents":"none","borderRadius":"0px"}}></div>
          </div>
        </div>
<div data-node-id="element_text_tb738tj9w45" data-node-type="element_text" data-manual-sized="1" style={{"position":"absolute","left":"21.98459201388889px","top":"10722.120442708334px","width":"530.1848958333334px","height":"94px","zIndex":"0","opacity":"1","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate,0deg))","display":"block","textAlign":"center","fontFamily":"Lora, Georgia, 'Times New Roman', serif","fontSize":"18px","fontWeight":"200","fontStyle":"normal","color":"#ffffff","whiteSpace":"pre-wrap","paddingTop":"5px","paddingBottom":"5px"}}>
          Cảm ơn bạn đã dành tình cảm cho chúng mình!<br />Sự hiện diện của bạn
          chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được
          cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.
        </div>
<div data-node-id="element_text_tb83cs9akpt" data-node-type="element_text" data-manual-sized="1" data-anim-preset="fadeIn" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="0" style={{"position":"absolute","left":"146.097221879012px","top":"10631.510639821337px","width":"283.396391145031px","height":"91px","zIndex":"0","opacity":"0","--miu-node-rotate":"-0.011346815692377277deg","transform":"rotate(var(--miu-node-rotate,0deg))","display":"block","textAlign":"center","fontFamily":"'UVN Hoa Tay', 'Brush Script MT', cursive","fontSize":"70px","fontWeight":"400","fontStyle":"normal","color":"#fcfcfc","whiteSpace":"pre-wrap","paddingTop":"5px","paddingBottom":"5px"}}>
          Thank You
        </div>
<button data-node-id="element_button_2yjiyvmcxcs" data-anim-preset="heartBeat" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="1" data-miu-btn="1" data-action="modal" data-url="" data-newtab="0" data-target-id="" data-copy="" data-modal-id="modal_cxcs136" type="button" style={{"position":"absolute","left":"106.48372395833333px","top":"9386.090494791666px","width":"360px","height":"64px","zIndex":"0","opacity":"0","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate,0deg))","display":"flex","alignItems":"center","justifyContent":"center","padding":"12px 18px 12px 18px","borderRadius":"18px","border":"0px solid rgba(0,0,0,0)","background":"#928362","color":"#ffffff","fontFamily":"Lora, Georgia, 'Times New Roman', serif","fontSize":"22px","fontWeight":"800","cursor":"pointer","userSelect":"none","boxSizing":"border-box"}}>
          <span style={{"width":"22px","height":"22px","display":"inline-flex","alignItems":"center","justifyContent":"center","color":"#ffffff","marginRight":"10px","flex":"0 0 auto"}}><svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 12v10H4V12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
              <path d="M2 7h20v5H2V7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
              <path d="M12 22V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
              <path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C10 2 12 7 12 7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path>
              <path d="M12 7h4.5a2.5 2.5 0 1 0 0-5C14 2 12 7 12 7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"></path></svg></span>Quà mừng cưới</button>
<div data-node-id="element_text_8pauzxaqtny" data-node-type="element_text" data-manual-sized="1" data-anim-preset="fadeIn" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="0" data-anim-distance="200" style={{"position":"absolute","left":"270.761px","top":"628.758px","width":"65.4789px","height":"78px","zIndex":"0","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","opacity":"1","display":"block","textAlign":"center","fontFamily":"\"UVN Hoa Tay\", \"Brush Script MT\", cursive","fontSize":"60px","fontWeight":"400","fontStyle":"normal","color":"rgb(255, 255, 255)","whiteSpace":"pre-wrap","paddingTop":"5px","paddingBottom":"5px","animation":"3000ms cubic-bezier(0.2, 0.8, 0.2, 1) 0ms 1 normal both\n              running miu-fadeIn","--miu-anim-distance":"200px"}}>
          &amp;
        </div>
<div data-node-id="element_text_gxe51u0quvb" data-node-type="element_text" data-manual-sized="1" data-anim-preset="fadeInRight" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="0" data-anim-distance="200" style={{"position":"absolute","left":"310px","top":"635px","width":"300px","height":"78px","zIndex":"0","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","opacity":"1","display":"block","textAlign":"left","fontFamily":"\"UVN Hoa Tay\", \"Brush Script MT\", cursive","fontSize":"55px","fontWeight":"400","fontStyle":"normal","color":"rgb(255, 255, 255)","whiteSpace":"pre-wrap","paddingTop":"5px","paddingBottom":"5px","animation":"3000ms cubic-bezier(0.2, 0.8, 0.2, 1) 0ms 1 normal both\n              running miu-fadeInRight","--miu-anim-distance":"200px"}}>
          Ninh Giang
        </div>

    </>
  );
}
