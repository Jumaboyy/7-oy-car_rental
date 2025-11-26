import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";

import { Button, notification } from "antd";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

export default function Edit() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, { description }) => {
    api[type]({ description });
  };

  const { id } = useParams();
  const [car, setCar] = useState(null);
  const axios = useAxios();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [drive, setDrive] = useState(null);
  const [gearbox, setGearbox] = useState(null);

  const getSingleCar = async (id) => {
    let data = await axios({ url: `cars/${id}` });
    if (data && data.data) {
      setCar(data.data);
      setGallery(data.data.gallery);
      setDrive(data.data.drive);
      setGearbox(data.data.gearbox);
    }
  };

  async function editCar(car) {
    await axios({
      url: `cars/${id}`,
      method: "PATCH",
      body: car,
    });

    openNotificationWithIcon("success", {
      description: "Cars' data changed successfully",
    });

    setTimeout(() => navigate(-1), 1500);
  }

  function addImage() {
    const img = prompt("Rasm linkini kiriting");
    try {
      new URL(img);
      setGallery((prev) => [...prev, img]);
    } catch (error) {
      alert("Rasm topilmadi");
    }
  }

  function handleGallery(url) {
    setGallery(gallery.filter((el) => el !== url));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const result = { gearbox, drive, gallery };

    formData.forEach((value, key) => {
      result[key] = value;
    });

    editCar(result);
  }

  useEffect(() => {
    getSingleCar(id);
  }, []);

  return (
    car && (
      <div className="py-12 bg-gray-100 min-h-screen">
        {contextHolder}

        <div className="container mx-auto px-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 bg-white shadow px-5 py-2 rounded-lg border hover:bg-gray-200 transition"
          >
            ← Back
          </button>

          <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl mx-auto border">
            <h1 className="text-2xl font-semibold mb-6 text-gray-800">
              ✨ Mashina maʼlumotlarini tahrirlash
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div>
                  <label className="font-medium mb-1 block">Mashina nomi</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={car.name}
                    className="w-full border rounded-xl px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="font-medium mb-1 block">
                    Kunlik narx ($)
                  </label>
                  <input
                    type="number"
                    name="pricePerDay"
                    defaultValue={car.pricePerDay}
                    className="w-full border rounded-xl px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="font-medium mb-1 block">Yonilg'i turi</label>
                  <input
                    type="text"
                    name="fuel"
                    defaultValue={car.fuel}
                    className="w-full border rounded-xl px-4 py-2 shadow-sm focus:ring focus:ring-blue-300"
                  />
                </div>

                <div>
                  <label className="font-medium mb-1 block">Drive Type</label>
                  <select
                    value={drive}
                    onChange={(e) => setDrive(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2 shadow-sm"
                  >
                    <option value="AWD">AWD</option>
                    <option value="RWD">RWD</option>
                    <option value="FWD">FWD</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium mb-1 block">Gearbox</label>
                  <select
                    value={gearbox}
                    onChange={(e) => setGearbox(e.target.value)}
                    className="w-full border rounded-xl px-4 py-2 shadow-sm"
                  >
                    <option value="Manual">Manual</option>
                    <option value="Automatic">Automatic</option>
                  </select>
                </div>
              </div>
              <div>
                <p className="font-medium mb-3 text-gray-700">Rasmlar galereyasi</p>

                <div className="grid grid-cols-3 gap-4">
                  {gallery.map((el, index) => (
                    <div
                      key={index}
                      className="relative rounded-xl overflow-hidden shadow group"
                    >
                      <img src={el} className="h-24 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleGallery(el)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
                      >
                        <TrashIcon className="text-white w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addImage}
                    className="flex flex-col items-center justify-center h-24 border border-dashed rounded-xl text-gray-400 hover:text-blue-500 hover:border-blue-500 transition"
                  >
                    <PlusCircledIcon className="w-7 h-7" />
                    <span className="text-xs mt-1">Qo‘shish</span>
                  </button>
                </div>
              </div>
              <div className="pt-4">
                <Button
                  htmlType="submit"
                  type="primary"
                  className="w-full py-2 rounded-xl text-lg"
                >
                  💾 Saqlash
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    )
  );
}
