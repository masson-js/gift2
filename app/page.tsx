import { GiftForm } from "./Components/GiftForm";
import { Snowflakes } from "./Components/SnowFlakes";
import { WinterBackground } from "./Components/WinterBackground";


export default function Home() {
  return (
     <div className="min-h-screen relative overflow-hidden">
    <WinterBackground/>
   <Snowflakes/>
     <div className="relative z-10 min-h-screen flex items-center justify-center p-4 py-16">
      <GiftForm/>
      </div>
    </div>
  );
}
