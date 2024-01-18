import React from "react";
import Main from "../layout/Main";
import { Link } from "react-router-dom";
import useProduct from "../hooks/useProduct";
import { MdDelete } from "react-icons/md";

function ListFoodsPages() {
  const { Products, formatPrice, deleteProduct, setIdDelete } = useProduct();
  return (
    <Main>
      <div className="md:px-40 px-2 py-8">
        <div>
          <p className="text-gray-500">
            Tambahkan menu makanan yang ada di resto
          </p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-sm mt-5">
          <div>
            <Link
              to="/addfood"
              className="px-4 py-1 bg-blue-400 rounded-sm text-white"
            >
              + Tambah Menu
            </Link>
          </div>
          <div className="w-full mt-8">
            <table className="w-full">
              <thead>
                <tr className="w-full bg-gray-100 text-left h-12">
                  <th className="px-4 py-2 w-10">#</th>
                  <th className="px-4 py-2 w-40">Nama</th>
                  <th className="px-4 py-2 text-center w-48">Foto</th>
                  <th className="px-4 py-2 w-20 ">Harga</th>
                  <th className="px-4 py-2 w-20  text-center">Hapus</th>
                </tr>
              </thead>
              <tbody>
                {Products?.map((product, index) => (
                  <tr
                    key={index}
                    className={index % 2 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className=" px-4 py-2">{index + 1}</td>
                    <td className=" px-4 py-2">{product.name}</td>
                    <td className=" px-4 py-2 h-14 w-24 ">
                      <img
                        src={product.image}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </td>
                    <td className=" px-4 py-2">
                      Rp. {product.price ? formatPrice(product.price) : "-"}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 text-center">
                      <button
                        onClick={() => {
                          setIdDelete(product.id);
                          deleteProduct();
                        }}
                        className="inline-flex rounded-full bg-red-500 bg-opacity-10 py-1 px-3 text-sm font-medium text-red-500"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default ListFoodsPages;
