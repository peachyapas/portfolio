import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Element, scroller } from "react-scroll";

function App() {
    const [projects, setProjects] = useState([]);
    const [experience, setExperience] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/projects")
            .then(response => setProjects(response.data))
            .catch(error => console.error("Error fetching projects:", error));

        axios.get("http://localhost:5001/experience")
            .then(response => setExperience(response.data))
            .catch(error => console.error("Error fetching experience:", error));
    }, []);

    // Scroll to the projects section when click see more button
    const handleSeeMoreClick = () => {
        scroller.scrollTo('projects', {
            smooth: true,
            offset: -70, // adjust to navbar height!
            duration: 800
        });
    };

    return (
        <div>
            {/* Navbar */}
            <header>
                <nav>
                    <Link to="landing" smooth={true} duration={500}>Home</Link>
                    <Link to="projects" smooth={true} duration={500}>Projects</Link>
                    <Link to="experience" smooth={true} duration={500}>Experience</Link>
                    <a href="https://github.com/peachyapas" target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a href="/PeachyapaSaengcharoentrakul_Resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                </nav>
            </header>

            {/* Landing Section */}
            <section id="landing" className="landing">
                <div className="landing-content">
                    <img src="/profilepic.png" alt="Your Name" />
                    <h1>Peach Saengcharoentrakul</h1>
                    <p>not sure what to say here yet :D</p>
                    <button onClick={handleSeeMoreClick}>See More?</button>
                </div>
            </section>

            {/* Projects Section */}
            <Element name="projects" className="projects">
                <section style={{ backgroundColor: "#f0f0f0" }}>
                    <h2>Projects</h2>
                    <ul>
                        {projects.map(project => (
                            <li key={project.id}>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <p><strong>Technologies:</strong> {project.technologies}</p>
                                <a href={project.github_link} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                            </li>
                        ))}
                    </ul>
                </section>
            </Element>

            {/* Experience Section */}
            {/* need to add archived
              *
              */}
            <Element name="experience" className="experience">
                <section style={{ backgroundColor: "#e0e0e0" }}>
                    <h2>Experience</h2>
                    <ul>
                        {experience.map(exp => (
                            <li key={exp.id}>
                                <h3>{exp.jobtitle} at {exp.company}</h3>
                                <p>{exp.description}</p>
                                <p>
                                    <strong>Dates:</strong> 
                                    {exp.datestart 
                                        ? new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(exp.datestart)) 
                                        : "Ongoing"} - 
                                    {exp.dateend 
                                        ? new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(new Date(exp.dateend)) 
                                        : "Present"}
                                </p>
                            </li>
                        ))}
                    </ul>
                </section>
            </Element>
        </div>
    );
}

export default App;
