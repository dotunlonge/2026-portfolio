import { createFileRoute, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { apiFetch, ApiException } from '../utils/api'
import { ProjectCardSkeleton, WorkCardSkeleton } from '../components/SkeletonLoader'
import { SEO } from '../components/SEO'
import { LazyImage } from '../components/LazyImage'
import { PerformanceMetrics } from '../components/PerformanceMetrics'
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
  skillsByCategory?: {
    [key: string]: string[]
  }
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

/**
 * Fetches personal information from the API.
 * 
 * @returns {Promise<PersonalInfo>} Promise that resolves to personal information object
 * @throws {ApiException} If the API request fails
 */
async function fetchPersonalInfo(): Promise<PersonalInfo> {
  return apiFetch<PersonalInfo>('/personal')
}

/**
 * Fetches the list of key projects from the API.
 * 
 * @returns {Promise<Project[]>} Promise that resolves to an array of project objects
 * @throws {ApiException} If the API request fails
 */
async function fetchProjects(): Promise<Project[]> {
  return apiFetch<Project[]>('/projects')
}

/**
 * Fetches work experience history from the API.
 * 
 * @returns {Promise<WorkExperience[]>} Promise that resolves to an array of work experience objects
 * @throws {ApiException} If the API request fails
 */
async function fetchWorkExperience(): Promise<WorkExperience[]> {
  return apiFetch<WorkExperience[]>('/work-experience')
}

export const Route = createFileRoute('/')({
  component: Home,
})

/**
 * Formats a project period string, preserving year-only values.
 * 
 * Key Projects use year-only values (e.g., "2024", "2025") which should never
 * be formatted with months. This function ensures year-only periods are returned
 * as-is without any date formatting or month conversion.
 * 
 * @param {string} period - Period string (e.g., "2024", "2025", or "Jan 2018 — Jun 2019")
 * @returns {string} The period string as-is, without any date formatting
 * 
 * @example
 * ```typescript
 * formatProjectPeriod('2024') // Returns: "2024"
 * formatProjectPeriod('2025') // Returns: "2025"
 * formatProjectPeriod('Jan 2018 — Jun 2019') // Returns: "Jan 2018 — Jun 2019"
 * ```
 */
function formatProjectPeriod(period: string): string {
  // If period is just a 4-digit year, return it as-is without any formatting
  // This prevents year-only values from being converted to dates like "January, 2024"
  if (/^\d{4}$/.test(period.trim())) {
    return period.trim()
  }
  // For other formats (e.g., date ranges), return as-is
  return period
}

/**
 * Returns a visual icon or abbreviation for a given technology name.
 * 
 * Maps common technology names to emoji icons or abbreviations for better
 * visual recognition in the skills section. Falls back to a bullet point
 * for unmapped technologies.
 * 
 * @param {string} tech - Technology name (e.g., 'TypeScript', 'React', 'AWS')
 * @returns {JSX.Element | null} A span element containing the icon/abbreviation, or null
 * 
 * @example
 * ```typescript
 * getTechIcon('TypeScript') // Returns: <span>TS</span>
 * getTechIcon('React') // Returns: <span>⚛️</span>
 * getTechIcon('UnknownTech') // Returns: <span>•</span>
 * ```
 */
function getTechIcon(tech: string): JSX.Element | null {
  const iconMap: { [key: string]: string } = {
    'TypeScript': 'TS',
    'JavaScript': 'JS',
    'React': '⚛️',
    'Node.js': '🟢',
    'Python': '🐍',
    'Rust': '🦀',
    'Next.js': '▲',
    'AWS': '☁️',
    'Docker': '🐳',
    'Kubernetes': '☸️',
    'PostgreSQL': '🐘',
    'MongoDB': '🍃',
    'GraphQL': '◈',
    'Git': '📦',
  }
  
  const icon = iconMap[tech] || '•'
  return <span className="tech-icon" aria-hidden="true">{icon}</span>
}

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
        breadcrumbs={[
          { name: 'Home', url: 'https://dotunlonge.vercel.app/' }
        ]}
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
              <a 
                href="/Oludotun Longe - Software-Engineer-Resume.pdf" 
                download="Oludotun-Longe-Resume.pdf"
                className="hero-link hero-link-primary"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '0.5rem' }}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Resume
              </a>
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
            {projects?.map((project, index) => {
              const CardContent = () => (
                <>
                  <div className="project-header">
                    <h3 className="project-name">
                      {project.url ? (
                        <>
                          {project.name} →
                        </>
                      ) : (
                        project.name
                      )}
                    </h3>
                    <span className="project-period">{formatProjectPeriod(project.period)}</span>
                  </div>
                  <p className="project-highlight">{project.highlight}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </>
              )

              if (project.url) {
                return (
                  <a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-card project-card-link"
                  >
                    <CardContent />
                  </a>
                )
              }

              return (
                <div key={index} className="project-card">
                  <CardContent />
                </div>
              )
            })}
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
          {personalInfo?.skillsByCategory ? (
            <div className="skills-categories">
              {Object.entries(personalInfo.skillsByCategory).map(([category, skills]) => (
                <div key={category} className="skill-category">
                  <h3 className="skill-category-title">{category}</h3>
                  <div className="skills-grid">
                    {skills.map((skill, index) => (
                      <span key={index} className="skill-item">
                        {getTechIcon(skill)}
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="skills-grid">
              {personalInfo?.skills.map((skill, index) => (
                <span key={index} className="skill-item">
                  {getTechIcon(skill)}
                  {skill}
                </span>
              ))}
            </div>
          )}
        </section>
      </div>
      {/* <PerformanceMetrics /> */}
    </div>
  )
}

