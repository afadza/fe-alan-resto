import React from "react";
import Main from "../layout/Main";
import { FaRegUser } from "react-icons/fa";
import useProduct from "../hooks/useProduct";
import useOrder from "../hooks/useOrder";
import usePrint from "../hooks/usePrint";
import { useState } from "react";
import ModalComponent from "../components/ModalComponent";
import SaveModalComponent from "../components/SaveModalComponent";

function FoodsPages() {
  const { Products } = useProduct();
  const { Orders, Order, setProductId, Delete, formatPrice, total } =
    useOrder();
  const [modal, setModal] = useState(false);
  const [saveModal, setSaveModal] = useState(false);
  const { printOrdersToPDF } = usePrint();

  return (
    <div className="w-full">
      {modal === false && saveModal === false ? (
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
                  className="md:w-48 w-full bg-white rounded-sm flex flex-col shadow-md shadow-gray-300"
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
                      <div
                        key={index}
                        className="w-full h-16 flex justify-between mb-2"
                      >
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
        </Main>
      ) : modal === false && saveModal === true ? (
        <SaveModalComponent setSaveModal={setSaveModal} saveModal={saveModal} />
      ) : (
        <ModalComponent modal={modal} setModal={setModal} />
      )}
    </div>
  );
}

export default FoodsPages;
