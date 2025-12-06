"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductImagesProps {
  images: string[]
}

export default function ProductImages({ images }: ProductImagesProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="flex flex-col gap-4">
      <div className="relative bg-muted rounded-lg overflow-hidden aspect-square flex items-center justify-center">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt="Product image"
          width={600}
          height={600}
          className="w-full h-full object-cover"
          priority
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index
                ? "border-primary"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Product thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
