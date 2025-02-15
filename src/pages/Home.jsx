import { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/treap");
        setData(response.data);
      } catch (error) {
        console.error("API dan malumot olishda xatolik:", error);
      }
    };

    fetchData();
  }, []);

  //Filter

  useEffect(() => {
    const filtered = data.filter((item) =>
      selectedFilter === "all" ? true : item.status === selectedFilter
    );
    setFilteredData(filtered);
  }, [selectedFilter, data]);

  return (
    <div>
      <Navbar onFilterChange={setSelectedFilter} />

      <div className="flex flex-col gap-[16px] overflow-y-auto h-[432px]">
        {filteredData.length > 0 &&
          filteredData.map((datam) => {
            return (
              <Link
                to={`/singleproducts/${datam.id}`}
                key={datam.id}
                className={`${
                  theme == "dark" ? "bg-white" : "bg-[#1E2139]"
                } w-full pl-[32px] pr-[32px] pt-[29px] pb-[28px] rounded-[8px] flex items-center justify-between cursor-pointer hover:shadow-2xl transition duration-300`}
              >
                <h3
                  className={`${
                    theme == "dark" ? "text-[#0C0E16]" : "text-white"
                  } text-[12px] font-bold w-[100px] truncate"`}
                >
                  #{datam.id.slice(0, 5)}
                </h3>

                <p className="text-[#888EB0] text-[12px] w-[150px] truncate">
                  {datam.paymentDue}
                </p>

                <h3 className="text-[12px] text-[#858BB2] w-[200px] truncate">
                  {datam.clientName}
                </h3>

                <span
                  className={`${
                    theme == "dark" ? "text-[#0C0E16]" : "text-white"
                  } text-[12px] font-bold w-[100px] truncate"`}
                >
                  {datam.items.length > 0 ? datam.items[0].price : "N/A"}$
                </span>

                <span
                  className={`flex gap-[8px] items-center w-[120px] rounded-[6px] h-[40px] pl-[18px] pr-[18px] ${
                    datam?.status === "paid"
                      ? "bg-lime-100 text-[#33D69F]" // Paid bo'lsa yashil
                      : " bg-orange-100 text-[#FF8F00]"
                  }`}
                >
                  <span
                    className={`w-2 h-2 ${
                      datam?.status === "paid" ? "bg-[#33D69F]" : "bg-[#FF8F00]"
                    } rounded-full`}
                  ></span>
                  {datam?.status || "Padding"} {/* Status */}
                </span>

                <SlArrowRight className="text-[#7C5DFA] cursor-pointer" />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
