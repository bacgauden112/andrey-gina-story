// @ts-nocheck
import React from 'react';

// Guests invited to one party only see its date under the names.
const PARTY_DATE = { BRIDE: '18.10.2026', GROOM: '25.10.2026' };

export default function Section1({ guestType = 'BOTH' }: { guestType?: string }) {
  const partyDate = PARTY_DATE[guestType];
  return (
    <>
<div data-node-id="element_image_uuhu8y3wiv4" style={{"position":"absolute","left":"-4.097005208333329px","top":"-1.366102430555543px","width":"580.7565104166666px","height":"873.7580295138888px","zIndex":"0","opacity":"1","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","overflow":"hidden","borderRadius":"0px"}}>
          <div style={{"position":"relative","width":"100%","height":"100%"}}>
            <img src="./assets/cover-couple.jpg" alt="" style={{"width":"100%","height":"100%","objectFit":"cover","objectPosition":"50% 50%","display":"block","transform":"scale(1, 1)","transformOrigin":"center","borderRadius":"0px"}} />
            <div aria-hidden="true" style={{"position":"absolute","inset":"0","background":"linear-gradient(\n                  to top,\n                  rgba(0, 0, 0, 0.4) 0%,\n                  rgba(0, 0, 0, 0) 60%\n                )","opacity":"1","mixBlendMode":"normal","pointerEvents":"none","borderRadius":"0px"}}></div>
          </div>
        </div>
<div data-anim-preset="fadeInUp" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="0" style={{"position":"absolute","left":"0px","top":(partyDate ? 650 : 620) + "px","width":"100%","display":"flex","flexDirection":"column","alignItems":"center","gap":"20px","zIndex":"10","animation":"3000ms cubic-bezier(0.2, 0.8, 0.2, 1) 0ms 1 normal both\n              running miu-fadeInUp"}}>
          {partyDate && (
            <div style={{"fontFamily":"Lora, Georgia, \"Times New Roman\", serif","fontSize":"26px","letterSpacing":"0.25em","color":"rgb(255, 255, 255)","textShadow":"0 1px 8px rgba(0,0,0,0.5)","textAlign":"center","marginBottom":"-10px"}}>
              {partyDate}
            </div>
          )}
          <div style={{"fontFamily":"\"Arcittya-Begatri\", \"High Spirited\", cursive","fontSize":"70px","lineHeight":"1.1","color":"rgb(255, 255, 255)","textShadow":"0 1px 10px rgba(0,0,0,0.4)","textAlign":"center","whiteSpace":"nowrap"}}>
            Save the Date
          </div>
          <div style={{"fontFamily":"Lora, Georgia, \"Times New Roman\", serif","fontSize":"15px","lineHeight":"1.9","letterSpacing":"0.3em","color":"rgb(255, 255, 255)","textShadow":"0 1px 8px rgba(0,0,0,0.5)","textTransform":"uppercase","textAlign":"center","marginTop":"-4px"}}>
            For the wedding of<br />Quang Anh &amp; Ninh Giang
          </div>
        </div>
<div data-node-id="element_text_pzmveooy408" data-node-type="element_text" data-manual-sized="1" data-anim-preset="fadeInLeft" data-anim-duration="3000" data-anim-delay="0" data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)" data-anim-loop="0" data-anim-distance="200" style={{"position":"absolute","left":"-20px","top":"635px","width":"300px","height":"78px","zIndex":"0","--miu-node-rotate":"0deg","transform":"rotate(var(--miu-node-rotate, 0deg))","opacity":"1","display":"block","textAlign":"right","fontFamily":"\"UVN Hoa Tay\", \"Brush Script MT\", cursive","fontSize":"55px","fontWeight":"400","fontStyle":"normal","color":"rgb(255, 255, 255)","whiteSpace":"pre-wrap","paddingTop":"5px","paddingBottom":"5px","animation":"3000ms cubic-bezier(0.2, 0.8, 0.2, 1) 0ms 1 normal both\n              running miu-fadeInLeft","--miu-anim-distance":"200px"}}>
          Quang Anh
        </div>


    </>
  );
}
