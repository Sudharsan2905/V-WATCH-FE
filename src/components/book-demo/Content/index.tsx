import ExpectSection from "../ExpectSection";
import DemoForm from "../DemoForm";

export default function BookDemoContent() {
  return (
    <section className="relative z-20 mt-0 pb-4 lg:-mt-[240px]">
      {/* White section background.
          Mobile: covers the full section from the top.
          Desktop: starts 180px (= 340 - 160) below the section top so the
          hero's dark bg remains visible behind the floating form card. */}
      <div
        className="absolute inset-x-0 bottom-0 top-0 rounded-t-[32px] lg:top-[150px]"
        style={{ background: "linear-gradient(180deg, #EBF5FF 100%, #F2F8FE 100%, #FFFFFF 100%)" }}
      />

      <div className="relative mx-auto max-w-[1160px] px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_1.5fr] lg:items-start lg:gap-[30px]">
          {/* Left: What to expect — pushed down to align with the white section start */}
          <div className="order-2 lg:order-1 lg:pt-[180px] lg:max-w-[412px]">
            <ExpectSection />
          </div>

          {/* Right: Demo form — starts near the section top so it floats ~148px
              into the hero area above the white section */}
          {/* <div className="order-1 lg:order-2 lg:max-w-[718px] lg:pt-8 s:mt-10"> */}
          <div className="order-1 mt-5 lg:mt-0 lg:order-2 lg:max-w-[718px] lg:pt-8">
            <DemoForm />
          </div>
        </div>
      </div>
    </section>
  );
}
