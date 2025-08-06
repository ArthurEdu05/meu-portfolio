import "./Projects.css";

const Projects = () => {
  const projects = [];

  return (
    <section className="projects section" id="projects">
      <h2 className="section-title">Projetos</h2>

      {projects.length === 0 ? (
        <div className="projects-placeholder">
          <h3 className="projects-message">Em breve...</h3>
          <p className="projects-submessage">Estou trabalhando nisso!</p>
          <div className="projects-grid">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="project-card empty">
                <span className="project-placeholder">Projeto #{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="projects-grid">
          {/* Aqui entrarão os projetos reais no futuro */}
        </div>
      )}
    </section>
  );
};

export default Projects;