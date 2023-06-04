import { BsCalendarDate } from "react-icons/bs";
import { FaBirthdayCake, FaIcons } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { AiFillMail, AiFillPhone, AiOutlineMail } from "react-icons/ai";
import { FiMail } from "react-icons/fi";

const getSkillIcon = (skill) => {
  switch (skill) {
    case "c++":
      return <FaIcons className="text-xl" icon={FaCPlusPlus} />;
    case "java":
      return <FaIcons className="text-xl" icon={FaJava} />;
    case "reactjs":
      return <FaIcons className="text-xl" icon={FaReact} />;
    case "nodejs":
      return <FaIcons className="text-xl" icon={FaNodeJs} />;
    // Add more cases for other skills/icons
    default:
      return null;
  }
};

const About = (
  {
    about,
    education,
    selectedSkills,
    experiences,
    socialLink,
    phoneNumber,
    location,
    emailid,
    dob
  }
) => {
  return (
    <section
      id="about"
      data-nav-tooltip="About"
      className="pp-section pp-scrollable section counter"
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 m-15px-tb">
            <div className="about-info">
              <div className="title">
                <h3>About me.</h3>
              </div>
              <div className="about-text">
                <p>
                  {about}
                </p>
                <p>
                <ImLocation/> {location}
                </p>
                <p>
                <FiMail/> &nbsp; {emailid}
                </p>
                <p>
                <AiFillPhone/> &nbsp;{phoneNumber}
                </p>
                <p>
                <FaBirthdayCake/> &nbsp; {dob}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 m-15px-tb">
            <div className="about-info">
              <div className="title">
                <h3>Social Links.</h3>
              </div>
              <div className="btn-bar">
              {socialLink.map((link, index) => (
                  <a key={index} className="px-btn px-btn-theme mb-4" href={link.wlink}>
                    <span>{link.wname}</span>
                  </a>
                   ))}
                </div>
            </div>
          </div>
        </div>
        <div className="separated" />
        <div className="title">
          <h3>Education &amp; Skills</h3>
        </div>
        <div className="row">
          <div className="col-lg-4 m-15px-tb">
            <ul className="aducation-box">
            {education.map((item, index) => (
              <li key={index}>
                <span> <BsCalendarDate size={15} className="mx-2 my-1" /> {item.passDate}</span>
                <h6>{item.school}</h6>
                {item.location&&<p> <ImLocation/> &nbsp;{item.location}</p>}
                <p>Grade : {item.grades}</p>
              </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-7 ml-auto m-15px-tb">
            <div className="skills-box">
              <h3>My skills</h3>
              {/* <p>
                {`I'm`} a Freelancer Front-end Developer with over 3 years of
                experience. I code and create web elements for amazing people
                around the world. I like work with new people. New people new
                Experiences.
              </p> */}
              {selectedSkills.map((skill, index) => (
              <div  key={index} className="skill-lt">
                <h6>{getSkillIcon(skill.label)}{" "}{skill.label}</h6>
                <div className="skill-bar">
                  <div className="skill-bar-in" style={{ width: "100%" }}>
                    <span data-toggle="tooltip" title="100%" />
                  </div>
                </div>
              </div>
                 ))}
            </div>
          </div>
        </div>
        <div className="separated" />
        <div className="title">
          <h3>Experience</h3>
        </div>
        {experiences.map((item, index) => (
        <div key={index} className="resume-box">

          <div   className="resume-row">
            <div className="row">
              <div className="col-sm-9 col-md-9 col-xl-10">
                <div className="rb-right">
                  <h6>{item.company}</h6>
                  {item.location&&<p><ImLocation/> {item.location}</p>}
                  <label>Joined : <BsCalendarDate size={20} className="ml-2 mr-1"/> {item.joinedYear} - {item.resYear}</label>
                  <div className="rb-time">Full Time</div>
                  <p>
                  {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
            ))}
      </div>
    </section>
  );
};
export default About;
