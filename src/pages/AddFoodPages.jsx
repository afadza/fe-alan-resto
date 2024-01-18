import React from "react";
import Main from "../layout/Main";
import { MdOutlineCloudUpload } from "react-icons/md";
import useProduct from "../hooks/useProduct";
import useOrder from "../hooks/useOrder";
import Loader from "../common/Loader";

function AddFoodPages() {
  const {
    handleChange,
    file,
    handleButtonClick,
    fileInputRef,
    addProduct,
    isPending,
    form,
  } = useProduct();
  const { formatRupiah } = useOrder();

  if (isPending) {
    return <Loader />;
  }

  return (
    <Main>
      <div className="md:px-40 px-2 py-2">
        <div className="bg-white p-6 shadow-lg rounded-sm mt-5">
          <div className=" mb-4">
            <p className="font-semibold text-blue-500">Tambahkan Menu</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addProduct();
            }}
            encType="multipart/form-data"
            className="w-full flex flex-col gap-10"
          >
            <label htmlFor="">
              <p>Tambah Menu</p>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={form.name}
                className="border rounded-sm w-full mt-1 p-2"
              />
            </label>
            <label htmlFor="">
              <p>Tambah Menu</p>
              {file && (
                <img src={URL.createObjectURL(file)} alt="" className="w-32" />
              )}
              <input
                name="image"
                ref={fileInputRef}
                onChange={handleChange}
                type="file"
                className="border rounded-sm w-full mt-1"
                hidden
              />
              {file ? (
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="border-gray-200 border text-gray-400 rounded-sm px-4 py-1 mt-1 bg-gray-100"
                >
                  Ganti Gambar
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="border-gray-200 border text-gray-400 rounded-sm h-44 w-full mt-1 bg-gray-100 flex flex-col items-center justify-center"
                >
                  <MdOutlineCloudUpload size={30} className="" />
                  <p>drag and drop a file here or click</p>
                </button>
              )}
            </label>
            <label htmlFor="">
              <p>Tambah Menu</p>
              <div className="flex mt-1">
                <p className="bg-blue-500 text-white px-4 py-2 rounded-sm">
                  Rp.
                </p>
                <input
                  type="text"
                  name="price"
                  onChange={handleChange}
                  value={formatRupiah(form.price)}
                  className="border rounded-sm w-full p-2"
                />
              </div>
            </label>
            <div className="items-end flex justify-end">
              <button
                type="submit"
                className="bg-emerald-400 px-16 rounded-sm text-white py-2"
              >
                {isPending ? "Loading..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
}

export default AddFoodPages;
