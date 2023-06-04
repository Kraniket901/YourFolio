import Select from "react-select";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { DeleteIcon } from "./Icons";
import { Button } from "@nextui-org/react";

export default function PortfolioForm({
  _id,
  name: existingName,
  about: existingAbout,
  phoneNumber: existingPhoneNumber,
  socialLink: existingSocialLink,
  experiences: existingExperiences,
  education: existingEducation,
  projects: existingProjects,
  selectedSkills: existingSelectedSkills,
  selectedProf: existingSelectedProf,
  dob: existingDob,
  cv: existingCv,
  emailid: existingEmailid,
  location: existingLocation,
}) {
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  const [name, setName] = useState(existingName || "");
  const [about, setAbout] = useState(existingAbout || "");
  const [phoneNumber, setPhoneNumber] = useState(existingPhoneNumber || "");
  // const [loading, setLoading] = useState(true);
  const [socialLink, setSocialLink] = useState(
    existingSocialLink || [{ wname: "", wlink: "" }]
  );
  const [experiences, setExperiences] = useState(
    existingExperiences || [{ company: "", location: "", position: "", joinedYear: "", resYear: "", description: "" }]
  );
  const [education, setEducation] = useState(
    existingEducation || [{ school: "", location: "", grades: "", passDate: "" }]
  );
  const [projects, setProjects] = useState(
    existingProjects || [
      { title: "", techStack: "", description: "", link: "" },
    ]
  );
  const [selectedSkills, setSelectedSkills] = useState(
    existingSelectedSkills || []
  );
  const [selectedProf, setSelectedProf] = useState(existingSelectedProf || []);
  const [dob, setDob] = useState(existingDob || []);
  const [cv, setCv] = useState(existingCv || []);
  const [emailid, setEmailid] = useState(existingEmailid || []);
  const [location, setLocation] = useState(existingLocation || []);

  const skillOptions = [
    { value: "c++", label: "C++" },
    { value: "java", label: "Java" },
    { value: "reactjs", label: "ReactJS" },
    { value: "nodejs", label: "Node.js" },
    { value: "nextjs", label: "Next.js" },
    { value: "mongodb", label: "MongoDB" },
    { value: "expressjs", label: "Express.js" },
    { value: "tailwindcss", label: "Tailwind CSS" },
    { value: "css", label: "CSS" },
    { value: "html", label: "HTML" },
  ];

  const profOptions = [
    { value: "coder", label: "Coder" },
    { value: "frontend", label: "Frontend Developer" },
    { value: "backend", label: "Backend Developer" },
    { value: "fullstack", label: "Full Stack Developer" },
    { value: "designer", label: "Designer" },
    { value: "problemsolver", label: "Problem Solver" },
    { value: "freelancer", label: "Freelancer" },
    { value: "developer", label: "Developer" },
    { value: "programmer", label: "Programmer" },
    { value: "student", label: "Student" },
  ];

  const handleInputChange = (index, section, { field, value }) => {
    if (section === "experiences") {
      const updatedExperiences = [...experiences];
      updatedExperiences[index][field] = value;
      setExperiences(updatedExperiences);
    } else if (section === "education") {
      const updatedEducation = [...education];
      updatedEducation[index][field] = value;
      setEducation(updatedEducation);
    } else if (section === "socialLink") {
      const updatedSocialLink = [...socialLink];
      updatedSocialLink[index][field] = value;
      setSocialLink(updatedSocialLink);
    } else if (section === "projects") {
      const updatedProjects = [...projects];
      updatedProjects[index][field] = value;
      setProjects(updatedProjects);
    }
  };

  const handleSkillChange = (selectedOptions) => {
    setSelectedSkills(selectedOptions);
  };
  const handleProfChange = (profOptions) => {
    setSelectedProf(profOptions);
  };

  const handleAddItem = (section) => {
    if (section === "experiences") {
      const updatedExperiences = [
        ...experiences,
        { company: "", location: "", position: "", joinedYear: "", resYear: "", description: "" },
      ];
      setExperiences(updatedExperiences);
    } else if (section === "education") {
      const updatedEducation = [
        ...education,
        { school: "", location: "", grades: "", passDate: "" },
      ];
      setEducation(updatedEducation);
    } else if (section === "socialLink") {
      const updatedSocialLink = [...socialLink, { wname: "", wlink: "" }];
      setSocialLink(updatedSocialLink);
    } else if (section === "projects") {
      const updatedProjects = [
        ...projects,
        { title: "", techStack: "", description: "", link: "" },
      ];
      setProjects(updatedProjects);
    }
  };

  const handleAddCustomSkill = (inputValue) => {
    const customSkill = { value: inputValue, label: inputValue };
    setSelectedSkills((prevSkills) => [...prevSkills, customSkill]);
  };
  const handleAddCustomProf = (inputValue) => {
    const customProf = { value: inputValue, label: inputValue };
    setSelectedProf((prevProf) => [...prevProf, customProf]);
  };

  const handleRemoveItem = (index, section) => {
    if (section === "experiences") {
      const updatedExperiences = [...experiences];
      updatedExperiences.splice(index, 1);
      setExperiences(updatedExperiences);
    } else if (section === "education") {
      const updatedEducation = [...education];
      updatedEducation.splice(index, 1);
      setEducation(updatedEducation);
    } else if (section === "socialLink") {
      const updatedSocialLink = [...socialLink];
      updatedSocialLink.splice(index, 1);
      setSocialLink(updatedSocialLink);
    } else if (section === "projects") {
      const updatedProjects = [...projects];
      updatedProjects.splice(index, 1);
      setProjects(updatedProjects);
    }
  };
  // const generateResponse= async ()=>{
  //   console.log(about);
  //   var responseClone;
  //   axios.post('/api/generateAnswers', {
  //       prompt: about
  //   }, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then((response) => response.data)
  //     .then((data) => {
  //       // Handle the response data
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       // Handle any errors
  //       console.log("error");
  //     });
  //   setLoading(false);
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
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
    };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  };

  if (goToProducts) {
    router.push("/");
  }

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Portfolio Generator</h1> */}
      <form onSubmit={handleSubmit}>
        <div className="box0">
          <div className="box1">
            <div>
              <label htmlFor="name">Name : &nbsp;</label> <br />
              <input
                type="text"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber">Phone Number : &nbsp;</label>
              <br />
              <input
                type="text"
                id="phoneNumber"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="dob">Date Of Birth : &nbsp;</label>
              <br />
              <input
                type="text"
                id="dob"
                placeholder="Enter Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="box2">
            <label htmlFor="about" className="block mb-2">
              About:
            </label>
            <br />
            <textarea
              id="about"
              value={about}
              placeholder="Enter About Yourself"
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            ></textarea>
            {/* <Button  onPress={generateResponse}>Generate AI Response</Button> */}
          </div>
        </div>
        <div className="box0">
        <div className="box1">
          <label htmlFor="dob">CV Link : &nbsp;</label>
          <input
            type="text"
            id="cv"
            placeholder="Enter CV Link"
            value={cv}
            onChange={(e) => setCv(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <br />
          <label>Who are you ? : &nbsp;</label>
          <Select
            isMulti
            options={profOptions}
            value={selectedProf}
            onChange={handleProfChange}
            isSearchable
          />
          <button
            type="button"
            className="end-btn"
            onClick={() => handleAddCustomProf(prompt("Enter a Custom Option"))}
          >
            Add Custom Option
          </button>
        </div>
        <div className="box1">
        <label htmlFor="dob">Email Id : &nbsp;</label>
          <input
            type="text"
            id="emailid"
            placeholder="Enter Email ID"
            value={emailid}
            onChange={(e) => setEmailid(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <br />
        <label htmlFor="dob">Address / Location : &nbsp;</label>
          <input
            type="text"
            id="location"
            placeholder="Enter Address / Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
                  
        </div>

        <div className="yellow-border">
          <label className="block mb-2">Social Links : &nbsp;</label>
          {socialLink.map((sl, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Website Name"
                  value={sl.wname}
                  onChange={(e) =>
                    handleInputChange(index, "socialLink", {
                      field: "wname",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Website Link"
                  value={sl.wlink}
                  onChange={(e) =>
                    handleInputChange(index, "socialLink", {
                      field: "wlink",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2  mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />

                <DeleteIcon
                  onClick={() => handleRemoveItem(index, "socialLink")}
                  fill="#FF0080"
                  size={30}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("socialLink")}
            className=""
          >
            Add Website
          </button>
        </div>

        <div className="yellow-border">
          <label className="block mb-2">Skills : &nbsp;</label>
          <Select
            isMulti
            options={skillOptions}
            value={selectedSkills}
            onChange={handleSkillChange}
            isSearchable
            className="mb-2"
          />
          <button
            type="button"
            onClick={() => handleAddCustomSkill(prompt("Enter a custom skill"))}
            className="px-4 py-2 my-4 bg-blue-500 text-white rounded"
          >
            Add Custom Skill
          </button>
        </div>

        <div className="yellow-border">
          <label className="block mb-2">Experiences : &nbsp;</label>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) =>
                    handleInputChange(index, "experiences", {
                      field: "company",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={(e) =>
                    handleInputChange(index, "experiences", {
                      field: "location",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) =>
                    handleInputChange(index, "experiences", {
                      field: "position",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Joined Year"
                  value={exp.joinedYear}
                  onChange={(e) =>
                    handleInputChange(index, "experiences", {
                      field: "joinedYear",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Resigned year"
                  value={exp.resYear}
                  onChange={(e) =>
                    handleInputChange(index, "experiences", {
                      field: "resYear",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <DeleteIcon
                  onClick={() => handleRemoveItem(index, "experiences")}
                  fill="#FF0080"
                  size={30}
                />
              </div>
              <textarea
                placeholder="Description"
                value={exp.description}
                onChange={(e) =>
                  handleInputChange(index, "experiences", {
                    field: "description",
                    value: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("experiences")}
            className="px-4 py-2 bg-green-500 text-white rounded mt-2"
          >
            Add Experience
          </button>
        </div>
        <div className="yellow-border">
          <label className="block mb-2">Education : &nbsp;</label>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="School Name"
                  value={edu.school}
                  onChange={(e) =>
                    handleInputChange(index, "education", {
                      field: "school",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="School Location"
                  value={edu.location}
                  onChange={(e) =>
                    handleInputChange(index, "education", {
                      field: "location",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Grades"
                  value={edu.grades}
                  onChange={(e) =>
                    handleInputChange(index, "education", {
                      field: "grades",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2  mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Pass Date"
                  value={edu.passDate}
                  onChange={(e) =>
                    handleInputChange(index, "education", {
                      field: "passDate",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <DeleteIcon
                  onClick={() => handleRemoveItem(index, "education")}
                  size={30}
                  fill="#FF0080"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("education")}
            className="px-4 py-2 bg-green-500 text-white rounded mt-2"
          >
            Add Education
          </button>
        </div>

        <div className="yellow-border">
          <label className="block mb-2">Projects : &nbsp;</label>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Title"
                  value={project.title}
                  onChange={(e) =>
                    handleInputChange(index, "projects", {
                      field: "title",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Tech Stack"
                  value={project.techStack}
                  onChange={(e) =>
                    handleInputChange(index, "projects", {
                      field: "techStack",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={project.description}
                  onChange={(e) =>
                    handleInputChange(index, "projects", {
                      field: "description",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Link"
                  value={project.link}
                  onChange={(e) =>
                    handleInputChange(index, "projects", {
                      field: "link",
                      value: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 mr-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <DeleteIcon
                  size={30}
                  fill="#FF0080"
                  onClick={() => handleRemoveItem(index, "projects")}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddItem("projects")}
            className="px-4 py-2 bg-green-500 text-white rounded mt-2"
          >
            Add Project
          </button>
        </div>

        <button type="submit" className="end-btn">
          Submit
        </button>
      </form>
    </div>
  );
}
