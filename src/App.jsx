import { useEffect, useState } from 'react'
import heroImage from './assets/hero.jpeg'
import resumePdf from './assets/Sanjay_S_AWS_DevOps_Resume_March_2024.pdf'
import billingHome from './assets/Jewellbisbilling.png'
import billingInvoice from './assets/billing3.png'
import chitHome from './assets/chit.png'
import chitPlans from './assets/chit2.png'
import portfolioPreview from './assets/portfolio.png'
import './App.css'

const skills = [
  {
    title: 'AWS Infrastructure',
    items: ['EC2', 'S3', 'IAM', 'VPC', 'RDS', 'Route 53', 'EFS', 'EBS'],
  },
  {
    title: 'AWS Services',
    items: ['SNS', 'SQS', 'Lambda', 'Elastic Load Balancing'],
  },
  {
    title: 'DevOps',
    items: ['Terraform', 'Docker', 'Kubernetes', 'Jenkins', 'Git & GitHub', 'GitHub Actions', 'Linux', 'CI/CD', 'Shell'],
  },
  {
    title: 'Development',
    items: ['React', 'React Native', 'JavaScript', 'Tailwind CSS', 'ASP.NET', 'Swagger', 'REST APIs', 'HTML & CSS'],
  },
]

const projects = [
  {
    number: '01',
    title: 'Jewellery Billing App',
    description:
      'I designed the UI for a jewellery billing app with purchase and sales billing, item tagging, Bluetooth printer bill printing, and business reports.',
    tags: ['React Native', 'AWS', 'Daily billing'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.jewellery.billing&pcampaignid=web_share',
    screens: [
      { src: billingHome, alt: 'Jewellery billing dashboard with daily rates and actions' },
      { src: billingInvoice, alt: 'Sales invoice summary screen' },
    ],
  },
  {
    number: '02',
    title: 'Chit & Jewellery Platform',
    description:
      'I designed the app UI for Digi Gold, Digi Silver, and gold savings features, integrated Razorpay for payments, used Firebase for notifications, and deployed the app backend on AWS.',
    tags: ['React Native', 'Razorpay', 'Firebase', 'AWS'],
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.srikumaran.chitscheme&pcampaignid=web_share',
    appStoreUrl: 'https://apps.apple.com/in/app/sri-kumaran-jewellers/id6761646547',
    screens: [
      { src: chitHome, alt: 'Jewellery app home screen showing rates and featured collection' },
      { src: chitPlans, alt: 'Jewellery savings app showing gold and silver plan options' },
    ],
  },
  {
    number: '03',
    title: 'Personal Portfolio',
    description:
      'Built with React.js and CSS, then deployed on AWS EC2 using both Windows and Linux server environments.',
    tags: ['React.js', 'CSS', 'AWS EC2', 'Windows & Linux'],
    previewType: 'desktop',
    screens: [
      { src: portfolioPreview, alt: 'Screenshot of my personal portfolio website' },
    ],
  },
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function App() {
  const [showCoverLetter, setShowCoverLetter] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const downloadCoverLetter = async () => {
    const { jsPDF } = await import('jspdf')
    const pdf = new jsPDF()
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(16)
    pdf.text('Sanjay S', 20, 20)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(10)
    pdf.text('+91 87546 03732 | sanjayshanmugam324@gmail.com', 20, 28)
    pdf.text('Chennai, Tamil Nadu', 20, 34)

    pdf.setFontSize(11)
    const coverText = [
      'Dear Hiring Manager,',
      '',
      'I am writing to apply for a Software Developer or React / React Native',
      'position in your organization. I have hands-on experience developing',
      'mobile and web applications, integrating AWS, and deploying apps to',
      'the Google Play Store and Apple App Store.',
      '',
      'Currently, I work at Dikshi Technologies in Chennai, where I develop',
      'React and React Native applications and support AWS infrastructure.',
      'My experience includes REST API integration, responsive interfaces,',
      'AWS services, local-server website hosting, and mobile app releases.',
      '',
      'I am comfortable working closely with product and operations teams',
      'to understand requirements, implement useful features, troubleshoot',
      'issues and deliver maintainable solutions. I would welcome the opportunity',
      'to discuss how my skills and project experience can contribute to your team.',
      '',
      'Thank you for your time and consideration.',
      '',
      'Sincerely,',
      'Sanjay S',
    ]
    pdf.text(coverText, 20, 48, { maxWidth: 170, lineHeightFactor: 1.35 })
    pdf.save('Sanjay_S_Cover_Letter.pdf')
  }

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 },
    )

    document.querySelectorAll('[data-reveal]').forEach((element) => {
      revealObserver.observe(element)
    })

    return () => revealObserver.disconnect()
  }, [])

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Sanjay home" onClick={() => setMenuOpen(false)}>
          <span>SS</span><strong>Sanjay S</strong>
        </a>
        <div className={`nav-links${menuOpen ? ' is-open' : ''}`} id="main-menu">
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a className="mobile-nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Contact <ArrowIcon /></a>
        </div>
        <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>
          Let's talk <ArrowIcon />
        </a>
        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          <span /><span />
        </button>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span /> OPEN TO SOFTWARE DEVELOPER & AWS ROLES</p>
          <h1>I build React apps.<br /><em>Then ship them on AWS.</em></h1>
          <p className="intro">
            I’m Sanjay, a software developer at Dikshi Technologies. I work across
            React, React Native and AWS, from building app features to getting them
            deployed. I’m now looking for my next software developer opportunity.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">
              View my work <ArrowIcon />
            </a>
            <a className="text-button" href={resumePdf} download="Sanjay_S_Resume.pdf">
              Download CV ↓
            </a>
          </div>
          <div className="hero-proof" aria-label="Career highlights">
            <div><strong>2.8</strong><span>years of experience</span></div>
            <div><strong>5</strong><span>apps delivered</span></div>
            <div><strong>2</strong><span>web projects</span></div>
            <div><strong>MCA</strong><span>in progress · 2027</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="portrait-backdrop" />
          <div className="portrait-frame">
            <img src={heroImage} alt="Sanjay S" />
          </div>
          <div className="portrait-caption">
            <span>REACT · REACT NATIVE · AWS</span>
            <strong>Sanjay S</strong>
            <span>SOFTWARE DEVELOPER · CHENNAI</span>
          </div>
        </div>
      </section>

      <section className="ticker" aria-label="Specialties">
        <div className="ticker-track">
          <div>
          <span>WEB</span>
          <b>✳</b>
          <span>MOBILE</span>
          <b>✳</b>
          <span>AWS</span>
          <b>✳</b>
          <span>HOSTING</span>
          <b>✳</b>
          <span>DEPLOYMENT</span>
          <b>✳</b>
          </div>
          <div aria-hidden="true">
            <span>WEB</span><b>✳</b><span>MOBILE</span><b>✳</b>
            <span>AWS</span><b>✳</b><span>HOSTING</span><b>✳</b><span>DEPLOYMENT</span><b>✳</b>
          </div>
        </div>
      </section>

      <section className="about-section" id="about" data-reveal>
        <div className="section-label"><span>01 / ABOUT</span></div>
        <div className="about-content">
          <h2>A little about me.</h2>
          <p>
            I’m a React and React Native developer based in Chennai. I build web
            and mobile applications, connect them to APIs, and integrate AWS
            services to support deployment and day-to-day use. I also deploy
            apps to the Google Play Store and Apple App Store, and host websites
            on local servers.
          </p>
          <p>
            I also help maintain and improve the applications after release,
            fixing issues and adding features as needs change.
          </p>
          <a className="inline-link" href="#contact">CONTACT <span>↘</span></a>
        </div>
        <div className="about-side">
          <div className="side-mark">✳</div>
          <p>LOCATION<br /><strong>CHENNAI, INDIA</strong></p>
          <p>WORKING ON<br /><strong>APPS & AWS</strong></p>
        </div>
      </section>

      <section className="experience-section" data-reveal>
        <div className="section-label"><span>02 / EXPERIENCE</span></div>
        <article className="role">
          <div className="role-date">Mar 2024 — Nov 2026</div>
          <div className="role-main">
            <h3>Software Developer</h3>
            <p className="company">Dikshi Technologies · Chennai</p>
            <p>
              Building web and mobile applications with React and React Native,
              integrating AWS services, deploying apps to the Google Play Store
              and Apple App Store, and hosting websites on local servers.
            </p>
          </div>
          <div className="role-tags">
            <span>AWS</span><span>CI/CD</span><span>LINUX</span>
          </div>
        </article>
      </section>

      <section className="education-section" data-reveal>
        <div className="section-label"><span>03 / EDUCATION</span></div>
        <div className="education-list">
          <article className="education-item">
            <div className="education-year">2025 — 2027</div>
            <div>
              <h3>Master of Computer Applications</h3>
              <p>Madras University · Chennai</p>
            </div>
          </article>
          <article className="education-item">
            <div className="education-year">2020 — 2023</div>
            <div>
              <h3>Bachelor of Computer Applications</h3>
              <p>Salem Sowdeswari College · Salem</p>
            </div>
          </article>
        </div>
      </section>

      <section className="certifications-section" data-reveal>
        <div className="section-label"><span>04 / COURSES &amp; CERTIFICATIONS</span></div>
        <article className="certification-card">
          <div className="certification-mark" aria-hidden="true">✓</div>
          <div className="certification-details">
            <h3>AWS with DevOps Course</h3>
            <p>Immek Academy · Mar — Sep 2026</p>
          </div>
          <span className="completion-status">Completed</span>
        </article>
      </section>

      <section className="projects-section" id="work" data-reveal>
        <div className="projects-heading">
          <div className="section-label"><span>05 / SELECTED WORK</span></div>
          <h2>Some work I’ve built.</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card${project.previewType === 'desktop' ? ' desktop-project-card' : ''}`} key={project.number}>
              <div className="project-info">
                <div className="project-number">PROJECT {project.number}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="project-links">
                  {project.playStoreUrl && (
                    <a className="project-link" href={project.playStoreUrl} target="_blank" rel="noreferrer">
                      Google Play <ArrowIcon />
                    </a>
                  )}
                  {project.appStoreUrl && (
                    <a className="project-link" href={project.appStoreUrl} target="_blank" rel="noreferrer">
                      App Store <ArrowIcon />
                    </a>
                  )}
                </div>
              </div>
              <div className={`project-preview${project.previewType === 'desktop' ? ' desktop-project-preview' : ''}`} aria-label={`${project.title} screenshots`}>
                {project.previewType === 'desktop' ? (
                  <div className="desktop-screen-frame">
                    <img src={project.screens[0].src} alt={project.screens[0].alt} loading="lazy" />
                  </div>
                ) : (
                  <div className="device-stack">
                    {project.screens.map((screen, index) => (
                      <div className={`device-frame device-${index + 1}`} key={screen.src}>
                        <img src={screen.src} alt={screen.alt} loading="lazy" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="skills-section" id="skills" data-reveal>
        <div className="section-label light"><span>06 / SKILLS</span></div>
        <h2>Skills &amp; technologies.</h2>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article key={skill.title}>
              <h3>{skill.title}</h3>
              <ul>
                {skill.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact" data-reveal>
        <div>
          <p>Want to talk?</p>
          <h2>Have a role or project?<br />Send me a message.</h2>
        </div>
        <div className="footer-actions">
          <a className="contact-button" href="mailto:sanjayshanmugam324@gmail.com">
            Email Sanjay <ArrowIcon />
          </a>
          <a className="document-button" href={resumePdf} download="Sanjay_S_Resume.pdf">
            Download CV ↓
          </a>
          <button className="document-button" type="button" onClick={() => setShowCoverLetter(true)}>
            View Cover Letter
          </button>
        </div>
        <div className="footer-bottom">
          <strong>SANJAY S</strong>
          <div>
            <a href="mailto:sanjayshanmugam324@gmail.com">Email</a>
            <a href="tel:+918754603732">Phone</a>
            <a href="https://www.linkedin.com/in/sanjayshanmugam47" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="https://github.com/sanjayshanmugam-7" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <span>© 2026 · Chennai, India</span>
        </div>
      </footer>

      {showCoverLetter && (
        <div className="cover-modal" role="dialog" aria-modal="true" aria-labelledby="cover-title">
          <div className="cover-modal-backdrop" onClick={() => setShowCoverLetter(false)} />
          <article className="cover-document">
            <button className="cover-close" type="button" onClick={() => setShowCoverLetter(false)} aria-label="Close cover letter">×</button>
            <p className="cover-name" id="cover-title">Sanjay S</p>
            <p className="cover-contact">+91 87546 03732 · sanjayshanmugam324@gmail.com · Chennai</p>
            <p>Dear Hiring Manager,</p>
            <p>I am writing to apply for a Software Developer or React / React Native position in your organization. I have hands-on experience developing mobile and web applications, integrating AWS, and deploying apps to the Google Play Store and Apple App Store.</p>
            <p>Currently, I work at Dikshi Technologies in Chennai, where I develop React and React Native applications and support AWS infrastructure. My experience includes REST API integration, responsive interfaces, AWS services, local-server website hosting, and mobile app releases.</p>
            <p>I am comfortable working closely with product and operations teams to understand requirements, implement useful features, troubleshoot issues and deliver maintainable solutions.</p>
            <p>Thank you for your time and consideration.</p>
            <p>Sincerely,<br /><strong>Sanjay S</strong></p>
            <button className="document-button cover-download" type="button" onClick={downloadCoverLetter}>Download PDF ↓</button>
          </article>
        </div>
      )}
    </main>
  )
}

export default App
