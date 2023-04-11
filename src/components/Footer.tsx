import Link from "next/link";
import Container from "./Container";

export default function Footer() {
  return (
    <div className=" relative">
      <Container
        maxWidth="7xl"
        className="m-auto  justify-between p-6 md:flex md:py-12"
      >
        <div className=" border-bunker-800 p-2 ">
          <h1 className="text-3xl font-bold">
            <Link href="/">AIRBORNE</Link>
          </h1>
        </div>

        <div className=" border-t border-bunker-800 p-2 md:border-0 md:border-l">
          <h3 className=" text-lg  font-semibold">Products</h3>
          <ul className=" font-light text-slate-300 ">
            <li>
              <Link href="/product/sailor">Sailor V2</Link>
            </li>
            <li>
              <Link href="/product/surfshield">Surfshield</Link>
            </li>
            <li>
              <Link href="/product/glide">Glide</Link>
            </li>
          </ul>
        </div>

        <div className=" border-t border-bunker-800 p-2 md:border-0 md:border-l">
          <h3 className=" text-lg  font-semibold">Company</h3>
          <ul className=" font-light text-slate-300 ">
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy</Link>
            </li>
          </ul>
        </div>

        <div className=" border-t border-bunker-800 p-2 md:border-0 md:border-l">
          <h3 className=" text-lg  font-semibold">Creator</h3>
          <ul className=" font-light text-slate-300 hover:text-slate-50">
            <li>
              <a href="https://www.linkedin.com/in/jonathan-van-der-meij-539452252/">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/Jonathanmeij">Github</a>
            </li>
            <li>
              <a href="https://jonathanmeij.live">Portfolio</a>
            </li>
          </ul>
        </div>
      </Container>
      <div className="bg-bunker-900">
        <Container maxWidth="7xl" className="m-auto  py-3 text-center">
          <span className=" text-xs font-light text-slate-300">
            © Copyright Jonathan van der Meij 2023 - All Rights Reserved
          </span>
        </Container>
      </div>
    </div>
  );
}
