"use client";
import Head from "next/head";
import Image from "next/image";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const SingleHotel = ({ hotel }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const cookie = Cookies.get("user");
    if (cookie) {
      setAuth(true);
      return;
    }
    setAuth(false);
  }, []);

  return (
    <>
      <Head>
        <title>{hotel?.name}</title>
      </Head>
      <div className="w-7/12 mx-auto my-10 ">
        <Image
          src={hotel?.banner}
          alt="hotel"
          width={2000}
          height={2000}
          className=" w-full h-large-box my-5"
        />
        <div className=" ">
          <h3 className=" text-3xl font-bold">{hotel?.name}</h3>
          <p className=" text-xl my-5 text-justify">{hotel?.description}</p>
          <button className=" w-60 h-14 rounded-lg bg-blue-400 text-lg">
            Price : &#8377; {hotel?.price}
          </button>
          <p className=" text-3xl font-bold my-5">Facilities : </p>
          <ul className=" flex text-xl justify-between">
            {hotel
              ? hotel.facilities?.map((ele) => {
                  return (
                    <li
                      key={ele.name}
                      className=" mr-10 mb-3 flex items-center"
                    >
                      <span>
                        <Image
                          src={ele.img}
                          width={200}
                          height={200}
                          className="w-8 h-8 rounded-full"
                        />
                      </span>
                      <span className="ml-5">{ele.name}</span>
                    </li>
                  );
                })
              : ""}
          </ul>
          {auth ? (
            <Link href={`/payment/${hotel?._id}`}>
              <button className=" w-60 h-14 rounded-lg bg-red-400 my-5 text-lg">
                Book Now
              </button>
            </Link>
          ) : (
            <span className=" text-2xl">
              Please{" "}
              <Link href={"/login"} className=" text-blue-500">
                Log in
              </Link>{" "}
              to get new Offers !
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const res = await fetch(`${process.env.BASE_URL}/api/hotels/${ctx.query.id}`);
  const data = await res.json();

  return {
    props: {
      hotel: data.hotel,
    },
  };
}

export default SingleHotel;
