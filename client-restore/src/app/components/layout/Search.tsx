import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { setProductParams } from "../../store/slices/catalogSlice";

type Props = {};

export default function Search({}: Props) {
  const { params } = useAppSelector((state) => state.catalogReducer);
  const [searchTerm, setSearchTerm] = useState(params.searchTerm || "");
  const dispatch = useAppDispatch();

  // // สร้าง debounce function ที่ไม่เปลี่ยนแปลง
  // const debouncedSearch = useRef(debounce((searchTerm: string) => {
  //   dispatch(setProductParams({ searchTerm }));
  // }, 1000)).current;

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของ input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    dispatch(setProductParams({ searchTerm: value })); // เรียก dispatch ทันทีที่มีการพิมพ์
  };

    // ใช้ useEffect เพื่อจัดการเมื่อ params เปลี่ยนแปลง
    useEffect(() => {
      setSearchTerm(params.searchTerm || "");
    }, [params.searchTerm]);

  return (
    <TextField
      label="Search Products"
      variant="outlined"
      fullWidth
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
}
