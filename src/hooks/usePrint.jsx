import jsPDF from "jspdf";
import useOrder from "./useOrder";

function usePrint() {
  const { Orders, total } = useOrder();

  function printOrdersToPDF() {
    const pdf = new jsPDF();

    pdf.setFontSize(16);
    pdf.text("Alan Resto", 10, 10);

    pdf.line(10, 15, 200, 15);

    pdf.setFontSize(14);
    pdf.text("Detail Pesanan", 10, 25);

    let yPos = 35;
    Orders.forEach((order) => {
      const lineText = ` ${order.product.name} x${order.quantity}`;

      pdf.text(lineText, 10, yPos);

      const totalText = `Rp. ${order.total}`;
      const xPosition =
        200 -
        pdf.getStringUnitWidth(totalText) * pdf.internal.getFontSize() -
        10;
      pdf.text(totalText, xPosition, yPos);

      yPos += 8;
    });

    pdf.line(10, yPos, 200, yPos);

    yPos += 10;
    const totalLabel = "Total Price:";
    pdf.text(totalLabel, 10, yPos);

    const totalValueText = `Rp. ${total}`;
    const xTotalPosition =
      200 -
      pdf.getStringUnitWidth(totalValueText) * pdf.internal.getFontSize() -
      10;
    pdf.text(totalValueText, xTotalPosition, yPos);

    pdf.save("OrderDetails.pdf");
  }

  return {
    printOrdersToPDF,
  };
}

export default usePrint;
