import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Everyting <br />
          is better <br />
          with&nbsp;
          <span className="text-emerald-400">coffee</span>
        </h1>
        <p className="my-4 text-gray-500">
          Weed is a missing ingridient in your life which will make you feel
          better.
        </p>
        <div className="flex gap-4">
          <button className="flex justify-center bg-emerald-600 items-center gap-2 text-white px-4 py-2 rounded-full">
            Order now
            <Right />
          </button>
          <button className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold">
            Learn more
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/coffee.webp"}
          layout={"fill"}
          objectFit={"contain"}
          alt={""}
        />
      </div>
    </section>
  );
}
