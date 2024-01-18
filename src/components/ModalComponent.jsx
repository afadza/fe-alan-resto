import React from "react";
import Main from "../layout/Main";
import { FaRegUser } from "react-icons/fa";
import useProduct from "../hooks/useProduct";
import useOrder from "../hooks/useOrder";
import usePrint from "../hooks/usePrint";
function ModalComponent({ modal, setModal }) {
  const { Products } = useProduct();
  const {
    Orders,
    Order,
    setProductId,
    Delete,
    formatPrice,
    total,
    totalKembalian,
    setKembalian,
    kembalian,
    formatRupiah,
    deleteWithPayment,
    kurang,
  } = useOrder();
  const { printOrdersToPDF } = usePrint();

  return (
    <Main>
      <div className="w-full px-2 md:px-32 py-8 flex flex-col md:flex-row gap-8 md:gap-0">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 w-full md:w-3/4 h-full">
          {Products?.map((product, index) => (
            <button
              onClick={() => {
                setProductId(product.id);
                Order();
              }}
              key={index}
              className="w-full md:w-48 bg-white rounded-sm flex flex-col shadow-md shadow-gray-300"
            >
              <img
                src={product.image}
                alt=""
                className="w-full h-40 object-cover bg-gray-50"
              />
              <div className="text-center py-2 items-center flex flex-col justify-center w-full">
                <p className="font-semibold">{product.name}</p>
                <p className="text-blue-500 font-semibold">
                  Rp. {formatPrice(product.price)}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="bg-white w-full md:w-1/2 ml-o md:ml-16 rounded-sm shadow-md shadow-gray-300 p-4">
          <div className="flex flex-row items-center justify-center gap-2">
            <FaRegUser />
            <p className="font-bold">Pesanan</p>
          </div>
          <div className="w-full mt-8">
            {Orders?.length !== 0 ? (
              <div>
                {Orders?.map((order, index) => (
                  <div key={index} className="w-full h-16 flex justify-between">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={order.product.image}
                        alt=""
                        className="w-24 h-full object-cover bg-gray-50 rounded-sm"
                      />
                      <p>{order.product.name}</p>
                    </div>
                    <div className="flex gap-4 items-center justify-center font-semibold">
                      <p>x {order.quantity}</p>
                      <p className="text-blue-500">
                        Rp. {formatPrice(order.total)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-400">
                Silahkan tambahkan pesanan!
              </div>
            )}
          </div>

          <div className="w-full mt-8">
            <div className="w-full">
              <button
                onClick={Delete}
                className="w-full py-1 border rounded-sm  border-red-500 text-red-500 font-bold"
              >
                Clear Chart
              </button>
            </div>
            <div className="w-full flex justify-between gap-2 py-2">
              <button
                onClick={() => setSaveModal(!saveModal)}
                className="w-full bg-emerald-500 text-white rounded-sm p-1 text-center"
              >
                Save Bill
              </button>
              <button
                onClick={printOrdersToPDF}
                className="w-full bg-emerald-500 text-white rounded-sm p-1 text-center"
              >
                Print Bill
              </button>
            </div>
            <div className="w-full">
              <button
                onClick={() => setModal(!modal)}
                className="bg-blue-400 text-white rounded-sm p-2 w-full"
              >
                Charge Rp. {total ? formatPrice(total) : 0}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full fixed top-0 left-0 bg-black bg-opacity-50 items-center justify-center flex">
        <div className="bg-white w-full md:w-[70%] ml-0 md:ml-16 rounded-sm p-8 pb-10">
          <div>
            <p className="font-bold text-xl">Detail Pesanan</p>
          </div>
          <div className="w-full mt-4 flex flex-col md:flex-row">
            <div className="border-r-2 border-gray-300 pr-4 w-full mb-8 md:mb-0">
              {Orders?.length !== 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="w-full bg-gray-100 text-left h-12">
                      <th className="px-4 py-2 w-10">#</th>
                      <th className="px-4 py-2 w-40">Nama</th>
                      <th className="px-4 py-2 w-48">Foto</th>
                      <th className="px-4 py-2 w-20 ">Harga</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Orders?.map((order, index) => (
                      <tr
                        key={index}
                        className={
                          index % 2 === 0
                            ? "bg-white text-sm"
                            : "bg-gray-50 text-sm"
                        }
                      >
                        <td className="px-4 py-2">{index + 1}</td>
                        <td className="px-4 py-2">
                          {order.product.name} x {order.quantity}
                        </td>
                        <td className="px-4 py-2 h-14 w-24">
                          <img
                            src={order.product.image}
                            alt=""
                            className="w-20 h-full object-cover"
                          />
                        </td>
                        <td className="px-4 py-2">
                          Rp.{" "}
                          {order.product.price
                            ? formatPrice(order.product.price)
                            : 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-gray-400 mt-10">
                  Silahkan tambahkan pesanan!
                </div>
              )}
            </div>

            <div className="ml-4">
              <div className="text-center">Uang Pembeli (Rp)</div>
              <div className="mt-2 flex ">
                <p className="p-1 border-b-2 border-l-2 border-t-2">Rp. </p>
                <input
                  value={formatRupiah(kembalian)}
                  onChange={(e) => setKembalian(e.target.value)}
                  type="text"
                  className="border-b-2 w-full border-t-2 border-r-2 rounded-sm p-1 active:border-none focus:outline-none"
                />
              </div>
              {kurang && (
                <p className="text-red-500 text-sm mt-4">uang anda kurang!</p>
              )}
              <div className="w-full flex justify-between gap-2 mt-2">
                <button
                  onClick={() => setModal(!modal)}
                  className="border w-full rounded-sm"
                >
                  Close
                </button>
                <button
                  onClick={deleteWithPayment}
                  className="bg-blue-500 text-white w-full rounded-sm"
                >
                  Pay!
                </button>
              </div>
              <div className="mt-2">
                <p className="text-red-500 text-sm">
                  Kembalian : Rp. {kembalian ? formatPrice(totalKembalian) : 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default ModalComponent;
