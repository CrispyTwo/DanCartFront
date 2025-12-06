import React from "react";
import Image from "next/image"

type TableRecordImageProps = {
    image: string;
    name: string;
};

const TableRecordImage: React.FC<TableRecordImageProps> = ({ image, name }) => {
  return (
    <Image
      src={image}
      alt={name}
      width={40}
      height={40}
      className="rounded-md object-cover"
    />
  );
};

export default TableRecordImage;
