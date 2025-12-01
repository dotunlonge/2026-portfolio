import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { apiFetch, ApiException } from '../utils/api'
import { ProjectCardSkeleton, WorkCardSkeleton } from '../components/SkeletonLoader'
import { SEO } from '../components/SEO'
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

async function fetchPersonalInfo(): Promise<PersonalInfo> {
  return apiFetch<PersonalInfo>('/personal')
}

async function fetchProjects(): Promise<Project[]> {
  return apiFetch<Project[]>('/projects')
}

async function fetchWorkExperience(): Promise<WorkExperience[]> {
  return apiFetch<WorkExperience[]>('/work-experience')
}

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  const { data: personalInfo, isLoading: loadingPersonal, error: personalError } = useQuery({
    queryKey: ['personal'],
    queryFn: fetchPersonalInfo,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  const { data: projects, isLoading: loadingProjects, error: projectsError } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  const { data: workExperience, isLoading: loadingWork, error: workError } = useQuery({
    queryKey: ['workExperience'],
    queryFn: fetchWorkExperience,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })

  const isLoading = loadingPersonal || loadingProjects || loadingWork
  const hasError = personalError || projectsError || workError

  if (isLoading) {
    return (
      <div className="home">
        <div className="container">
          <section className="hero">
            <div className="hero-content">
              <div className="skeleton" style={{ height: '3rem', width: '60%', marginBottom: '1rem' }}></div>
              <div className="skeleton" style={{ height: '1.5rem', width: '40%', marginBottom: '0.5rem' }}></div>
              <div className="skeleton" style={{ height: '1rem', width: '30%', marginBottom: '2rem' }}></div>
              <div className="skeleton" style={{ height: '1rem', width: '100%', marginBottom: '0.75rem' }}></div>
              <div className="skeleton" style={{ height: '1rem', width: '90%', marginBottom: '0.75rem' }}></div>
            </div>
          </section>
          <section className="projects-section">
            <h2 className="section-title">Key Projects</h2>
            <div className="projects-grid">
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
              <ProjectCardSkeleton />
            </div>
          </section>
          <section className="work-section">
            <h2 className="section-title">Work Experience</h2>
            <div className="work-grid">
              <WorkCardSkeleton />
              <WorkCardSkeleton />
            </div>
          </section>
        </div>
      </div>
    )
  }

  if (hasError) {
    const error = personalError || projectsError || workError
    const errorMessage = error instanceof ApiException 
      ? error.message 
      : 'Failed to load content. Please try refreshing the page.'
    
    return (
      <div className="container">
        <div className="error-state">
          <h2 className="error-title">Unable to Load Content</h2>
          <p className="error-message">{errorMessage}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="error-retry-button"
            aria-label="Retry loading content"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="home">
      <SEO 
        title={`${personalInfo?.name} - ${personalInfo?.title}`}
        description={personalInfo?.summary}
        url="https://dotunlonge.vercel.app"
      />
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

