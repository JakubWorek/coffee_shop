import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16" id={'about'}>
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'}/>
        <div className="text-gray-500 max-w-md mx-auto mt-4">
          <p>
          Welcome to our coffe shop, where passion meets quality. 
          We're dedicated to curating a diverse selection of premium 
          coffee products that cater to every taste and preference. 
          Our knowledgeable staff is here to guide you through our extensive inventory, 
          ensuring you find the perfect strain or product to elevate your experience. 
          Whether you're a seasoned connoisseur or new to the world of coffee, 
          we strive to provide a welcoming environment where education and exploration thrive. 
          Come discover the difference at our weed shop - where excellence is always in bloom.
          </p>
        </div>
      </section>
      <section className="text-center my-16" id={'contact'}>
        <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
        <div className="mt-8">
          <a href="tel:+48123456789" className="text-4xl text-gray-400"> 
            +48 123 456 789
          </a>
        </div>
      </section>
    </>
  );
}
