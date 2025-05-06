import { MaskContainer } from "@/components/ui/MaskContainer";
import { Spotlight } from "@/components/ui/Spotlight";

export default function Home() {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      <button>asd</button>
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="#a8a8a8"
      />
      <MaskContainer
        revealText={
          <div className="flex flex-col">
            <p className="mx-auto max-w-4xl text-center font-bold text-slate-500 dark:text-white text-sm md:text-2xl lg:text-4xl">
              최적화된 코드로, 인터랙티브한 경험을 만들고,
              <br />
              사용자 중심의 웹을 고민합니다.
            </p>
            <div className="flex gap-8 justify-center text-white text-base mt-3">
              <span>projects</span>
              <span>about me</span>
              <span>post</span>
            </div>
          </div>
        }
        className="h-full w-full text-white dark:text-black hidden md:block"
      >
        <div className="font-nanum text-2xl md:text-4xl lg:text-[44px]">
          <span className="text-blue-500">퍼포먼스 최적화</span>와{" "}
          <span className="text-blue-500">인터랙션</span>을 사랑하는
          <br />
          <span className="text-blue-500">프론트엔드 개발자</span> 이용훈입니다.
          <div className="flex gap-8 justify-center text-white mt-3 text-lg md:text-xl lg:text-2xl">
            <a href="" className="hover:animate-shake-rotate">
              projects
            </a>
            <a href="" className="hover:animate-shake-rotate">
              about me
            </a>
            <a href="" className="hover:animate-shake-rotate">
              post
            </a>
          </div>
        </div>
      </MaskContainer>
      <div className="absolute top-1/2 left-1/2 w-full -translate-1/2 text-center text-white dark:text-black">
        <div className="font-nanum text-2xl md:text-4xl lg:text-[44px] md:hidden lg:hidden">
          <span className="text-blue-500">퍼포먼스 최적화</span>와{" "}
          <span className="text-blue-500">인터랙션</span>을 사랑하는
          <br />
          <span className="text-blue-500">프론트엔드 개발자</span> 이용훈입니다.
          <div className="flex gap-8 justify-center text-white mt-3 text-lg md:text-xl lg:text-2xl">
            <a href="" className="active:animate-shake-rotate">
              projects
            </a>
            <a href="" className="active:animate-shake-rotate">
              about me
            </a>
            <a href="" className="active:animate-shake-rotate">
              post
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
