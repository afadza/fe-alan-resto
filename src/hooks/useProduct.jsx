import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../libs/api";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function useProduct() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
  });

  const [file, setFile] = useState(null);

  function handleChange(event) {
    const { name, value, files } = event.target;

    if (files) {
      setFile(files[0]);
    } else {
      setForm({
        ...form,
        [name]: value,
      });
    }
  }

  const fileInputRef = useRef(null);

  function handleButtonClick() {
    fileInputRef.current?.click();
  }

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price.replace(/[^\d]/g, ""));

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      if (file instanceof File) {
        formData.append("image", file);
      }

      return await API.post("/product", formData);
    },
    onSuccess: () => {
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setForm({
        name: "",
        image: "",
        price: "",
      });
      setFile(null);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { data: Products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await API.get("/products");
      return response.data;
    },
  });

  function formatPrice(total) {
    const formattedTotalSatpam = total.toLocaleString("id-ID");
    return formattedTotalSatpam;
  }

  const [idDelete, setIdDelete] = useState(null);
  const { mutate: deleteProduct } = useMutation({
    mutationFn: async () => {
      return await API.delete(`/product?id=${idDelete}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setIdDelete(null);
    },
    onError: (error) => {
      alert(
        "Gagal menghapus product, karena product ini ada di dalam keranjang!"
      );
      console.log(error);
    },
  });

  return {
    form,
    file,
    handleChange,
    handleButtonClick,
    fileInputRef,
    addProduct,
    isPending,
    Products,
    formatPrice,
    deleteProduct,
    setIdDelete,
  };
}

export default useProduct;
