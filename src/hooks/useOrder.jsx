import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../libs/api";
import { useState } from "react";

function useOrder() {
  const queryClient = useQueryClient();

  const { data: Orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await API.get("/orders/merged");
      return response.data;
    },
  });

  const [productId, setProductId] = useState(0);
  const { mutate: Order } = useMutation({
    mutationFn: async () => {
      const response = await API.post("/order", {
        productId: productId,
        quantity: 1,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setProductId(0);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const { mutate: Delete } = useMutation({
    mutationFn: async () => {
      const response = await API.delete("/orders");
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function formatPrice(total) {
    const formattedTotalSatpam = total.toLocaleString("id-ID");
    return formattedTotalSatpam;
  }

  const TotalHarga = Orders?.map((order) => order.total);
  const total = TotalHarga?.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const [kembalian, setKembalian] = useState("");

  const totalKembalian = parseInt(kembalian.replace(/[^\d]/g, "")) - total;

  const [kurang, setKurang] = useState(false);
  function deleteWithPayment() {
    console.log(totalKembalian);
    if (!totalKembalian || totalKembalian < 0) {
      setKurang(true);
    } else {
      window.location.reload();
      Delete();
    }
  }

  function formatRupiah(angka, prefix) {
    const numberString = angka.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
    let separator;

    if (ribuan) {
      separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;

    return prefix === undefined ? rupiah : rupiah ? "Rp. " + rupiah : "";
  }

  return {
    Orders,
    productId,
    setProductId,
    Order,
    Delete,
    formatPrice,
    total,
    totalKembalian,
    setKembalian,
    kembalian,
    formatRupiah,
    deleteWithPayment,
    kurang,
  };
}

export default useOrder;
