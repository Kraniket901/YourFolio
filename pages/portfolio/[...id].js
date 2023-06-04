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
    const htmlContent = generateHTMLCode(productInfo); // Generate the HTML code based on the portfolio data
    const fileName = "portfolio_website.html";

    const element = document.createElement("a");
    element.href =
      "data:text/plain;charset=utf-8," + encodeURIComponent(htmlContent);
    element.download = fileName;
    element.click();
  };

  const generateHTMLCode = (productInfo) => {

    // Generate the HTML code dynamically based on the portfolio data
    return `

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }
    
    header {
      background-color: #333;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    
    h1 {
      margin: 0;
      font-size: 36px;
      text-transform: uppercase;
    }
    
    main {
      padding: 20px;
    }
    
    h2 {
      margin-top: 0;
      font-size: 24px;
      color: #333;
    }
    
    p {
      margin-top: 5px;
      margin-bottom: 20px;
      line-height: 1.5;
    }
    
    ul {
      list-style-type: none;
      padding: 0;
    }
    
    li {
      margin-bottom: 5px;
    }
    
    .section {
      margin-bottom: 20px;
    }
    
    .section h2 {
      color: #333;
      font-size: 20px;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
      margin-bottom: 10px;
    }
    
    .section ul {
      margin-left: 20px;
    }
    
    .section ul li:before {
      
      color: #333;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
    
    .section ul li:last-child {
      margin-bottom: 0;
    }
    
    footer {
      background-color: #333;
      color: #fff;
      padding: 20px;
      text-align: center;
    }
    
    footer p {
      margin: 0;
    }
    
    a {
      color: #333;
    }
      </style>
    </head>
    <body>
      <header>
        <h1>${name}</h1>
      </header>
      <main>
        <section class="section">
          <h2>About Me</h2>
          <p>${about}</p>
          <p style="margin:0;">📌 ${location}</p>
          <p style="margin:0;">✉ ${emailid}</p>
        </section>
        <section class="section">
            <h2>Social Links</h2>
            <ul style="display: flex; flex-wrap: wrap;">
                ${socialLink
                    .map(
                      (link) =>
                        `<li style="background-color: #333; color: #fff; padding: 0.5rem 0.7rem; border-radius: 10px; margin: 0 0.5rem 0.3rem 0; font-size: small;"><a href="${link.wlink}"></a>${link.wname}</li>`
                    )
                    .join("")}
            </ul>
          </section>
        <section class="section">
          <h2>Education</h2>
          <ul>
            ${education
                .map(
                  (edu) =>
                    `<li>
                        <p style="margin: 0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: large; font-weight: 600;">${edu.school} | ${edu.location}</p>
                        <p style="margin: 0; font-size: small;">Grade: ${edu.grade}</p>
                        <p style="margin: 0; font-size: small;">Passing Date: ${edu.passDate}</p>
                        </li>`
                )
                .join("")}
          </ul>
        </section>
        <section class="section">
          <h2>Experience</h2>
          <ul>
            ${experiences
                .map(
                  (exp) =>
                    `<li>
                        <p style="margin: 0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: large; font-weight: 600;">${exp.position} | ${exp.company} | ${exp.location}</p>
                        <p style="margin: 0; font-size: small;">${exp.joinedYear} - ${exp.resYear}</p>
                        <p style="margin: 0; font-size: small;">${exp.description}</p>
                        </li>`
                )
                .join("")}
          </ul>
        </section>
        <section class="section">
          <h2>Skills</h2>
          <ul style="display: flex; flex-wrap: wrap;">
            ${selectedSkills
                .map((skill) => `<li style="background-color: #333; color: #fff; padding: 0.5rem 0.7rem; border-radius: 10px; margin: 0 0.5rem 0.3rem 0; font-size: small;">${skill.label}</li>`)
                .join("")}
    
          </ul>
        </section>
        <section class="section">
            <h2>Projects</h2>
            <ul>
                ${projects
                    .map(
                      (projects) =>
                        `<li>
                            <p style="margin: 0; font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: large; font-weight: 600;">${projects.title} | ${projects.link}</p>
                            <p style="margin: 0; font-size: small;"> <b>Techstacks : </b> ${projects.techstack}</p>
                            <p style="margin: 0; font-size: small;">${projects.description}</p>
                        </li>`
                    )
                    .join("")}
            </ul>
          </section>
      </main>
      <footer>
        <p>&copy; 2023 - Resume of ${name}</p>
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
        <div className="code-download">
        <button className="px-btn px-btn-theme" onClick={downloadCode}>Download Resume</button>
        </div>
      </Layout>
    </>
  );
}
