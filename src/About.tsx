import React, { useState } from "react";
import {
  Youtube,
  AlignJustify as Spotify,
  Apple,
  Instagram,
  Twitter,
  Headphones,
  Heart,
  Star,
  Award,
  Users,
  Mic,
  Radio,
  Music,
  Podcast,
  Coffee,
  BookOpen,
  Twitch,
  Zap,
  Facebook,
} from "lucide-react";
import { FaTiktok, FaPatreon } from "react-icons/fa";
import host from "../src/images/host.jpeg";
import intro from "../src/images/about-intro-hq.mp4";
import spark from "../src/images/spark.jpeg";
import flight from "../src/images/flight.jpeg";
import future from "../src/images/future.jpeg";

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const CustomIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_9)">
      <path
        d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2349 1.26428 15.1826 0 12 0ZM16.25 17.61C16.1762 17.6907 16.0867 17.7554 15.9869 17.8001C15.8872 17.8448 15.7793 17.8686 15.67 17.87C15.4793 17.8724 15.2943 17.8048 15.15 17.68C14.0929 16.8303 12.8172 16.2965 11.47 16.14C10.1403 15.9225 8.77639 16.0783 7.53001 16.59C7.34812 16.6719 7.14132 16.679 6.95423 16.6098C6.76715 16.5406 6.61478 16.4006 6.53001 16.22C6.45072 16.0378 6.44496 15.832 6.51391 15.6456C6.58287 15.4592 6.72121 15.3067 6.90001 15.22C8.41966 14.5754 10.0908 14.3743 11.72 14.64C13.3663 14.8357 14.9233 15.4945 16.21 16.54C16.3498 16.6808 16.4315 16.869 16.4389 17.0672C16.4463 17.2654 16.3789 17.4592 16.25 17.61ZM18.2 14.32C18.1063 14.4267 17.9909 14.5122 17.8616 14.5708C17.7323 14.6294 17.592 14.6598 17.45 14.66C17.2069 14.6597 16.9723 14.5708 16.79 14.41C15.4273 13.3082 13.7804 12.6148 12.04 12.41C10.3118 12.122 8.53742 12.3265 6.92001 13C6.80079 13.0587 6.67107 13.0931 6.53841 13.1011C6.40576 13.1091 6.27284 13.0906 6.14741 13.0467C6.02199 13.0028 5.90659 12.9343 5.80795 12.8452C5.7093 12.7561 5.6294 12.6483 5.57291 12.528C5.51642 12.4077 5.48447 12.2774 5.47894 12.1446C5.4734 12.0118 5.49439 11.8793 5.54067 11.7547C5.58695 11.6301 5.6576 11.516 5.74849 11.4191C5.83938 11.3221 5.94868 11.2442 6.07001 11.19C8.03662 10.3399 10.207 10.0759 12.32 10.43C14.4448 10.6755 16.4544 11.5258 18.11 12.88C18.2129 12.9671 18.297 13.074 18.3575 13.1945C18.418 13.3149 18.4535 13.4463 18.4619 13.5808C18.4703 13.7153 18.4514 13.8501 18.4064 13.9772C18.3614 14.1042 18.2912 14.2208 18.2 14.32ZM20.2 10.79C20.0837 10.9154 19.943 11.0155 19.7865 11.0843C19.63 11.1531 19.461 11.1891 19.29 11.19C18.9866 11.1881 18.6945 11.0742 18.47 10.87C16.788 9.48921 14.7424 8.62446 12.58 8.38C10.441 8.01301 8.24137 8.2771 6.25001 9.14C5.963 9.25126 5.64471 9.25086 5.35799 9.13889C5.07126 9.02691 4.83694 8.8115 4.7013 8.53518C4.56565 8.25887 4.53854 7.94174 4.62532 7.64641C4.71209 7.35108 4.90645 7.09902 5.17001 6.94C7.63301 5.8717 10.3541 5.54502 13 6C15.6465 6.3147 18.1444 7.3917 20.19 9.1C20.4128 9.32192 20.5421 9.62073 20.5514 9.93505C20.5607 10.2494 20.4493 10.5553 20.24 10.79H20.2Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_9">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function About() {
  // 1) track whether intro video is playing
  const [showIntro, setShowIntro] = useState(true);

  // 2) hide video when it ends
  const handleVideoEnd = () => {
    setShowIntro(false);
  };

  // 3) while intro is up, render only the video overlay
  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        {/* Video Background */}
        <video
          src={intro}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />

        {/* Skip Button */}
        <motion.button
          onClick={() => setShowIntro(false)}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute top-6 right-6 bg-blue text-white px-4 py-2 rounded-full font-semibold hover:bg-gold-600 transition-colors"
        >
          Mbyll Intro
        </motion.button>
      </div>
    );
  }

  // 4) once video is done, render your normal About page:
  const stats = [
    { icon: Headphones, value: "20K+", label: "Dëgjues Mujor" },
    { icon: Star, value: "4.8", label: "Vlerësimet Mesatare" },
    { icon: Mic, value: "50+", label: "Episode" },
    { icon: Users, value: "30+", label: "Të Ftuar" },
  ];
  const platforms = [
    {
      icon: Youtube,
      name: "YouTube",
      color: "hover:text-red-500",
      href: "https://www.youtube.com/@TruPodcastMediaOfficial-p9c",
    },
    {
      icon: CustomIcon,
      name: "Spotify",
      color: "hover:text-green-500",
      href: "https://open.spotify.com/show/yourshow",
    },
    {
      icon: Twitch,
      name: "Twitch",
      color: "hover:text-purple-500",
      href: "https://twitch.tv/yourchannel",
    },
    {
      icon: FaPatreon,
      name: "Patreon",
      color: "hover:text-orange-500",
      href: "https://podcasts.apple.com/yourpodcast",
    },
  ];

  const socials = [
    { icon: Instagram, url: "https://www.instagram.com/shpendi_gashi/" },
    { icon: Facebook, url: "https://youtube.com/@yourchannel" },
    { icon: Twitter, url: "https://twitter.com/yourhandle" },
  ];

  return (
    <>
      <Helmet>
        <title>Rreth Nesh – Tru Podcast Media</title>
        <meta
          name="description"
          content="Zbulo historinë dhe vizionin prapa Tru Podcast, moderatorët tanë dhe misionin tonë."
        />
        <link rel="canonical" href="https://trupodcast.media/about" />
        <meta property="og:title" content="Rreth Nesh – Tru Podcast Media" />
        <meta
          property="og:description"
          content="Zbulo historinë dhe vizionin prapa Tru Podcast, moderatorët tanë dhe misionin tonë."
        />
        <meta property="og:url" content="https://trupodcast.media/about" />
        <meta
          property="og:image"
          content="https://trupodcast.media/og-about.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Rreth Nesh – Tru Podcast Media" />
        <meta
          name="twitter:description"
          content="Zbulo historinë dhe vizionin prapa Tru Podcast, moderatorët tanë dhe misionin tonë."
        />
        <meta
          name="twitter:image"
          content="https://trupodcast.media/og-about.png"
        />
      </Helmet>

      <div className="min-h-screen bg-blue-900/40 text-white pt-24">
        {/* Host Section */}
        <section className="py-20 bg-gradient-to-b from-gold-900 to-blue-950/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10"
                  >
                    <img
                      src={host}
                      alt="Host"
                      className="rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl"></div>
                  </motion.div>
                  <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-gold-600/20 to-gold-800/20 rounded-2xl -z-10"></div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Njihuni me Moderatorin
                  </h1>
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Shpendi Gashi <br />
                    <span className="text-lg text-gray-400">
                      Politolog | Studiues | Moderator i Tru Podcast
                    </span>
                  </h2>
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Me një formim të thelluar akademik në shkencat politike
                      dhe një pasion të palëkundur për të vërtetën, Shpendi
                      Gashi sjell në çdo episod të Tru Podcast një qasje të
                      thellë, analitike dhe të ndershme ndaj realitetit që na
                      rrethon. Si politolog dhe studiues, ai është i përkushtuar
                      ndaj ideve që sfidojnë mendimin e zakonshëm, duke shtruar
                      pyetje të guximshme dhe duke eksploruar temat më të
                      ndërlikuara me një kuriozitet të sinqertë dhe një qasje
                      kritike.
                    </p>
                    <p>
                      Për Shpendin, Tru Podcast nuk është vetëm një platformë
                      për të folur — është një ftesë për të menduar. Për të
                      ndalur, reflektuar dhe për të hyrë në thellësi të përvojës
                      njerëzore dhe realiteteve politike, sociale e kulturore që
                      na formësojnë.
                    </p>
                    <p>
                      Nën moderimin e tij, bisedat zhvillohen në një atmosferë
                      të hapur dhe të menduar mirë — aty ku fjalët kanë peshë,
                      dhe heshtja nuk është boshësi, por hapësirë për reflektim.
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex space-x-4 mt-6"
                  >
                    {socials.map(({ icon: Icon, url }, idx) => (
                      <motion.a
                        key={idx}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                      >
                        <Icon size={20} />
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-16 bg-blue-950/5"
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-block p-4 bg-gray-800/50 rounded-full mb-4">
                    <stat.icon size={24} className="text-gold-800" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Our Story Section */}
        <section className="py-20 bg-blue-950/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Historia Jonë
              </h2>
              <p className="text-xl text-gray-300">
                From a simple idea to a growing platform for meaningful
                conversations
              </p>
            </motion.div>

            <div className="max-w-6xl mx-auto">
              <div className="space-y-16">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row items-center gap-8"
                >
                  <div className="md:w-1/2">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl">
                      <Coffee size={48} className="text-white-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-4">
                        Shkëndija E Fillimit
                      </h3>
                      <p className="text-gray-300">
                        Tru Podcast nuk lindi nga komoditeti, por nga përplasja.
                        Ishte pikërisht mospajtimi me formatin e mbyllur të
                        universitetit, refuzimi për t’u pajtuar me kufizimet
                        akademike dhe zhgënjimi nga mediat tradicionale që
                        preferojnë zhurmën ndaj së vërtetës — që ndezën
                        shkëndijën fillestare.
                      </p>
                      <p className="text-gray-300">
                        <br />
                        Nga ai moment tensioni, lindi një ide:
                      </p>
                      <p className="text-gray-300">
                        <br />

                        <strong>
                          "Po sikur të ndërtojmë një hapësirë të lirë, ku fjala
                          është e pakompromis dhe mendimi nuk filtrohet?"
                        </strong>
                      </p>
                      <p className="text-gray-300">
                        <br />
                        Tru Podcast është produkti i asaj shkëputjeje — një
                        platformë që refuzon uniformitetin dhe u jep zë atyre që
                        shpesh injorohen. Këtu nuk ka linjë editoriale të
                        imponuar, nuk ka fjalë të ndaluara, nuk ka tema të
                        paprekshme.
                      </p>
                      <p className="text-gray-300">
                        <br />
                        Është një përgjigje ndaj sistemit që kërkonte heshtje.
                        Dhe çdo episod është një dëshmi që zëri ynë nuk u ndal.
                      </p>
                      <p className="text-gray-300">
                        <br />
                        <strong>| </strong>
                        <strong>
                          "Sa shumë kam humbur nga frika se mos humbisja."
                        </strong>
                        <br />
                        —Shpendi Gashi
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <img
                      // src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                      src={spark}
                      alt="Early days"
                      className="rounded-xl shadow-lg object-cover h-[700px] w-full"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row-reverse items-center gap-8"
                >
                  <div className="md:w-1/2">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl">
                      <Podcast size={48} className="text-white-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-4">
                        Fluturimi i Parë
                      </h3>
                      <p className="text-gray-300">
                        Çdo ide e madhe ka nevojë për krahë. Tru Podcast nisi si
                        një zë i vetëm — i qartë, por ende i brishtë. Dhe
                        pikërisht atëherë, kur nevoja për të folur ndryshe u bë
                        urgjencë, u bashkuan njerëz që besuan. Miq,
                        bashkëpunëtorë, dashamirës. E ndërtuam çdo pjesë me
                        dorë, me zemër dhe me bindjen se kjo platformë nuk ishte
                        vetëm ëndrra ime — ishte e domosdoshme për të gjithë ata
                        që kërkonin një zë sfidues, të ndershëm dhe ndryshe.
                      </p>
                      <p className="text-gray-300 mt-4">
                        Fluturimi nisi më 28 Nëntor — në Ditën e Flamurit — jo
                        rastësisht. Ishte një akt simbolik, një premtim që zëri
                        ynë nuk do të përkulet. I ftuari i parë ishte një
                        luftëtar i gjallë, Dritan Goxhaj — një hero që mishëron
                        guximin dhe qëndrimin. Një hyrje e denjë për një
                        platformë që nuk pranon të heshtë.
                      </p>
                      <p className="text-gray-300 mt-4">
                        <strong>| Ky nuk është thjesht një podcast.</strong>
                        <br />
                        Është një qëndresë. Është një fluturim drejt së
                        vërtetës.
                      </p>
                      <p className="text-gray-300 mt-4">
                        Dhe ky është vetëm fillimi. Tru Podcast tani fluturon me
                        mbështetjen e një komuniteti të tërë — në{" "}
                        <span
                          className="underline hover:text-red-600 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://www.youtube.com/@TruPodcastMediaOfficial-p9c",
                              "_blank"
                            )
                          }
                        >
                          YouTube
                        </span>
                        ,{" "}
                        <span
                          className="underline hover:text-green-500 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://open.spotify.com/show/YourShowId",
                              "_blank"
                            )
                          }
                        >
                          Spotify
                        </span>
                        ,{" "}
                        <span
                          className="underline hover:text-orange-500 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://www.patreon.com/YourPage",
                              "_blank"
                            )
                          }
                        >
                          Patreon
                        </span>
                        ,{" "}
                        <span
                          className="underline hover:text-purple-600 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://www.twitch.tv/YourChannel",
                              "_blank"
                            )
                          }
                        >
                          Twitch
                        </span>{" "}
                        dhe{" "}
                        <span
                          className="underline hover:text-blue-400 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://twitter.com/YourHandle",
                              "_blank"
                            )
                          }
                        >
                          X
                        </span>
                        — duke ndërtuar një hapësirë ku fjalët kanë peshë, dhe
                        mendimi nuk censurohet.
                      </p>
                      <p className="text-gray-300 mt-4">
                        Bashkohuni me fluturimin tonë. Ndihmoni që ky zë të
                        flasë më lart, bëhuni pjesë e komunitetit tonë përmes
                        anëtarësimeve, komenteve, apo duke u bashkëpunuar me ne.
                        Se vetëm së bashku mund të arrijmë më shumë.
                      </p>
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    <img
                      // src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                      src={flight}
                      alt="Growth phase"
                      className="rounded-xl shadow-lg object-cover h-[700px] w-full"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row items-center gap-8"
                >
                  <div className="md:w-1/2">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl">
                      <BookOpen size={48} className="text-white-400 mb-4" />
                      <h3 className="text-2xl font-bold mb-4">
                        Sytë nga E Ardhmja
                      </h3>
                      <p className="text-gray-300">
                        Në Tru Podcast, ne po ndërtojmë më shumë sesa një
                        emision — po krijojmë një komunitet të mendjesh të
                        hapura, që nuk kënaqet me sipërfaqësoren dhe që kërkon
                        thellësi, kuptim dhe dialog të ndershëm. Ndërsa
                        zgjerojmë horizontin tonë, synimi ynë është të sjellim
                        përmbajtje më të thelluar, më interaktive dhe më të
                        vërtetë se kurrë më parë.
                      </p>
                      <p className="text-gray-300 mt-4">
                        Sot, ti mund të bëhesh pjesë aktive e këtij rrugëtimi:
                      </p>
                      <p className="text-gray-300 mt-2">
                        Bëhu anëtar në kanalin tonë{" "}
                        <span
                          className="underline hover:text-red-600 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://www.youtube.com/@TruPodcastMediaOfficial-p9c",
                              "_blank"
                            )
                          }
                        >
                          YouTube
                        </span>{" "}
                        dhe fito akses në përmbajtje ekskluzive, pjesë pas
                        kuintave dhe rubrika vetëm për anëtarët.
                      </p>
                      <p className="text-gray-300 mt-2">
                        Na ndiq edhe në{" "}
                        <span
                          className="underline hover:text-green-500 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://open.spotify.com/show/YourShowId",
                              "_blank"
                            )
                          }
                        >
                          Spotify
                        </span>
                        ,{" "}
                        <span
                          className="underline hover:text-orange-500 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://www.patreon.com/YourPage",
                              "_blank"
                            )
                          }
                        >
                          Patreon
                        </span>
                        ,{" "}
                        <span
                          className="underline hover:text-purple-600 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://www.twitch.tv/YourChannel",
                              "_blank"
                            )
                          }
                        >
                          Twitch
                        </span>{" "}
                        dhe{" "}
                        <span
                          className="underline hover:text-blue-400 cursor-pointer transition-colors"
                          onClick={() =>
                            window.open(
                              "https://twitter.com/YourHandle",
                              "_blank"
                            )
                          }
                        >
                          X
                        </span>
                        — për përmbajtje të zgjeruar dhe për të qenë pjesë e
                        komunitetit tonë global.
                      </p>
                      <p className="text-gray-300 mt-4">
                        Mbështetjen tënde e kthejmë në përmbajtje me vlerë.
                        Fjalët e tua, donacionet dhe pjesëmarrja jote janë
                        shtysa jonë për të bërë më shumë — për ty.
                      </p>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <img
                      // src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                      src={future}
                      alt="Current studio"
                      className="rounded-xl shadow-lg object-cover h-[700px] w-full"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Available On Section */}
        <section className="py-20 bg-blue-950/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">Dëgjo në</h2>
              <p className="text-gray-300">
                Dëgjo Podcastin Tonë në Platformën tënde të Preferuar
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
            >
              {platforms.map((platform, index) => (
                <motion.a
                  key={index}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
            flex flex-col items-center p-6
            bg-gray-900/50 rounded-xl backdrop-blur-sm
            transition-colors ${platform.color}
          `}
                >
                  <platform.icon size={32} />
                  <span className="mt-2 font-medium">{platform.name}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-blue-950/5 to-gold-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6">Vlerat Tona</h2>
              <p className="text-xl text-gray-300">
                Parimet që na udhëheqin që nga dita e parë
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                {
                  icon: Mic,
                  title: "Zëra të Papërgatitur, Por Autentikë",
                  description:
                    "Ne rrëfejmë jetët tona pa maska, pa skenar dhe pa filtra. Çdo bisedë është një pasqyrë e papunuar e realitetit, ku emocionet dhe të vërtetat dalin në shesh të lirë.",
                },
                {
                  icon: Heart,
                  title: "Rritemi Së Bashku, Jo Vetëm",
                  description:
                    "Kjo nuk është një udhëtim i vetëm. Në çdo bisedë, ne dhe të ftuarit tanë hapim së bashku dyer të reja, ku gabimet janë mësime dhe çdo moment i papritur bëhet këngë.",
                },
                {
                  icon: Award,
                  title: "Cilësia Nuk Është Aksident",
                  description:
                    "Nuk ofrojmë vetëm përmbajtje - ofrojmë përvoja. Çdo episod është një përzierje e pazakontë e spontanitetit dhe përgatitjes, ku autenticiteti takon profesionalizmin.",
                },
                {
                  icon: Zap,
                  title: "Pse? Sepse Ne Besojmë...",
                  description:
                    "Që botës i duhen më shumë zëra të patinjuar, më pak perfeksionizëm të sajuar dhe më shumë kurajë për të qenë të përkryer... të papërsosur.",
                },
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-xl backdrop-blur-sm"
                >
                  <div className="bg-gradient-to-br from-gold-600/20 to-gold-800/20 p-4 rounded-full inline-block mb-6">
                    <value.icon size={32} className="text-gold-800" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
