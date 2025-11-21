import React from 'react';
import { Link } from 'react-router-dom';

function CarsCard({ car }) {
  const { id, image, name, type, pricePerDay, fuel, gearbox } = car;

  return (
    <div className="border p-4 rounded shadow">
      <div>
        <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
      </div>

      <div className="mt-[20px] flex justify-between">
        <div>
          <h1>{name}</h1>
          <span className="mt-[4px]">{type}</span>
        </div>
        <div>
          $ {pricePerDay} <br /> per day
        </div>
      </div>

      <div className="mt-[42px] flex">
        <div className="flex gap-[8px]">
          <img src="/src/images/card-image/air.svg" alt="air" />
          {gearbox}
        </div>

        <div className="flex ml-[20px] gap-[10px]">
          <img src="/src/images/card-image/g17.svg" alt="g17" />
          {fuel}
        </div>

        <div className="flex ml-[20px] gap-[10px]">
          <img src="/src/images/card-image/g1593.svg" alt="g1593" />
          Air Conditioner
        </div>
      </div>

      <Link
        to={`/cars/${id}`}
        className="block mt-[40px] w-[368px] text-center pt-[15.5px] pb-[15.5px] bg-[#5937E0] rounded-[12px] text-white"
      >
        View Details
      </Link>
    </div>
  );
}

export default CarsCard;
