import { useEffect } from "react";
import Header from "../components/header/Header";
import SelectCategory from "../components/home-components/SelectCategory";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/cars-data-slice";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.carsdata);
  const axios = useAxios();

  const getCars = async () => {
    let data = await axios({ url: "cars" });
    dispatch(setData(data.data));
  };
  useEffect(() => {
    getCars();
  }, []);
  console.log(data);

  return (
    <>
      <Header />
      <SelectCategory />

      <section className="all-cars">
        <div className="mycon grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
  {data &&
    data.data.map((car) => (
      <div key={car.id}>
        <img src={car.image} alt={car.name} className="w-[368px] h-[240px]" />
        <div className="flex justify-between mt-[20px] mr-[65px]"><h1>{car.name}</h1> <h2>{car.pricePerDay}</h2></div>
        <div>{car.type}</div>
        <div>{car.fuel}</div>
        <div className="flex">
          <div className="w-[20px] h-[20px]">
            <img src="../images/card-image/air.svg" alt="" />
          </div>
          {car.gearbox}
        </div>
        <div>{car.drive}</div>
      </div>
    ))}
</div>

      </section>
    </>
  );
};

export default Home;