import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import './index.css'

interface PersonalInfo {
  name: string
  title: string
  location: string
  phone: string
  email: string
  github: string
  website: string
  linkedin: string
  summary: string
  skills: string[]
}

interface Project {
  name: string
  description: string
  period: string
  technologies: string[]
  highlight: string
  url?: string
}

interface WorkExperience {
  company: string
  location: string
  position: string
  period: string
  funding: string
  description: string
  technologies: string[]
}

const API_BASE = import.meta.env.VITE_API_URL || '/api'

async function fetchPersonalInfo(): Promise<PersonalInfo> {
  const response = await fetch(`${API_BASE}/personal`)
  if (!response.ok) throw new Error('Failed to fetch personal info')
  return response.json()
}

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${API_BASE}/projects`)
  if (!response.ok) throw new Error('Failed to fetch projects')
  return response.json()
}

async function fetchWorkExperience(): Promise<WorkExperience[]> {
  const response = await fetch(`${API_BASE}/work-experience`)
  if (!response.ok) throw new Error('Failed to fetch work experience')
  return response.json()
}

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data: personalInfo, isLoading: loadingPersonal } = useQuery({
    queryKey: ['personal'],
    queryFn: fetchPersonalInfo,
  })

  const { data: projects, isLoading: loadingProjects } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  const { data: workExperience, isLoading: loadingWork } = useQuery({
    queryKey: ['workExperience'],
    queryFn: fetchWorkExperience,
  })

  if (loadingPersonal || loadingProjects || loadingWork) {
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="home">
      <div className="container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-name">{personalInfo?.name}</h1>
            <p className="hero-title">{personalInfo?.title}</p>
            <p className="hero-location">{personalInfo?.location}</p>
            <p className="hero-summary">{personalInfo?.summary}</p>
            <div className="hero-links">
              <a href={`mailto:${personalInfo?.email}`} className="hero-link">
                Email
              </a>
              <a href={personalInfo?.github} target="_blank" rel="noopener noreferrer" className="hero-link">
                GitHub
              </a>
              <a href={personalInfo?.linkedin} target="_blank" rel="noopener noreferrer" className="hero-link">
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* Key Projects Section */}
        <section className="projects-section">
          <h2 className="section-title">Key Projects</h2>
          <div className="projects-grid">
            {projects?.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-header">
                  <h3 className="project-name">
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                        {project.name} →
                      </a>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <span className="project-period">{project.period}</span>
                </div>
                <p className="project-highlight">{project.highlight}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section className="work-section">
          <h2 className="section-title">Work Experience</h2>
          <div className="work-grid">
            {workExperience?.map((work, index) => (
              <div key={index} className="work-card">
                <div className="work-header">
                  <div>
                    <h3 className="work-company">{work.company}</h3>
                    <p className="work-position">{work.position}</p>
                    <p className="work-location">{work.location}</p>
                  </div>
                  <span className="work-period">{work.period}</span>
                </div>
                {work.funding && (
                  <div className="work-funding">
                    <strong>💰 {work.funding}</strong>
                  </div>
                )}
                <p className="work-description">{work.description}</p>
                <div className="work-tech">
                  {work.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills-section">
          <h2 className="section-title">Technologies</h2>
          <div className="skills-grid">
            {personalInfo?.skills.map((skill, index) => (
              <span key={index} className="skill-item">{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

