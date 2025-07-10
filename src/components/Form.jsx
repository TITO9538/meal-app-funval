import React, { useState } from "react";

export default function Formulario() {
  const [formVisible, setFormVisible] = useState(false);

  const toggleFormulario = () => {
    setFormVisible(!formVisible);
  };

  return (
    <div className=" ">
     <div className="flex items-center">
        <p className="text-xl md:text-2xl text-[#f4eadc]  transition-colors duration-500 ease-in-out font-semibold">
            Envianos tus recetas! 
        </p>
        <svg
            onClick={toggleFormulario}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={`size-8 m-2 text-[#f4eadc] dark:text-yellow-100 cursor-pointer transition-transform duration-300 hover:scale-150 ${
            formVisible ? "rotate-180" : ""
            }`}
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
            />
        </svg>
    </div>

      {formVisible && (
        <div className="bg-yellow-100 mt-4 rounded-2xl p-6 sm:p-8 md:p-10  dark:bg-[#944D1C]  transition-colors duration-500 ease-in-out max-w-lg mx-auto">
          <h2 className="text-center text-black mb-4 font-bold text-lg sm:text-xl lg:text-2xl dark:text-white">
            Envianos tus recetas!
          </h2>
          <form
            className="rounded-2xl p-3 bg-[#944D1C] dark:bg-[#6a4a2d] transition-colors duration-500 ease-in-out space-y-4"
            action="https://formspree.io/f/xovwddvz"
            method="post"
          >
            <div>
              <label className="block text-yellow-100  mb-1">Name:</label>
              <input
                className="border border-yellow-100 text-yellow-100  rounded-2xl w-full p-2 "
                type="text"
                name="name"
                required
                placeholder="Name and Last Name"
              />
            </div>

            <div>
              <label className="block text-yellow-100  mb-1">Ingredientes/Medidas :</label>
              <textarea
                className="border border-yellow-100 text-yellow-100  rounded-2xl w-full p-2 "
                name="ingredientes"
                required
                placeholder="Ingredientes/Medidas"
              />
            </div>

            <div>
              <label className="block text-yellow-100  mb-1">Preparacion:</label>
              <textarea
                className="border border-yellow-100 text-yellow-100  rounded-2xl w-full p-2 "
                name="mensaje"
                rows="5"
                required
                placeholder="Let us a message"
              ></textarea>
            </div>

            <div className="text-center">
              <button
                className="border border-yellow-100 text-yellow-100  cursor-pointer transition-transform duration-300 hover:scale-110 rounded-2xl p-2 active:bg-black active:text-white dark:text-white  dark:active:bg-gray-900"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
