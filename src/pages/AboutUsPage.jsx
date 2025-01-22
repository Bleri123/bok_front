import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

function AboutUs() {
  return (
    <div className="bg-secondary min-h-[100vh]">
      <Header />
      <div id="content" className="flex justify-center mt-12  bg-secondary">
        <div id="info" className="px-5 lg:px-0">
          <h1 className="flex justify-center text-4xl lg:text-6xl font-bold ">
            About us
          </h1>
          <p className="flex text-pretty text-2xl lg:text-4xl pt-6 pb-5 text-left lg:ml-5 justify-center ">
            We are a team of developers and designers, placed in Kosovo.
          </p>
          <p className="flex text-pretty text-2xl lg:text-4xl pt-6 text-center lg:text-center lg:ml-5 ">
            This is just a small project of a fake banking system website, that
            we have made.
          </p>
        </div>
      </div>
      <div id="team">
        <div id="Our-team" className="pt-12">
          <h1 className="flex justify-center text-4xl lg:text-6xl font-bold pb-5">
            Our team
          </h1>
          <p className="flex justify-center text-sm sm:text-2xl md:text-3xl pt-6">
            <span className="mr-3">Elton Rexha:</span>
            <a
              href="https://github.com/T0niel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              https://github.com/T0niel
            </a>
          </p>
          <p className="flex justify-center text-sm sm:text-2xl md:text-3xl pt-6">
            <span className="mr-3">Astrit Shala</span>
            <a
              href="https://github.com/Astrit02"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              https://github.com/Astrit02
            </a>
          </p>
          <p className="flex justify-center text-sm sm:text-2xl md:text-3xl pt-6">
            <span className="mr-3">Bleon Nasufi:</span>
            <a
              href="https://github.com/Bleri123"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              https://github.com/Bleri123
            </a>
          </p>

          <p className="flex justify-center text-sm sm:text-2xl md:text-3xl pt-6">
            <span className="mr-3">Edi Pajaziti:</span>
            <a
              href="https://github.com/EdiPajaziti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              https://github.com/EdiPajaziti
            </a>
          </p>
          <p className="flex justify-center text-sm sm:text-2xl md:text-3xl pt-6">
            <span className="mr-3">Qemajl Kera:</span>
            <a
              href="https://github.com/qema00"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              https://github.com/qema00
            </a>
          </p>
          <p className="flex justify-center text-sm sm:text-2xl md:text-3xl pt-6">
            <span className="mr-3">Dijar Çerkezi</span>
            <a
              href="https://github.com/DijarCerkezi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              https://github.com/DijarCerkezi
            </a>
          </p>
          <p className="flex justify-center text-sm sm:text-2xl md:text-3xl pt-6">
            <span className="mr-3">Talat Mustafa</span>
            <a
              href="https://github.com/Talatmustafa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue"
            >
              https://github.com/Talatmustafa
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
