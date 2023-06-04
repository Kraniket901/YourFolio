import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import api from "../../services/api";
import { basePath } from "../../next.config";
import Layout from "../portfolio/src/layout/Layout";
import { BsStack } from "react-icons/bs";
import Contact from "../portfolio/src/components/Contact";

function Portfolio2({ username }) {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({
    name: "Loading...",
  });

  useEffect(() => {
    if (!username) router.replace("/");

    loadUser();
    loadProjects();
  }, []);

  async function loadUser() {
    try {
      const response = await api.get(`/users/${username}`);
      console.log(response.data);
      setUser(response.data);
    } catch (err) {
      alert(`It was not possible to find user ${username}!`);
      router.replace("/");
    }
  }

  async function loadProjects() {
    try {
      const response = await api.get(
        `/users/${username}/repos?per_page=100&type=all`
      );

      setProjects(response.data);
    } catch (err) {
      alert("It was not possible to find projects!");
    }
  }

  return (
    <>
      <Head>
        <title>{user.name || user.login} | YourFolio</title>
      </Head>

      <Layout name={user.name} avatar_url={user.avatar_url}>
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
                    <h1 className="font-alt">{user.name || user.login}</h1>
                    
                    <p className="lead">
                      @ {user.login}
                    </p>
                    {user.bio && <p className="desc">{user.bio}</p>}

                    <p className="desc">
                      <a href={user.blog}>
                      {user.blog?
                    ` ${user.blog}`:""
                        }
                      </a>
                      <p className="desc">
                    {user.location?
                    `📌 ${user.location}`:""
                        }
                    </p>
                    </p>
                    <p className="lead">
                        {user.email?
                    `Email : ${user.email}`:""
                        }
                    </p>
                    <p className="lead">
                    {user.twitter_username?
                    `Twitter : ${user.twitter_username}`:""
                        }
                    </p>
                    
                    <div className="btn-bar">
                      <a className="px-btn px-btn-theme" href={`https://github.com/${username}`}>
                       Go To GitHub
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="hb-img">
                    <img
                      src={user.avatar_url || `${basePath}/profile-icon.png`}
                      alt="profile_pic"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Home */}
        {/* about us */}
        {/* End about us */}
        {/* Services */}
        {projects.length > 0 && (
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
                {projects.map(
                  (project) =>
                    !project.fork && (
                      <div key={project.name} className="col-sm-6 m-15px-tb">
                        <div className="feature-box-01 media">
                          <i className="icon theme-bg icon-mobile" />
                          <div className="feature-content media-body">
                            <h5>{project.name}</h5>
                            <p>
                              <div>
                                Languages <BsStack className="mx-1" />{" "}
                                {project.language}
                              </div>
                              <div>{project.description}</div>
                            </p>
                          </div>
                        </div>
                        <div className="project-link">
                          <a className="text-white" href={project.html_url}>
                            Link
                          </a>
                        </div>
                      </div>
                    )
                )}
              </div>
              <div className="separated" />
            </div>
          </section>
        )}
        {/* End Services */}
        {/* Portfolio */}
        {/* <Portfolio /> */}
        {/* End Portfolio */}
        {/* Blog */}
        {/* <Blog /> */}
        {/* End Blog */}
        <Contact/>
      </Layout>
    </>
  );
}

export default Portfolio2;
