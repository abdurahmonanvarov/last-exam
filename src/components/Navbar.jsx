import { PiPlusCircleDuotone } from "react-icons/pi";

function Navbar() {
  return (
    <div className="mt-[72px] mb-[65px] ">
      <header className="container flex justify-between items-center gap-[276px]">
        <div className="w-[155px] h-[59px]">
          <h1 className="text-[32px] font-bold text-[#0C0E16] mb-[8px]">
            Invoices
          </h1>
          <p className="font-[400] text-[12px] text-[#888EB0]">
            There are 7 total invoices
          </p>
        </div>
        <div className="flex justify-between items-center gap-[40px]">
          <div className="flex items-center gap-[16px]">
            <div class="relative">
              <select class="appearance-none text-[12px] text-[#0C0E16] font-bold bg-gray-100 py-2 pl-4 pr-10 rounded-md w-full">
                <option>Filter by status</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
              <svg
                class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          <div className="bg-[#9277FF] cursor-pointer w-[150px] h-[48px] rounded-[15px] flex gap-[16px] pl-[8px] pt-[8px]">
            <PiPlusCircleDuotone className="w-[32px] h-[32px] text-white rounded" />
            <span className="text-[12px] text-white mt-[7px]">New Invoice</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;

{
  /* <div>
<h1 className="text-2xl font-bold">Invoices</h1>
<p className="text-gray-500">There are 90 total invoices</p>
</div> */
}
{
  /* <button className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
<span className="text-lg">+</span> New Invoice
</button> */
}
