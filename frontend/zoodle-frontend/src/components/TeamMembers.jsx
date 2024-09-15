import React from 'react';


const teamMembers = [

  {
    name: "Vitoria de Farias",
    image: "/src/assets/img/vitoria_farias.png",
    github: "https://github.com/vickyeqq",
    linkedin: "https://www.linkedin.com/in/vitorialana/"
  }
];

const TeamMembers = () => {
  return (

    <div className="team-members-container">
      <h1 className="developers-title">Desenvolvedora</h1>
      <div className="team-members">

        {teamMembers.map((member, index) => (
          <div key={index} className="member">
            <img src={member.image} alt={member.name} className="member-image" />
            <p className="member-name">{member.name}</p>
            <div className="member-links">
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="member-link">
                <img src="/src/assets/img/github_logo.png" alt="GitHub" className="link-icon" />
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-link">
                <img src="/src/assets/img/linkedin_logo.png" alt="LinkedIn" className="link-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;