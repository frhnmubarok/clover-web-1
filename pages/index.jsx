import Illustration from "@/components/atoms/Illustration";
import Link from "@/components/atoms/Link";
import Main from "@/components/atoms/Main";
import CardProduct from "@/components/molecules/ProductCard";
import Slider from "@/components/organisms/Slide";
import AppLayout from "@/components/templates/AppLayout";
import callAPI from "@/config/api";
import Image from "next/image";
import { useState } from "react";
import {
  HiArrowRight,
  HiOutlineExternalLink,
  HiOutlinePlay,
} from "react-icons/hi";

const JoinAndWatchButton = () => {
  return (
    <div className="order-4 w-full py-5 text-center grid grid-cols-1 gap-3 sm:flex sm:gap-0 sm:space-x-6">
      <Link
        href="/register"
        className="inline-flex justify-center items-center space-x-2 text-sm font-semibold bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-500 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200 ease-in-out"
      >
        <HiOutlineExternalLink className="w-5 h-5" />
        <span>Mulai Menjadi Mitra</span>
      </Link>
      <button
        type="button"
        className="inline-flex justify-center items-center space-x-2 text-sm font-semibold border boder-gray-400 bg-white text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 hover:ring-2 hover:ring-blue-500 hover:ring-offset-2 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 duration-200 ease-in-out"
      >
        <HiOutlinePlay className="w-5 h-5" />
        <span>Cara Kerja</span>
      </button>
    </div>
  );
};
export default function Home({ data }) {
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(1);
  const [products, setProducts] = useState(data.data);

  const loadMore = async () => {
    setLoading(true);
    try {
      const { data } = await callAPI({
        url: `https://api-clover.herokuapp.com/api/products?page=${more}`,
        method: "GET",
      });

      setProducts([...products, ...data.data]);
      setMore(more + 1);
      setLoading(false);
    } catch (error) {
      console.info(error.message);
      setLoading(false);
    }
  };
  return (
    <Main className="relative min-h-screen">
      <div className="container">
        <div className="min-h-screen flex flex-col-reverse md:flex-row justify-center items-center">
          <div className="md:flex-1">
            <div className="flex flex-col items-start select-none">
              <div>
                <div className="order-1 py-2 text-4xl md:text-6xl font-semibold md:leading-none text-gray-700">
                  <h1>
                    <span className="text-primary-500">Embrace</span>
                  </h1>
                  <h2>
                    New Ways <span className="text-primary-500">to Farm</span>
                  </h2>
                </div>
                <p className="order-2 leading-relaxed text-base font-semibold mr-6 text-gray-700">
                  Dapatkan sayuran, buah - buahan, alat - alat, dan bahan -
                  bahan pertanian terbaik langsung dari tangan petani.
                  <br />
                  Mulai menjalani hidup sehat dengan memilih produk sayuran dan
                  buah - buahan dari kami.
                </p>
              </div>
              <JoinAndWatchButton />
            </div>
          </div>
          <div className="md:flex-1 pt-20 sm:pt-0 flex justify-center items-center">
            <Illustration className="w-[330px] md:w-[500px] h-auto py-3" />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="pb-12">
          <Slider />
        </div>
      </div>
      <div className="container">
        <div className="pb-12">
          <h2 className="text-3xl font-semibold">Spesial Hari Ini Di Clover</h2>
        </div>
        <div className="max-w-7xl overflow-x-hidden">
          <div className="flex flex-nowrap space-x-5 w-screen">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative w-[500px] h-[166px] rounded-2xl overflow-hidden"
              >
                <Image
                  src="https://images.unsplash.com/photo-1543364195-bfe6e4932397?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80"
                  alt="Special"
                  layout="fill"
                  className="object-cover object-center"
                />
                <div className="bg-gradient-to-r from-gray-700 to-transparent w-full h-full absolute"></div>
                <h2 className="text-2xl text-white absolute top-5 left-5 w-3/5">
                  Sayuran Segar Dari Kebun Petani
                </h2>
                <button
                  type="button"
                  className="absolute bottom-5 right-5 inline-flex bg-white px-2 py-1 rounded-lg text-xs font-semibold"
                >
                  Detail
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="min-h-screen">
          <div className="container py-14">
            <div className="pb-12 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-semibold">
                  Produk Rekomendasi Untuk Kamu
                </h2>
                <p>Produk - produk rekomendasi spesial untuk kamu</p>
              </div>
              <Link
                href="/products"
                className="inline-flex justify-center items-center space-x-2 bg-primary-500 text-white py-2 px-4 rounded-lg"
              >
                <span>Lihat Semua Produk</span>
                <HiArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 md:gap-8">
              {products.map((product, i) => (
                <CardProduct
                  key={i}
                  id={product.id}
                  title={product.product_name}
                  price={product.product_price}
                  owner={product.user.username}
                  rating={5}
                  soldout={1000}
                  // image={`https://api-clover.herokuapp.com/${product.photos[0].path_to_product_image}`}
                  image={`https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHZlZ2V0YWJsZXN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60`}
                />
              ))}
            </div>
            <div className="flex justify-center items-center pt-12">
              <button
                type="button"
                onClick={loadMore}
                disabled={loading}
                className="inline-flex justify-center items-center bg-primary-500 text-white rounded-2xl max-w-md w-full py-3"
              >
                {loading ? "Loading" : "Muat Lebih Banyak"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

Home.layoutProps = {
  Layout: AppLayout,
  meta: {
    title: "Home Clover",
  },
};

export const getServerSideProps = async () => {
  const { data } = await callAPI({
    url: "https://api-clover.herokuapp.com/api/products",
    method: "GET",
  });

  return {
    props: {
      data,
    },
  };
};
