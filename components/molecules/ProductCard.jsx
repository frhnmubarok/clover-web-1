import Image from "next/image";
import Link from "next/link";
import { HiStar } from "react-icons/hi";
import { MdFavorite, MdAddShoppingCart } from "react-icons/md";

export default function CardProduct({
  id,
  title,
  price,
  owner,
  rating,
  soldout,
  image,
}) {
  return (
    <div className="relative">
      <div className="relative shadow overflow-hidden rounded-3xl w-full h-[250px] md:h-[300px]">
        <div>
          <Image
            src={image}
            alt={title}
            width={300}
            height={600}
            className="object-cover object-center"
          />
        </div>
        <div className="absolute bottom-4 px-4 space-x-3 w-full flex justify-between items-center">
          <Link href={`/products/${id}`}>
            <a className="block w-full bg-primary-500 px-3 py-2 text-white text-center rounded-xl text-sm">
              Lihat Produk
            </a>
          </Link>
          <button
            type="button"
            className="bg-primary-500 p-2 text-white rounded-xl text-sm"
          >
            <MdAddShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="pt-2">
        <h3>{title}</h3>
        <h4 className="font-semibold text-2xl">Rp. {price}</h4>
        <small>{owner}</small>
        <div className="flex space-x-2">
          <div className="text-xs flex items-center space-x-1">
            <HiStar className="w-4 h-4 text-yellow-300" />
            <span>{rating}</span>
          </div>
          <span className="border-r border-gray-500" />
          <div className="text-xs">Terjual {soldout}</div>
        </div>
      </div>
      <button
        type="button"
        className="absolute top-4 right-4 p-2 bg-primary-500 rounded-xl text-white"
      >
        <MdFavorite className="w-5 h-5" />
      </button>
    </div>
  );
}
