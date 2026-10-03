// @ts-nocheck
import React from "react";
import { SHIFT_AFTER_INTRO } from "./canvasOffsets";

const PROFILES = [
  {
    role: "The Groom",
    name: "Quang Anh",
    meta: "1994 · Hà Nội · IT",
    about:
      "Anh ít nói, điềm tĩnh, quen với logic và có phần lạnh lùng trong mắt những người mới gặp. Nhưng ở cạnh Giang, anh lại là một phiên bản rất khác - hay cười, ngọt ngào và luôn chăm sóc vợ từ những điều nhỏ nhất.",
  },
  {
    role: "The Bride",
    name: "Ninh Giang",
    meta: "1998 · Hải Phòng · Marketing",
    about:
      "Giang vui vẻ, nhiều cảm xúc, yêu hoa, yêu bầu trời và vẫn thường rung động trước những điều rất nhỏ. Một chút bay bổng, một chút mộng mơ, và luôn muốn cuộc sống của mình có thật nhiều điều xinh đẹp.",
  },
];

const PROFILE_BOX = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontFamily: "Lora, Georgia, 'Times New Roman', serif",
  fontSize: "14px",
  fontWeight: "200",
  lineHeight: "1.45",
  color: "#928362",
};

function Profile({ role, name, meta, about }) {
  return (
    <>
      <div style={{ fontFamily: "'High Spirited', 'Brush Script MT', cursive", fontSize: "34px", fontWeight: "400", lineHeight: "1", marginBottom: "-5px", color: "#928362" }}>
        {role}
      </div>
      <div style={{ fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif", fontSize: "24px", fontWeight: "400", textTransform: "uppercase", lineHeight: "1.2", color: "#928362" }}>
        {name}
      </div>
      <div style={{ fontWeight: "400", fontSize: "13px" }}>{meta}</div>
      <div style={{ fontSize: "13px", lineHeight: "1.5", opacity: 0.85 }}>{about}</div>
    </>
  );
}

export default function Section8() {
  return (
    <>
      <div
        data-node-id="element_image_q805w0pboez"
        style={{
          position: "absolute",
          left: "-2.2052951388888826px",
          top: "4942.576388888889px",
          width: "575.4915364583333px",
          height: "441.8791232638889px",
          zIndex: "0",
          opacity: "1",
          "--miu-node-rotate": "0deg",
          transform: "rotate(var(--miu-node-rotate, 0deg))",
          overflow: "hidden",
          borderRadius: "0px",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src="./assets/nbnmdasjdh12lk3m12l3km.png"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              display: "block",
              transform: "scale(1, 1)",
              transformOrigin: "center",
              borderRadius: "0px",
            }}
          />
        </div>
      </div>
      <div
        data-node-id="element_image_monogram_ag"
        data-anim-preset="pop"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{
          position: "absolute",
          left: "232px",
          top: "5006px",
          width: "111px",
          height: "146px",
          zIndex: "0",
          opacity: "0",
          "--miu-node-rotate": "0deg",
          transform: "rotate(var(--miu-node-rotate, 0deg))",
        }}
      >
        <img
          src="./assets/monogram-ag.png"
          alt="A&G"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
      <div
        data-node-id="element_text_gk7yvcrhsdn"
        data-node-type="element_text"
        data-manual-sized="1"
        data-anim-preset="fadeInUp"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{
          position: "absolute",
          left: "22.587239583333336px",
          top: "5188.939670138889px",
          width: "530.1848958333334px",
          height: "164px",
          zIndex: "0",
          opacity: "0",
          "--miu-node-rotate": "0deg",
          transform: "rotate(var(--miu-node-rotate,0deg))",
          display: "block",
          textAlign: "center",
          fontFamily: "Lora, Georgia, 'Times New Roman', serif",
          fontSize: "18px",
          fontWeight: "200",
          fontStyle: "normal",
          color: "#928362",
          whiteSpace: "pre-wrap",
          paddingTop: "5px",
          paddingBottom: "5px",
          textWrap: "balance",
        }}
      >
        Hai đứa là hai mảnh tính cách khá khác nhau.
        <br />
        Một người điềm tĩnh và lý trí. Một người nhiều cảm xúc và đôi chút mộng
        mơ.
        <br />
        Có lẽ cũng vì thế mà thế giới của người này luôn có điều gì đó thú vị
        trong mắt người kia.
      </div>
      <div
        data-node-id="element_shape_hk4om4ex79t"
        data-anim-preset="rotateInDownLeft"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{
          position: "absolute",
          left: "87.44431813675308px",
          top: "5423.735894097223px",
          width: "211.04159475429384px",
          height: "281.98381941565833px",
          zIndex: "0",
          opacity: "0",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          "--miu-node-rotate": "-14.253931432707958deg",
          transform: "rotate(var(--miu-node-rotate, 0deg))",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          style={{ display: "block", overflow: "visible" }}
        >
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            rx="0"
            ry="0"
            fill="#ffffff"
            stroke="none"
            strokeWidth="0"
          ></rect>
        </svg>
      </div>
      <div
        data-node-id="element_image_ss0z1sox79t"
        data-anim-preset="rotateInDownLeft"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{
          position: "absolute",
          left: "92.48046875000003px",
          top: "5429.489459929589px",
          width: "201.36257314136435px",
          height: "270.9991916138603px",
          zIndex: "0",
          opacity: "0",
          "--miu-node-rotate": "-14.253931432707958deg",
          transform: "rotate(var(--miu-node-rotate, 0deg))",
          overflow: "hidden",
          borderRadius: "0px",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src="https://res.cloudinary.com/qfehnx6t/image/upload/q_auto,f_auto/v1789790114/TIT02777.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              display: "block",
              transform: "scale(1, 1)",
              transformOrigin: "center",
              borderRadius: "0px",
            }}
          />
        </div>
      </div>
      <div
        data-node-id="element_shape_nnwtslwx79t"
        data-anim-preset="rotateInDownRight"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{
          position: "absolute",
          left: "248.57552083333331px",
          top: "5651.992498124035px",
          width: "211.04159475429384px",
          height: "281.98381941565833px",
          zIndex: "0",
          opacity: "0",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
          "--miu-node-rotate": "10.281755059169484deg",
          transform: "rotate(var(--miu-node-rotate, 0deg))",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          style={{ display: "block", overflow: "visible" }}
        >
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            rx="0"
            ry="0"
            fill="#ffffff"
            stroke="none"
            strokeWidth="0"
          ></rect>
        </svg>
      </div>
      <div
        data-node-id="element_image_qsuv57fx79u"
        data-anim-preset="rotateInDownRight"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{
          position: "absolute",
          left: "253.57673221046915px",
          top: "5657.736081317512px",
          width: "201.36257314136435px",
          height: "270.9991916138603px",
          zIndex: "0",
          opacity: "0",
          "--miu-node-rotate": "10.281755059169484deg",
          transform: "rotate(var(--miu-node-rotate, 0deg))",
          overflow: "hidden",
          borderRadius: "0px",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <img
            src="https://res.cloudinary.com/qfehnx6t/image/upload/q_auto,f_auto/v1789790112/TIT03140.jpg"
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 50%",
              display: "block",
              transform: "scale(1, 1)",
              transformOrigin: "center",
              borderRadius: "0px",
            }}
          />
        </div>
      </div>
      <div
        data-node-id="element_text_profile_groom"
        data-anim-preset="fadeInDown"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{ position: "absolute", left: "312px", top: "5385px", width: "245px", zIndex: "0", opacity: "0", ...PROFILE_BOX, textAlign: "left", alignItems: "flex-start" }}
      >
        <Profile {...PROFILES[0]} />
      </div>
      <div
        data-node-id="element_text_profile_bride"
        data-anim-preset="fadeInDown"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{ position: "absolute", left: "22px", top: "5735px", width: "205px", zIndex: "0", opacity: "0", ...PROFILE_BOX, textAlign: "right", alignItems: "flex-end" }}
      >
        <Profile {...PROFILES[1]} />
      </div>
      <div
        data-node-id="element_text_couple_profiles"
        data-anim-preset="fadeInUp"
        data-anim-duration="3000"
        data-anim-delay="0"
        data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
        data-anim-loop="0"
        style={{
          position: "absolute",
          left: "22.5px",
          top: "6030px",
          width: "530px",
          zIndex: "0",
          opacity: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "22px",
          textAlign: "center",
          fontFamily: "Lora, Georgia, 'Times New Roman', serif",
          fontSize: "18px",
          fontWeight: "200",
          lineHeight: "1.5",
          textWrap: "balance",
          color: "#928362",
        }}
      >
        <div>
          Từ khi có Giang, thế giới của Anh dường như nhiều tiếng cười hơn.
          <br />
          Từ khi có Anh, Giang lại thấy mình chậm hơn một chút, tận hưởng nhiều
          hơn những khoảnh khắc đang có.
        </div>
      </div>
      <div style={{ transform: `translateY(${SHIFT_AFTER_INTRO}px)` }}>
        <div
          data-node-id="element_text_j3tjlcizilk"
          data-node-type="element_text"
          data-manual-sized="1"
          data-anim-preset="fadeInUp"
          data-anim-duration="3000"
          data-anim-delay="0"
          data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
          data-anim-loop="0"
          style={{
            position: "absolute",
            left: "22.533637152777775px",
            top: "5990.872395833333px",
            width: "530.1848958333334px",
            height: "70px",
            zIndex: "0",
            opacity: "0",
            "--miu-node-rotate": "0deg",
            transform: "rotate(var(--miu-node-rotate,0deg))",
            display: "block",
            textAlign: "center",
            fontFamily: "Lora, Georgia, 'Times New Roman', serif",
            fontSize: "18px",
            fontWeight: "200",
            fontStyle: "normal",
            color: "#928362",
            whiteSpace: "pre-wrap",
            paddingTop: "5px",
            paddingBottom: "5px",
          }}
        >
          Hôm nay là ngày chúng mình cùng nắm tay
          <br />
          bước vào hành trình mới
          <br />
          hành trình của yêu thương và sẻ chia.
        </div>
        <div
          data-node-id="element_image_sdkqtj91c5n"
          data-anim-preset="fadeIn"
          data-anim-duration="3000"
          data-anim-delay="0"
          data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
          data-anim-loop="0"
          style={{
            position: "absolute",
            left: "-0.5132378472222112px",
            top: "6099.58984375px",
            width: "575.1171875px",
            height: "110.39561631944444px",
            zIndex: "0",
            opacity: "0",
            "--miu-node-rotate": "0deg",
            transform: "rotate(var(--miu-node-rotate, 0deg))",
            overflow: "hidden",
            borderRadius: "0px",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src="./assets/ndasjdhjk123n213n12ljl.png"
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "50% 50%",
                display: "block",
                transform: "scale(1, 1)",
                transformOrigin: "center",
                borderRadius: "0px",
              }}
            />
          </div>
        </div>
        <div
          data-node-id="element_calendar_656b5wh1pz0"
          data-anim-preset="fadeIn"
          data-anim-duration="3000"
          data-anim-delay="0"
          data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
          data-anim-loop="0"
          style={{
            position: "absolute",
            left: "18.43337673611113px",
            top: "6327.532335069444px",
            width: "532.0720486111111px",
            height: "297.146484375px",
            zIndex: "0",
            opacity: "0",
            "--miu-node-rotate": "0deg",
            transform: "rotate(var(--miu-node-rotate, 0deg))",
            display: "flex",
            flexDirection: "column",
            color: "#928362",
            fontFamily: "",
            gap: "6px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "4px",
              fontSize: "12px",
              opacity: "0.85",
              textTransform: "capitalize",
              height: "18px",
              alignItems: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>Th 2</div>
            <div style={{ textAlign: "center" }}>Th 3</div>
            <div style={{ textAlign: "center" }}>Th 4</div>
            <div style={{ textAlign: "center" }}>Th 5</div>
            <div style={{ textAlign: "center" }}>Th 6</div>
            <div style={{ textAlign: "center" }}>Th 7</div>
            <div style={{ textAlign: "center" }}>CN</div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "4px",
              flex: "1",
              alignContent: "start",
              fontSize: "18px",
              fontWeight: "600",
            }}
          >
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "0.25",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            ></div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "0.25",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            ></div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "0.25",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            ></div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              1
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              2
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              3
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              4
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              5
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              6
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              7
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              8
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              9
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              10
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              11
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              12
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              13
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              14
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              15
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              16
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              17
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                data-anim-preset="heartBeat"
                data-anim-duration="1200"
                data-anim-delay="0"
                data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
                data-anim-loop="1"
              >
                <div
                  style={{
                    position: "relative",
                    width: "42px",
                    height: "33.6px",
                    transform: "translateY(5%)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "21px",
                      height: "33.6px",
                      background: "#928362",
                      borderRadius: "16.8px 16.8px 0 0",
                      transform: "rotate(-45deg)",
                      transformOrigin: "0 100%",
                      left: "21px",
                      top: "0",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      width: "21px",
                      height: "33.6px",
                      background: "#928362",
                      borderRadius: "16.8px 16.8px 0 0",
                      transform: "rotate(45deg)",
                      transformOrigin: "100% 100%",
                      left: "0",
                      top: "0",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "18.900000000000002px",
                      zIndex: "1",
                      padding: "2px 4px",
                    }}
                  >
                    18
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              19
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              20
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              21
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              22
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              23
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              24
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                data-anim-preset="heartBeat"
                data-anim-duration="1200"
                data-anim-delay="0"
                data-anim-easing="cubic-bezier(0.2, 0.8, 0.2, 1)"
                data-anim-loop="1"
              >
                <div
                  style={{
                    position: "relative",
                    width: "42px",
                    height: "33.6px",
                    transform: "translateY(5%)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      width: "21px",
                      height: "33.6px",
                      background: "#928362",
                      borderRadius: "16.8px 16.8px 0 0",
                      transform: "rotate(-45deg)",
                      transformOrigin: "0 100%",
                      left: "21px",
                      top: "0",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      width: "21px",
                      height: "33.6px",
                      background: "#928362",
                      borderRadius: "16.8px 16.8px 0 0",
                      transform: "rotate(45deg)",
                      transformOrigin: "100% 100%",
                      left: "0",
                      top: "0",
                    }}
                  ></div>
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "18.900000000000002px",
                      zIndex: "1",
                      padding: "2px 4px",
                    }}
                  >
                    25
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              26
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              27
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              28
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              29
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              30
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "1",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            >
              31
            </div>
            <div
              style={{
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                background: "transparent",
                color: "#928362",
                opacity: "0.25",
                border: "1px solid transparent",
                boxSizing: "border-box",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
}
