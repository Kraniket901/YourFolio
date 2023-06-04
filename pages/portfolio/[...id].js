import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

import dynamic from "next/dynamic";
import About from "./src/components/About";
import Blog from "./src/components/Blog";
import Services from "./src/components/Services";
import Contact from "./src/components/Contact";
import Layout from "../portfolio/src/layout/Layout";
import TypingAnimation from "./src/components/TypingAnimation";

const Portfolio = dynamic(() => import("./src/components/Portfolio"), {
  ssr: false,
});

export default function PortFolioPage() {

  const [portfolioData, setPortfolioData] = useState(null);
  const [portfolioLink, setPortfolioLink] = useState("");

  const router = useRouter();
  const [productInfo, setProductInfo] = useState();
  const { id } = router.query;
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      console.log(response.data);
      setProductInfo(response.data);
    });
  }, [id]);

  if (!productInfo) {
    return <div>Loading...</div>;
  }

  const { 
    name,
    about,
    phoneNumber,
    socialLink,
    experiences,
    education,
    projects,
    selectedSkills,
    selectedProf,
    dob,
    cv,
    emailid,
    location,
  } = productInfo;



  const generatePortfolioLink = (username) => {
    // Replace with your domain or hosting URL
    const baseUrl = "https://example.com";
    const portfolioUrl = `${baseUrl}/${username}`;
    return portfolioUrl;
  };

  const downloadCode = () => {
    const htmlContent = generateHTMLCode(portfolioData); // Generate the HTML code based on the portfolio data
    const fileName = "portfolio_website.html";

    const element = document.createElement("a");
    element.href =
      "data:text/plain;charset=utf-8," + encodeURIComponent(htmlContent);
    element.download = fileName;
    element.click();
  };

  const generateHTMLCode = (portfolioData) => {
    const { name, about, education, experiences, selectedSkills, socialLink } =
      portfolioData;

    // Generate the HTML code dynamically based on the portfolio data
    return `
          <html>
            <head>
              <title>My Portfolio Website</title>
              <link rel="stylesheet" href="path/to/styles.css">
            </head>
            <body>
              <header>
                <h1>${name}</h1>
              </header>
              <main>
                <section>
                  <h2>About Me</h2>
                  <p>${about}</p>
                </section>
                <section>
                  <h2>Education</h2>
                  <ul>
                    ${education
                      .map(
                        (edu) =>
                          `<li>${edu.school}, ${edu.grade}, ${edu.passDate}</li>`
                      )
                      .join("")}
                  </ul>
                </section>
                <section>
                  <h2>Experience</h2>
                  <ul>
                    ${experiences
                      .map(
                        (exp) =>
                          `<li>${exp.company}, ${exp.joinedYear}, ${exp.description}</li>`
                      )
                      .join("")}
                  </ul>
                </section>
                <section>
                  <h2>Skills</h2>
                  <ul>
                    ${selectedSkills
                      .map((skill) => `<li>${skill.label}</li>`)
                      .join("")}
                  </ul>
                </section>
                <section>
                  <h2>Social Links</h2>
                  <ul>
                    ${socialLink
                      .map(
                        (link) =>
                          `<li>${link.wname}: <a href="${link.wlink}">${link.wlink}</a></li>`
                      )
                      .join("")}
                  </ul>
                </section>
              </main>
              <footer>
                <p>&copy; 2023 - Website of ${name}</p>
              </footer>
            </body>
          </html>
        `;
  };
  return (
    <>
      <Layout name={productInfo.name}>
        <section
          id="home"
          data-nav-tooltip="Home"
          className="pp-section pp-scrollable"
        >
          <div className="home-banner">
            <div className="container">
              <div className="row full-screen align-items-center">
                <div className="col-lg-6">
                  <div className="type-box">
                    <h6>Hello, I am</h6>
                    <h1 className="font-alt">{name}</h1>
                    <p className="lead">
                      I Am <TypingAnimation selectedProf={productInfo.selectedProf} name={productInfo.name} />
                    </p>
                    <p className="desc">
                      {about}
                    </p>
                    <div className="btn-bar">
                      <a className="px-btn px-btn-theme" href={cv}>
                        Donwload CV
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="hb-img">
                    <img src="" title="" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Home */}
        {/* about us */}
        <About
                about={productInfo.about}
                education={productInfo.education}
                experiences={productInfo.experiences}
                selectedSkills={productInfo.selectedSkills}
                socialLink={productInfo.socialLink}
                phoneNumber={productInfo.phoneNumber}
                location={productInfo.location}
                emailid={productInfo.emailid}
                dob={productInfo.dob}
        />
        {/* End about us */}
        {/* Services */}
        <Services
         projects={productInfo.projects}
        />
        {/* End Services */}
        {/* Portfolio */}
        {/* <Portfolio /> */}
        {/* End Portfolio */}
        {/* Blog */}
        {/* <Blog /> */}
        {/* End Blog */}
        {/* Contact us */}
        <Contact
          location={location}
          emailid={emailid}
          phoneNumber={phoneNumber}
        />
      </Layout>
    </>
  );
}
