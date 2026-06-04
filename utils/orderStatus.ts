export const orderStatusMap = {
  toPay: {
    label: "ที่ต้องชำระ",
    color:
      "bg-orange-100 text-orange-600",
  },

  toShip: {
    label: "ที่ต้องจัดส่ง",
    color:
      "bg-blue-100 text-blue-600",
  },

  completed: {
    label: "สำเร็จ",
    color:
      "bg-green-100 text-green-600",
  },

  cancelled: {
    label: "ยกเลิกสินค้า",
    color:
      "bg-red-100 text-red-600",
  },
}as const;