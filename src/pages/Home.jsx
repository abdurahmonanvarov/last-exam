import { SlArrowRight } from "react-icons/sl";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <div className="flex flex-col gap-[16px] overflow-y-auto h-[360px]">
        <div className="bg-[#FFFFFF] w-full pl-[32px] pr-[32px] pt-[29px] pb-[28px] rounded-[8px] flex items-center cursor-pointer hover:shadow-2xl transition duration-300">
          <h3 className="text-[#0C0E16] text-[12px] font-bold mr-[43px]">
            #RT3080
          </h3>
          <p className="text-[#888EB0] text-[12px] mr-[45px]">
            Due 19 Aug 2021
          </p>
          <h3 className="text-[12px] text-[#858BB2] mr-[73px]">Jensen Huang</h3>
          <span className="text-[#0C0E16] text-[16px] mr-[40px] font-bold">
            £ 1,800.90
          </span>
          <button class="bg-[#DFE3FA] w-[104px] h-[40px]  text-[#33D69F] font-medium py-2 px-4 rounded-[6px] cursor-pointer mr-[50px]">
            <div class="pl-[12px]">
              <div className="flex items-center">
                <div class="bg-[#33D69F] rounded-full w-2 h-2 mr-2"></div>
                <span class=" text-center text-[12px] font-bold">Paid</span>
              </div>
            </div>
          </button>
          <SlArrowRight className="text-[#7C5DFA] cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Home;
