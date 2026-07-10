"use client";

import Image from "next/image";
import { motion, MotionConfig, type Variants } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const listStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
};

const railFade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

// Inline icons (no icon dependency in the project). They draw with currentColor
// so the badge sets the tint.
function GlobeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.74707 18.2036C4.39428 18.2036 4.91895 17.6789 4.91895 17.0317C4.91895 16.3845 4.39428 15.8599 3.74707 15.8599C3.09986 15.8599 2.5752 16.3845 2.5752 17.0317C2.5752 17.6789 3.09986 18.2036 3.74707 18.2036Z" fill="#21B1F1" />
      <path d="M3.66797 4.37598C4.31518 4.37598 4.83984 3.85131 4.83984 3.2041C4.83984 2.55689 4.31518 2.03223 3.66797 2.03223C3.02076 2.03223 2.49609 2.55689 2.49609 3.2041C2.49609 3.85131 3.02076 4.37598 3.66797 4.37598Z" fill="#21B1F1" />
      <path d="M17.0711 2.92891C15.1823 1.0402 12.6711 0 10 0C8.23504 0 6.54027 0.454844 5.0484 1.30789C5.37624 1.5466 5.63695 1.86585 5.80535 2.23477C6.91872 1.63034 8.14991 1.27451 9.41406 1.1918V3.97375C6.54227 4.25082 4.25082 6.54227 3.97375 9.41406H1.1918C1.29191 7.89379 1.77887 6.47766 2.55445 5.26293C2.19866 5.06872 1.89885 4.78617 1.68391 4.4425C0.588906 6.07355 0 7.99137 0 10C0 12.0797 0.631133 14.0622 1.80195 15.7297C2.02597 15.3958 2.3316 15.1247 2.68984 14.942C1.8357 13.6828 1.29762 12.1926 1.1918 10.5859H3.97375C4.25082 13.4577 6.54227 15.7492 9.41406 16.0263V18.8082C8.17188 18.7264 6.99957 18.3857 5.94945 17.841C5.80887 18.2216 5.57191 18.5556 5.26871 18.8143C6.70621 19.5884 8.32133 20 10 20C12.6711 20 15.1823 18.9598 17.0711 17.0711C18.9598 15.1823 20 12.6711 20 10C20 7.32891 18.9598 4.8177 17.0711 2.92891ZM16.6397 4.18891C17.8807 5.60504 18.6769 7.42012 18.8082 9.41406H16.0263C15.9075 8.18363 15.4188 7.05992 14.6733 6.15535L16.6397 4.18891ZM10.5859 18.8082V16.0263C10.8624 15.9994 11.1366 15.9534 11.4066 15.8885C11.1302 15.5903 10.9306 15.2204 10.8386 14.8101C10.755 14.8247 10.6709 14.8373 10.5859 14.8475V12.2696C10.3986 12.318 10.2023 12.3438 10 12.3438C9.79773 12.3438 9.60141 12.318 9.41406 12.2696V14.8475C7.1891 14.5802 5.41977 12.8109 5.15246 10.5859H7.73043C7.68203 10.3986 7.65625 10.2023 7.65625 10C7.65625 9.79773 7.68203 9.60141 7.73043 9.41406H5.15246C5.41977 7.1891 7.1891 5.41977 9.41406 5.15246V7.73043C9.60546 7.68105 9.80234 7.65613 10 7.65625C10.8583 7.65625 11.6099 8.12031 12.0182 8.81039L13.8403 6.98836C14.3788 7.67359 14.7384 8.50578 14.8475 9.41406H12.2696C12.318 9.60141 12.3438 9.79773 12.3438 10C12.3438 10.2023 12.318 10.3986 12.2696 10.5859H14.8475C14.7763 11.1784 14.5961 11.7526 14.3161 12.2795C14.6712 12.4902 14.9649 12.7904 15.1679 13.15C15.6334 12.3891 15.9363 11.5183 16.0263 10.586H18.8082C18.5183 14.9879 14.9879 18.5183 10.5859 18.8082Z" fill="#21B1F1" />
      <path d="M13.1221 15.4692C13.7693 15.4692 14.2939 14.9446 14.2939 14.2974C14.2939 13.6502 13.7693 13.1255 13.1221 13.1255C12.4749 13.1255 11.9502 13.6502 11.9502 14.2974C11.9502 14.9446 12.4749 15.4692 13.1221 15.4692Z" fill="#21B1F1" />
      <path d="M9.99707 11.1724C10.6443 11.1724 11.1689 10.6477 11.1689 10.0005C11.1689 9.35328 10.6443 8.82861 9.99707 8.82861C9.34986 8.82861 8.8252 9.35328 8.8252 10.0005C8.8252 10.6477 9.34986 11.1724 9.99707 11.1724Z" fill="#21B1F1" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.17188 10.0008C1.17188 6.95867 3.04263 4.3912 5.63591 3.31924H5.63631L6.46834 1.82471C2.79595 2.68385 0 5.99109 0 10.0008C0 13.774 2.49559 16.9945 5.96556 18.041L6.05385 16.8387C3.16907 15.8509 1.17188 13.1228 1.17188 10.0008ZM10.8312 1.96064L10.7429 3.16299C13.6277 4.15073 15.6249 6.87882 15.6249 10.0008C15.6249 13.04 13.7563 15.6096 11.1609 16.6824H11.1605L10.3284 18.1769C14.0009 17.3178 16.7967 14.0106 16.7967 10.0008C16.7967 6.22773 14.3012 3.00709 10.8312 1.96064Z" fill="#21B1F1" />
      <path d="M13.9816 8.6136C13.9298 8.52559 13.856 8.45263 13.7674 8.40193C13.6788 8.35124 13.5785 8.32457 13.4764 8.32457H9.18902L9.75383 0.628889C9.7636 0.495807 9.72765 0.363375 9.65194 0.253498C9.57622 0.143621 9.46526 0.0628796 9.33742 0.0246292C9.20959 -0.0136621 9.0725 -0.00715024 8.94887 0.0430867C8.82524 0.0933236 8.72247 0.184273 8.65758 0.30088L2.80838 10.8043C2.75872 10.8935 2.73322 10.9941 2.73441 11.0962C2.73561 11.1983 2.76344 11.2983 2.81517 11.3863C2.86689 11.4743 2.94071 11.5473 3.02931 11.598C3.11791 11.6487 3.21822 11.6753 3.32029 11.6753H7.60773L7.04288 19.3711C7.03312 19.5041 7.06907 19.6366 7.1448 19.7464C7.22052 19.8563 7.33149 19.937 7.45933 19.9753C7.72484 20.0548 8.0066 19.9371 8.13918 19.699L13.9883 9.19559C14.038 9.1064 14.0635 9.00578 14.0623 8.9037C14.0611 8.80162 14.0333 8.70162 13.9816 8.6136Z" fill="#21B1F1" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.3697 7.47114C19.3096 7.48559 19.2576 7.52323 19.2252 7.57584C19.1927 7.62845 19.1824 7.69176 19.1965 7.75195C19.3671 8.47593 19.4534 9.21719 19.4539 9.96099C19.4509 12.4777 18.4498 14.8906 16.6702 16.6702C14.8905 18.4498 12.4777 19.4509 9.96096 19.4539C7.89388 19.4612 5.88228 18.7855 4.23868 17.5319C4.45936 17.2029 4.54753 16.8026 4.48553 16.4113C4.42353 16.02 4.21593 15.6665 3.90433 15.4218C3.59274 15.1771 3.20017 15.0592 2.80531 15.0917C2.41045 15.1242 2.04246 15.3048 1.7751 15.5972C1.50774 15.8895 1.36075 16.2722 1.3636 16.6684C1.36645 17.0646 1.51892 17.445 1.79046 17.7335C2.06199 18.0221 2.43254 18.1973 2.82783 18.2241C3.22311 18.251 3.61394 18.1274 3.92199 17.8783C5.65254 19.2105 7.777 19.9295 9.96096 19.9219C11.4655 19.9203 12.9502 19.5783 14.3038 18.9214C15.6574 18.2645 16.8448 17.3098 17.777 16.1289C18.7093 14.948 19.3622 13.5714 19.6869 12.1023C20.0116 10.6332 19.9997 9.10969 19.652 7.64586C19.6451 7.6158 19.6322 7.58741 19.6142 7.56233C19.5962 7.53725 19.5734 7.51598 19.5472 7.49974C19.521 7.4835 19.4918 7.47261 19.4613 7.4677C19.4308 7.4628 19.3997 7.46396 19.3697 7.47114ZM0.468026 9.96099C0.468128 8.27241 0.918601 6.61441 1.773 5.15794C2.6274 3.70148 3.8548 2.49925 5.32866 1.67521C6.80252 0.851169 8.46949 0.435145 10.1577 0.47003C11.8459 0.504914 13.4943 0.989444 14.9329 1.87366C14.7844 2.19133 14.7606 2.55318 14.8663 2.88754C14.9719 3.2219 15.1993 3.50438 15.5034 3.67904C15.8074 3.8537 16.166 3.90779 16.5081 3.83061C16.8501 3.75342 17.1507 3.55059 17.3503 3.26228C17.5499 2.97397 17.634 2.62122 17.5858 2.27389C17.5376 1.92655 17.3608 1.60997 17.0903 1.38685C16.8198 1.16372 16.4753 1.05033 16.1252 1.06912C15.775 1.08792 15.4447 1.23753 15.1996 1.48833C13.6907 0.555524 11.96 0.0425908 10.1865 0.00253971C8.41295 -0.0375114 6.6609 0.396773 5.11139 1.26051C3.56187 2.12425 2.27113 3.3861 1.37254 4.91566C0.473946 6.44522 0.000114111 8.187 9.39314e-06 9.96099C-0.000829529 10.5691 0.0545278 11.1759 0.165375 11.7738C0.17489 11.8276 0.203108 11.8764 0.245059 11.9115C0.287011 11.9466 0.340004 11.9658 0.394703 11.9657C0.408873 11.9656 0.422998 11.9641 0.436825 11.961C0.497826 11.95 0.551963 11.9152 0.587354 11.8643C0.622745 11.8134 0.636496 11.7505 0.625591 11.6895C0.520431 11.1194 0.467689 10.5408 0.468026 9.96099Z" fill="#21B1F1" />
      <path d="M8.55762 8.41447V8.55487H11.3657V8.41447C11.3439 6.51744 8.57946 6.51744 8.55762 8.41447Z" fill="#21B1F1" />
      <path d="M16.5016 5.0989C13.8682 5.12542 11.3347 3.49829 10.3659 2.79626C10.247 2.71032 10.1039 2.66406 9.95718 2.66406C9.81042 2.66406 9.6674 2.71032 9.54844 2.79626C8.57965 3.49829 6.03988 5.11918 3.41275 5.0989C3.31945 5.09798 3.22688 5.11551 3.14039 5.15051C3.05389 5.1855 2.97518 5.23726 2.90877 5.3028C2.84236 5.36834 2.78956 5.44637 2.75343 5.53239C2.7173 5.61842 2.69855 5.71074 2.69824 5.80405C2.6998 9.40621 3.42055 14.5591 9.64049 17.7073C9.73857 17.7573 9.84709 17.7833 9.95718 17.7833C10.0673 17.7833 10.1758 17.7573 10.2739 17.7073C16.4938 14.5591 17.2146 9.40621 17.2161 5.80405C17.2147 5.61584 17.1387 5.43588 17.0047 5.30367C16.8708 5.17147 16.6898 5.09782 16.5016 5.0989ZM12.5313 12.2221C12.5313 12.5324 12.408 12.83 12.1886 13.0495C11.9691 13.2689 11.6715 13.3922 11.3612 13.3922H8.55313C8.24281 13.3922 7.94521 13.2689 7.72578 13.0495C7.50636 12.83 7.38309 12.5324 7.38309 12.2221V9.72602C7.3832 9.49846 7.44968 9.27588 7.57437 9.08552C7.69906 8.89516 7.87655 8.74529 8.08511 8.65427V8.41246C8.11319 5.90857 11.8012 5.90857 11.8292 8.41246V8.65427C12.0378 8.74529 12.2153 8.89516 12.34 9.08552C12.4647 9.27588 12.5312 9.49846 12.5313 9.72602V12.2221Z" fill="#21B1F1" />
      <path d="M10.3458 10.7036C10.3423 10.6827 10.3433 10.6613 10.3487 10.6407C10.354 10.6202 10.3637 10.601 10.377 10.5844C10.4292 10.5089 10.4598 10.4205 10.4654 10.3288C10.471 10.237 10.4514 10.1456 10.4088 10.0642C10.3661 9.98281 10.302 9.91466 10.2234 9.86712C10.1448 9.81957 10.0547 9.79443 9.96278 9.79443C9.87091 9.79443 9.78078 9.81957 9.70217 9.86712C9.62355 9.91466 9.55944 9.98281 9.51678 10.0642C9.47412 10.1456 9.45453 10.237 9.46014 10.3288C9.46574 10.4205 9.49633 10.5089 9.54859 10.5844C9.56181 10.6008 9.57143 10.6198 9.5768 10.6402C9.58218 10.6605 9.5832 10.6818 9.57979 10.7025C9.54313 10.8852 9.43938 11.4075 9.36622 11.7701C9.35732 11.8153 9.35856 11.8619 9.36983 11.9066C9.3811 11.9513 9.40214 11.9929 9.43142 12.0285C9.4607 12.0641 9.4975 12.0928 9.53918 12.1125C9.58085 12.1321 9.62637 12.1423 9.67246 12.1423H10.2528C10.299 12.1423 10.3446 12.1321 10.3863 12.1124C10.428 12.0926 10.4649 12.0639 10.4942 12.0282C10.5234 11.9925 10.5444 11.9507 10.5556 11.9059C10.5668 11.8611 10.5679 11.8144 10.5589 11.7692L10.3458 10.7036Z" fill="#21B1F1" />
    </svg>
  );
}

function CubeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_476_1956)">
        <path d="M0.078125 11.3633L0.10556 17.2573C0.105729 17.2945 0.115901 17.3309 0.135006 17.3628C0.154111 17.3947 0.181445 17.4208 0.214137 17.4384L4.922 19.9034C4.95208 19.9196 4.98572 19.9281 5.01989 19.928H5.02035C5.03447 19.9445 5.05101 19.9588 5.06941 19.9704C5.10006 19.9889 5.13504 19.9991 5.17085 19.9999C5.20667 20.0007 5.24207 19.9921 5.27354 19.975L9.92166 17.4543C9.96297 17.4312 9.99514 17.3947 10.0128 17.3508C10.0316 17.388 10.0611 17.4186 10.0974 17.4389L14.8051 19.9039C14.8352 19.9201 14.8689 19.9285 14.9032 19.9285H14.9036C14.9178 19.9449 14.9342 19.9592 14.9525 19.9708C14.9832 19.9891 15.0182 19.9991 15.0539 19.9999C15.0897 20.0008 15.125 19.9923 15.1566 19.9755L19.8047 17.454C19.8375 17.4363 19.865 17.41 19.8841 17.378C19.9032 17.3459 19.9133 17.3093 19.9133 17.272V11.1394C19.9133 11.1375 19.9124 11.1356 19.9124 11.1342L19.9128 11.1294C19.9126 11.124 19.9105 11.118 19.9096 11.1126C19.9082 11.1012 19.9061 11.0899 19.9033 11.0787C19.9007 11.0713 19.8978 11.0641 19.8945 11.0571C19.89 11.0473 19.8859 11.038 19.88 11.0292C19.8697 11.0138 19.8577 10.9997 19.8442 10.9871C19.8381 10.9816 19.8317 10.9765 19.8249 10.9717C19.8203 10.9689 19.817 10.9648 19.8119 10.9617C19.8073 10.9592 19.8024 10.9578 19.7975 10.9559C19.7931 10.9536 19.7905 10.9508 19.7861 10.9492L14.9959 8.62931C14.9769 8.6214 14.9564 8.62047 14.9362 8.61838V2.52621L14.9357 2.5211C14.9355 2.51947 14.936 2.51808 14.936 2.51645C14.9357 2.51064 14.9332 2.50506 14.9325 2.49948C14.9311 2.48812 14.929 2.47686 14.9262 2.46576C14.9237 2.45837 14.9208 2.45114 14.9174 2.44414C14.9127 2.43438 14.909 2.42484 14.9029 2.41624C14.8983 2.40927 14.8934 2.40299 14.8885 2.39671C14.8768 2.38238 14.8632 2.36971 14.8481 2.35905C14.8432 2.35579 14.8399 2.35161 14.8351 2.34858C14.8302 2.34603 14.8253 2.34486 14.8206 2.34254C14.8162 2.34045 14.8134 2.33766 14.8095 2.33626L10.0207 0.0163892C9.99311 0.00466557 9.9633 -0.000888546 9.93334 0.000115454C9.90338 0.00111945 9.874 0.00865732 9.84726 0.0222017L5.11289 2.49018C5.07886 2.50735 5.05023 2.53359 5.03017 2.566C5.01011 2.59841 4.99939 2.63573 4.99919 2.67385L4.99966 2.67757C4.99044 2.70067 4.98547 2.72524 4.98501 2.75011L5.01245 8.61675C4.98743 8.61845 4.96293 8.62468 4.94014 8.63512L0.205767 11.1031C0.171719 11.1203 0.143086 11.1466 0.123025 11.179C0.102963 11.2115 0.0922532 11.2488 0.0920749 11.287C0.0920749 11.2882 0.0927724 11.2891 0.0927724 11.2905C0.0833045 11.3136 0.0783331 11.3383 0.078125 11.3633ZM14.2529 2.54923L10.0798 4.88259L5.66112 2.67734L9.94793 0.434655L14.2529 2.54923ZM14.5237 8.60443L10.289 10.8332V5.23947L14.5237 2.87264V8.60443ZM15.2649 13.8524L19.4997 11.4858V17.1483L15.2649 19.4461V13.8524ZM10.6373 11.29L14.9241 9.04734L19.2288 11.1628L15.0559 13.4955L10.6373 11.29ZM5.38165 13.8524L9.61662 11.486V17.1485L5.38165 19.4461V13.8524ZM0.754231 11.29L5.04104 9.04734L9.34576 11.1628L5.17264 13.4955L0.754231 11.29Z" fill="#21B1F1" />
      </g>
      <defs>
        <clipPath id="clip0_476_1956">
          <rect width="19.9914" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

