// @ts-nocheck
import React from 'react';
export default function OverlayComponent() {
  return (
    <>
<div style={{"display":"none"}}>
  <template id="miu-modal-tpl-modal_cxcs136" data-bg="#ffffff" data-w="520" data-h="520" data-pad="18" data-radius="22" data-pres="center" data-close-backdrop="1" data-show-close="1"></template><template id="miu-modal-tpl-modal_cxcsepk" data-bg="#ffffff" data-w="520" data-h="520" data-pad="18" data-radius="22" data-pres="center" data-close-backdrop="1" data-show-close="1"></template>
</div>
<audio id="bgAudio" src="./audio/em_oi_sau_nay.m4a" loop="" hidden="" preload="metadata"></audio>
<div className="miu-fab-dock" id="miuFabDock" data-open="1">
  <button id="miuFabToggle" className="miu-fab" type="button" aria-label="Mở menu">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  </button>

  <button id="audioToggleBtn" className="miu-fab miu-fab-item playing" type="button" aria-label="Toggle music" title="Nhạc" data-label="Nhạc">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18V6l10-2v12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <circle cx="7" cy="18" r="3" stroke="white" strokeWidth="2" />
      <circle cx="17" cy="16" r="3" stroke="white" strokeWidth="2" />
    </svg>
  </button>
</div>
<div id="miuOpening" data-open="0" aria-hidden="false" style={{"display":"none","cursor":"pointer"}}>
  <div id="miuOpeningSides" className="default" role="dialog" aria-modal="true" style={{"--miu-opening-w":"600px"}}>
    <div className="card-side right" aria-hidden="true">
      <div className="miu-envelope" aria-hidden="true">
        <div className="miu-env-bottom">
          <div className="miu-env-frame">
            <div className="miu-env-stage" aria-hidden="true">
              <img className="miu-env-chain" src="./assets/daybenduoi.png" alt="" />
              <img className="miu-env-envelope" src="./assets/phongbi.png" alt="" />
              <img className="miu-env-nutthiep" src="./assets/nutthiep.png" alt="" />
              <div className="miu-env-overlay" aria-hidden="true">
                <img className="miu-env-flower-left" src="./assets/hoabentrai.png" alt="" />
                <img className="miu-env-flower-right" src="./assets/hoa.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="card-side left">
      <div className="miu-envelope" aria-hidden="false">
        <div className="miu-env-top">
          <div className="miu-env-frame">
            <div className="miu-env-content" aria-hidden="true">
              <div className="miu-env-title">Trân trọng kính mời</div>
              <div className="miu-env-invite">Quý khách</div>
              <p style={{"margin":"-10px 0","color":"var(--opening-invite-color, rgba(0, 0, 0, 0.62))"}}>
                ------------------------------------------------
              </p>
            </div>
            <div className="miu-env-stage" aria-hidden="true">
              <img className="miu-env-chain" src="./assets/daybenduoi.png" alt="" />
              <img className="miu-env-envelope" src="./assets/phongbi.png" alt="" />
              <img className="miu-env-nutthiep" src="./assets/nutthiep.png" alt="" />
              <div className="miu-env-overlay" aria-hidden="true">
                <img className="miu-env-flower-left" src="./assets/hoabentrai.png" alt="" />
                <img className="miu-env-flower-right" src="./assets/hoa.png" alt="" />
              </div>
            </div>
            <div className="miu-env-date" aria-hidden="true"></div>
            <img className="miu-env-click-btn" src="./assets/nutclickmothiep.png" alt="" />
            <div className="miu-env-click" aria-hidden="false">
              <button id="miuOpeningBtn" type="button" aria-label="Mở thiệp"></button>
            </div>
          </div>
        </div>
        <div id="miuOpeningCta" aria-hidden="false">
          <button id="miuOpeningCtaBtn" type="button">Mở thiệp</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
}
