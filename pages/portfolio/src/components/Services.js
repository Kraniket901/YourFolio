import dynamic from "next/dynamic";
import { BsStack } from "react-icons/bs";

const Testimonials = dynamic(() => import("./Testimonials"), {
  ssr: false,
});

const Services = ({
  projects,
}) => {
  return (
    <section
      id="services"
      data-nav-tooltip="Services"
      className="pp-section pp-scrollable section"
    >
      <div className="container">
        <div className="title">
          <h3>Projects</h3>
        </div>
        <div className="row">
        {projects.map((item, index) => (
          <div key={index} className="col-sm-6 m-15px-tb">
            <div className="feature-box-01 media">
              <i className="icon theme-bg icon-mobile" />
              <div className="feature-content media-body">
                <h5>{item.title}</h5>
                <p>
                  
                  <div>Techstack <BsStack className="mx-1" /> {item.techStack}</div>
                  <div>{item.description}</div>
                  
                </p>
                
              </div>
            </div>
            <div className="project-link">
                    <a className="text-white" href={item.link}>Link</a>
                  </div>
          </div>
          ))}
        </div>
        <div className="separated" />
        {/* <Testimonials /> */}
      </div>
    </section>
  );
};
export default Services;