const STEPS = [
  { num: "01", label: "Deploy and configure the platform", Icon: GlobeIcon },
  { num: "02", label: "Integrate with existing systems", Icon: BoltIcon },
  { num: "03", label: "Provide on-ground support and expertise", Icon: ShieldIcon },
  { num: "04", label: "Ensure long-term operational success", Icon: CubeIcon },
];

// Trust marker: two concentric glowing circles, a translucent shield with a
// bright white edge, and a location-pin (ring + check) standing on a base disc.
// Fully fluid — every layer is sized as a percentage of the wrapper width
// (design reference 300px), so the badge scales with the illustration instead
// of staying a fixed size while the image shrinks.
function ShieldBadge() {
  return (
    <div aria-hidden className="pointer-events-none relative grid aspect-square w-full place-items-center">
      {/* outer circle */}
      <span className="absolute inset-0 rounded-full border border-white/40 bg-[radial-gradient(circle,rgba(255,255,255,0.4)_0%,rgba(202,235,250,0.18)_55%,transparent_72%)]" />
      {/* inner circle — 206/300 of the badge */}
      <span className="absolute aspect-square w-[68.7%] rounded-full border border-white/60 bg-[radial-gradient(circle,rgba(255,255,255,0.92)_0%,rgba(222,243,253,0.5)_60%,transparent_80%)] shadow-[0_0_40px_rgba(33,177,241,0.35),_0_0_20px_rgba(255,255,255,0.6)]" />

      {/* Volumetric Blue Glow layer behind the shield */}
      <span className="absolute aspect-square w-[45%] rounded-full bg-[#21B1F1] opacity-[0.35] blur-[32px]" />

      {/* shield + pin icon — 160/300 of the badge */}
      <svg
        viewBox="0 0 160 180"
        fill="none"
        className="relative h-auto w-[53.3%] drop-shadow-[0_12px_24px_rgba(33,177,241,0.45)]"
      >
        <defs>
          <linearGradient id="shield-fill" x1="80" y1="12" x2="80" y2="170" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFFFFF" stopOpacity="0.78" />
            <stop offset="1" stopColor="#CFEBFB" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        {/* The shield is centered in the viewBox and the location-pin is
            centered over it, so the two read as one "verified shield" badge
            instead of two shapes sitting side by side. */}
        <g transform="translate(0, -17)">
          {/* shield body with a bright white edge — recentred on x=80 */}
          <path
            transform="translate(-20.62, 0)"
            d="M100.62 58.186C100.62 58.186 107.928 65.767 125.051 67.9731C141.442 70.0929 146.393 65.3287 146.393 65.3287C146.393 65.3287 156.288 124.072 100.627 156.351C44.9586 124.072 54.8534 65.3287 54.8534 65.3287C54.8534 65.3287 59.8044 70.0929 76.1952 67.9731C93.3189 65.767 100.627 58.186 100.627 58.186H100.62Z"
            fill="url(#shield-fill)"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* location pin + check — centred over the shield */}
          <path
            transform="translate(42.36, 51)"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.9259 61.3187C31.1043 54.5622 21.5977 44.7338 21.5977 36.4406C21.5977 27.5816 28.7794 20.3999 37.6384 20.3999C46.4974 20.3999 53.6791 27.5816 53.6791 36.4406C53.6791 44.7338 44.1725 54.5622 38.3508 61.3187C38.1658 61.5334 37.9219 61.6453 37.6384 61.6453C37.355 61.6452 37.111 61.5334 36.9259 61.3187ZM30.0153 37.0501L34.7191 41.7539C35.2957 42.3305 36.2305 42.3305 36.8071 41.7539C39.6395 38.9215 42.4465 36.0525 45.2656 33.2053C45.8389 32.6288 45.8364 31.6965 45.2599 31.1231C44.6833 30.5497 43.7511 30.5523 43.1777 31.1288L35.7608 38.6197L32.1033 34.9621C31.5268 34.3855 30.5919 34.3855 30.0154 34.9621C29.4389 35.5386 29.4388 36.4735 30.0153 37.0501ZM37.6384 23.5087C30.4963 23.5087 24.7064 29.2985 24.7064 36.4406C24.7064 43.5827 30.4963 49.3726 37.6384 49.3726C44.7805 49.3726 50.5704 43.5827 50.5704 36.4406C50.5704 29.2985 44.7805 23.5087 37.6384 23.5087ZM37.6384 25.0135C31.3269 25.0135 26.2112 30.1292 26.2112 36.4406C26.2112 42.7521 31.3269 47.8678 37.6384 47.8678C43.9498 47.8678 49.0655 42.7521 49.0655 36.4406C49.0655 30.1292 43.9498 25.0135 37.6384 25.0135ZM43.6302 57.5707C42.983 58.3179 42.3475 59.0409 41.7358 59.736C44.9476 60.1672 47.1672 61.0896 47.1672 62.158C47.1672 63.6393 42.901 64.8402 37.6384 64.8402C32.3758 64.8402 28.1095 63.6393 28.1095 62.158C28.1095 61.0896 30.3291 60.1672 33.541 59.736C32.9292 59.0409 32.2938 58.318 31.6466 57.5707C25.0803 58.2614 20.4004 60.0546 20.4004 62.158C20.4005 64.8593 28.1181 67.0491 37.6384 67.0491C47.1587 67.0491 54.8763 64.8593 54.8763 62.158C54.8763 60.0546 50.1965 58.2614 43.6302 57.5707Z"
            strokeWidth="2"
            fill="#54B7EC"
            strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

// Curved connector chain on the left of the card list. Each card is a fixed
// 68px tall with a 14px gap, so the knobs land at fixed y centres; the cubic
// curves bulge left to link consecutive knobs (the geometry matches the cards
// because they share the same fixed height). lg only.
const CARD_H = 60;
const CARD_GAP = 14;
const KNOB_X = 46; // circle centre — sits 6px left of the card edge so its right
//                    side tucks behind the card
const KNOB_R = 12;
const KNOB_CENTERS = [0, 1, 2, 3].map((i) => CARD_H / 2 + i * (CARD_H + CARD_GAP));
const RAIL_H = KNOB_CENTERS[3] + CARD_H / 2;

function ConnectorRail() {
  return (
    <motion.svg
      variants={railFade}
      aria-hidden
      width="60"
      height={RAIL_H}
      viewBox={`0 0 60 ${RAIL_H}`}
      fill="none"
      className="pointer-events-none absolute left-0 top-0 hidden lg:block"
    >
      <defs>
        {/* connector palette from Figma: 35,178,241 → 28,140,190 → 33,177,241 */}
        <linearGradient id="conn-grad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#23B2F1" />
          <stop offset="0.5" stopColor="#1C8CBE" />
          <stop offset="1" stopColor="#21B1F1" />
        </linearGradient>
      </defs>

      {/* thin curves bulging deep to the left, linking each knob to the next */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${KNOB_X} ${KNOB_CENTERS[i]} C 0 ${KNOB_CENTERS[i]} 0 ${KNOB_CENTERS[i + 1]} ${KNOB_X} ${KNOB_CENTERS[i + 1]}`}
          stroke="url(#conn-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      ))}

      {/* round knobs — drawn behind the cards so the card edge overlaps them */}
      {KNOB_CENTERS.map((y, i) => (
        <circle key={i} cx={KNOB_X} cy={y} r={KNOB_R} fill="#1D6C97" />
      ))}
    </motion.svg>
  );
}

// "Built for real-world implementation" — flows straight out of the Hero's
// white curve. Puzzle illustration on the left, the four integrator
// responsibilities on the right, then a closing line beneath.
export default function RealTimeImplementationSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white px-6 pb-20 lg:px-[60px]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_75%_30%,rgba(176,226,243,0.35),transparent_60%),linear-gradient(180deg,#ffffff_0%,#f2fafd_55%,#eaf7fa_100%)]"
        />

        <motion.div
          className="relative z-10 mx-auto flex w-full max-w-[1410px] flex-col gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >

          {/* Illustration + integrator responsibilities */}
          <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-[40px]">
            <motion.div variants={imageReveal} className="relative w-full lg:flex-1">
              <Image
                src="/integrators-partners/leftSidePick.png"
                alt="Connected puzzle pieces representing integrated deployment"
                width={744}
                height={376}
                sizes="(max-width: 1024px) 92vw, 640px"
                className="h-auto w-full"
              />
              {/* trust shield — sits in the gap between the puzzle and the
                  cards, its bottom edge flush with the bottom of the
                  illustration. Percentage offsets/width keep the composition
                  identical as it scales. */}
              <div className="absolute bottom-0 right-[1%] w-[26%]">
                <ShieldBadge />
              </div>
            </motion.div>

            <div className="flex w-full flex-col gap-5 lg:w-[560px] lg:shrink-0">
              <motion.h3 variants={fadeUp} className="text-[24px] font-bold text-[#0A4B6E]">
                Our integrators
              </motion.h3>

              <motion.ul
                variants={listStagger}
                className="relative flex flex-col lg:pl-[48px]"
                style={{ gap: `${CARD_GAP}px` }}
              >
                {/* curved connector chain (lg only) */}
                <ConnectorRail />

                {STEPS.map(({ num, label, Icon }) => (
                  <motion.li
                    key={num}
                    variants={cardItem}
                    style={{ minHeight: `${CARD_H}px` }}
                    className="relative flex items-center gap-3.5 rounded-[14px] rounded-tl-[44px] rounded-bl-[44px] border-2 border-transparent pl-1 pr-5 [background:linear-gradient(180deg,#ffffff,#f4fbff)_padding-box,linear-gradient(180deg,#ffffff,#eff9ff)_border-box] shadow-[0px_13px_100px_0px_#C7C7C733,7px_6px_20px_0px_#C4CCE466,6px_6px_10px_0px_#FFFFFF66,6px_6px_24px_0px_#FFFFFF_inset,-6px_-6px_84px_0px_#FFFFFF_inset]"
                  >
                    <span className="flex size-12.5 shrink-0 items-center justify-center rounded-full border border-[#dbeefb] bg-white text-[#21B1F1] shadow-[0_6px_16px_rgba(33,177,241,0.18)]">
                      <Icon />
                    </span>
                    <span className="bg-[linear-gradient(135deg,#5CB7E8,#A6C936)] bg-clip-text text-[18px] font-black leading-6 text-transparent">
                      {num}
                    </span>
                    <span aria-hidden className="h-6 w-px shrink-0 bg-[#cfe3ef]" />
                    <span className="text-[16px] font-bold leading-none tracking-[-0.002em] text-[#1D6C97]">
                      {label}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>

          {/* Closing line */}
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-[892px] text-center text-[18px] font-medium leading-[26px] text-[#1d6c97]"
          >
            V-Watch AI partners with experienced system integrators who understand local
            environments, infrastructure, and operational requirements ensuring smooth
            implementation from day one.
          </motion.p>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
