"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Linkedin, Menu, X, Youtube } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const primaryProjects = [
  {
    id: "01",
    name: "AdaptiveRAG-X",
    kind: "adaptive retrieval / RAG",
    image: "https://portfolio-leeshark.vercel.app/assets/photo-1611162617474-5b21e879e113",
    description:
      "An adaptive retrieval architecture that profiles queries, routes them to different evidence strategies, evaluates evidence and uses bounded recovery before grounded generation.",
    href: "https://github.com/MustafaAhmed007/AdaptiveRag-X",
    slug: "adaptiverag-x",
  },
  {
    id: "02",
    name: "Self-Healing DevOps Agent",
    kind: "agentic / devops",
    image: "https://portfolio-leeshark.vercel.app/assets/photo-1573164713988-8665fc963095",
    description:
      "A bounded engineering workflow that moves from issue reproduction through research, diagnosis, constrained patching, security checks and verification before producing evidence and a pull request.",
    href: "https://github.com/MustafaAhmed007/Self-Healing-DevOps-Agent",
    slug: "self-healing-devops-agent",
  },
  {
    id: "03",
    name: "LinkedIn Revenue Intelligence OS",
    kind: "automation / intelligence",
    image: "https://portfolio-leeshark.vercel.app/assets/photo-1587831990711-23ca6441447b",
    description:
      "An operating system connecting audience research, content intelligence, experiments, distribution, attribution and revenue learning into one repeatable feedback loop.",
    href: "https://github.com/MustafaAhmed007/LinkedIn-Revenue-Intelligence-OS",
    slug: "linkedin-revenue-intelligence-os",
  },
  {
    id: "04",
    name: "Website Experience OS",
    kind: "experience / engineering",
    image: "https://portfolio-leeshark.vercel.app/assets/photo-1518770660439-4636190af475",
    description:
      "A system-oriented framework for premium digital experiences built around reusable visual language, interaction patterns, content structure and maintainable implementation.",
    href: "https://github.com/MustafaAhmed007/Website_Experience_OS",
    slug: "website-experience-os",
  },
  {
    id: "05",
    name: "YouTube Intelligence OS",
    kind: "research / intelligence",
    image: "https://portfolio-leeshark.vercel.app/assets/photo-1573164713988-8665fc963095",
    description:
      "An evidence-first research workflow that turns questions into auditable intelligence packages through multi-angle planning, source discovery, transcript acquisition, validation and synthesis.",
    href: "https://github.com/MustafaAhmed007/YouTube_Intelligence_OS",
    slug: "youtube-intelligence-os",
  },
  {
    id: "06",
    name: "Agent Authority",
    kind: "agent access / governance",
    image: "https://portfolio-leeshark.vercel.app/assets/photo-1518770660439-4636190af475",
    description:
      "A verification layer focused on testing what AI agents can actually access and do, separating declared capability from observed authority and evidence.",
    href: "https://github.com/MustafaAhmed007/Agent-Authority",
    slug: "agent-authority",
  },
];

const services = [
  {
    id: "01",
    title: "AI SYSTEMS & LLM APPLICATIONS",
    description:
      "I design and build production-oriented AI applications around LLMs, agents, retrieval, evaluation and tool execution — turning model capabilities into usable systems.",
    capabilities: ["LLM Applications", "Agent Architecture", "RAG Pipelines", "Evaluation", "Tool Calling"],
  },
  {
    id: "02",
    title: "AGENTIC AI & ORCHESTRATION",
    description:
      "I build bounded multi-step workflows where specialized agents plan, execute, verify and hand work forward without treating autonomous generation as a substitute for engineering controls.",
    capabilities: ["Multi-Agent Systems", "LangGraph", "Workflow State", "Tool Use", "Verification"],
  },
  {
    id: "03",
    title: "RAG & KNOWLEDGE SYSTEMS",
    description:
      "I build retrieval systems that adapt to query complexity, preserve evidence and make grounded generation more reliable.",
    capabilities: ["Adaptive Retrieval", "Semantic Search", "Evidence Evaluation", "Reranking", "Knowledge Pipelines"],
  },
  {
    id: "04",
    title: "AUTOMATION & API ENGINEERING",
    description:
      "I connect AI, APIs, data and workflow automation into operational systems that remove repetitive work and create measurable execution loops.",
    capabilities: ["Python", "FastAPI", "n8n", "REST APIs", "Workflow Automation"],
  },
  {
    id: "05",
    title: "FULL-STACK & EXPERIENCE ENGINEERING",
    description:
      "I build responsive digital products with a strong emphasis on interaction, maintainability, performance, accessibility and clear product storytelling.",
    capabilities: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GSAP"],
  },
  {
    id: "06",
    title: "DEVOPS, QA & REPOSITORY ENGINEERING",
    description:
      "I treat repositories as living systems: discover the architecture, repair defects, verify behavior, document decisions and gate releases with evidence.",
    capabilities: ["Git & GitHub", "CI/CD", "Testing", "Security", "Self-Healing Workflows"],
  },
];

const stacks = {
  frontend: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS", "GSAP", "Responsive UI"],
  backend: ["Python", "FastAPI", "REST APIs", "PostgreSQL", "Redis", "SQLite"],
  ai: ["OpenAI", "Claude", "DeepSeek", "Qwen", "LangChain", "LangGraph", "MCP", "RAG", "Agentic AI"],
  tools: ["Git", "GitHub", "Docker", "n8n", "Make", "Vercel", "CI/CD", "Prompt Engineering"],
};

export function HomeExperience() {
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const [heroWord, setHeroWord] = useState("MUSTAFA");
  const heroTitle = useRef<HTMLDivElement>(null);
  const heroImage = useRef<HTMLDivElement>(null);
  const heroSubtitle = useRef<HTMLParagraphElement>(null);
  const heroContact = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const title = heroTitle.current;
    const image = heroImage.current;
    const subtitle = heroSubtitle.current;
    const contact = heroContact.current;

    if (!title || !image || !subtitle || !contact) return;

    const sourceImage = new window.Image();
    sourceImage.src = "/images/mustafa-hero.webp";

    let intervalId: number | undefined;
    let timeoutId: number | undefined;
    let cancelled = false;
    let progress = 0;

    const preload = new Promise<void>((resolve) => {
      if (sourceImage.complete) resolve();
      else {
        sourceImage.onload = () => resolve();
        sourceImage.onerror = () => resolve();
      }
    });

    const minimumDelay = new Promise<void>((resolve) => {
      timeoutId = window.setTimeout(resolve, 1000);
    });

    Promise.all([preload, minimumDelay]).then(() => {
      if (cancelled) return;

      intervalId = window.setInterval(() => {
        const step = Math.min(Math.floor(progress), 9);
        const target = "PORTFOLIO";
        const source = "MUSTAFA";
        setHeroWord(target
          .split("")
          .map((character, index) => index < step ? character : source[index] ?? character)
          .join(""));

        if (progress >= 9) {
          if (intervalId) window.clearInterval(intervalId);

          const timeline = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = "auto";
              setLoading(false);
            },
          });

          const mobile = window.innerWidth < 768;

          timeline.to(title, {
            top: mobile ? "20%" : "45%",
            duration: 1.5,
            ease: "power3.inOut",
          }, "+=0.2");

          timeline.fromTo(
            [subtitle, contact],
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" },
            "-=1.0",
          );

          timeline.fromTo(
            image,
            { y: "100vh" },
            { y: 0, duration: 1.5, ease: "power3.out" },
            "-=1.2",
          );
        }

        progress += 1 / 3;
      }, 50);
    });

    return () => {
      cancelled = true;
      document.body.style.overflow = "auto";
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let previousScroll = window.scrollY;

    const showOrHideNav = () => {
      if (!nav.current) return;
      if (window.scrollY > previousScroll && window.scrollY > 50) {
        nav.current.classList.add("nav-hidden");
      } else {
        nav.current.classList.remove("nav-hidden");
      }
      previousScroll = window.scrollY;
    };

    const initialTimer = window.setTimeout(() => {
      nav.current?.classList.remove("nav-hidden");
    }, 100);

    window.addEventListener("scroll", showOrHideNav);

    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener("scroll", showOrHideNav);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const aboutHeadings = gsap.utils.toArray<HTMLElement>(".about-heading");
      aboutHeadings.forEach((element) => {
        gsap.fromTo(
          element,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const intro = document.querySelector(".intro-copy");
      if (intro) {
        const words = intro.querySelectorAll(".intro-word");
        gsap.fromTo(
          words,
          { color: "#52525b", opacity: 0.2 },
          {
            color: "#ffffff",
            opacity: 1,
            stagger: 0.1,
            scrollTrigger: {
              trigger: intro,
              start: "top 85%",
              end: "bottom 50%",
              scrub: true,
            },
          },
        );
      }

      const serviceHeading = document.querySelector(".service-heading");
      if (serviceHeading) {
        gsap.fromTo(
          serviceHeading,
          { y: -100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: serviceHeading,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const jump = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Portfolio inquiry"));
    const body = encodeURIComponent(
      `Name: ${data.get("name") || ""}
Email: ${data.get("email") || ""}
Phone: ${data.get("phone") || ""}

${data.get("message") || ""}`,
    );
    window.location.href = `mailto:engrmustafa0007@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="portfolio-shell">
      <nav ref={nav} className={`site-nav ${loading ? "nav-hidden" : ""} ${mobileOpen ? "nav-menu-open" : ""}`} aria-label="Primary navigation">
        <button className="brand" onClick={() => jump("home")}>MUSTAFA AHMED</button>
        <div className="desktop-nav">
          <button onClick={() => jump("home")}>Home</button>
          <button onClick={() => jump("about")}>About</button>
          <button onClick={() => jump("service")}>Service</button>
          <button onClick={() => jump("project")}>Project</button>
          <button onClick={() => jump("contact")}>Contact</button>
        </div>
        <button className="mobile-menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? "mobile-menu-open" : ""}`} aria-hidden={!mobileOpen}>
        <div>
          {["home", "about", "service", "project", "contact"].map((id, index) => (
            <button
              key={id}
              className="mobile-menu-link"
              style={{ transitionDelay: mobileOpen ? `${index * 100}ms` : "0ms" }}
              onClick={() => jump(id)}
            >
              {id}
            </button>
          ))}
        </div>
      </div>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-overlay" />
          <div ref={heroTitle} className="hero-title">
            <h1>{heroWord}</h1>
            <p ref={heroSubtitle}><strong>AI Systems</strong> <em>Designer</em></p>
            <div ref={heroContact} className="hero-contact">
              <button onClick={() => jump("contact")} aria-label="Contact Mustafa">
                <ArrowUpRight size={15} />
              </button>
              <button onClick={() => jump("contact")}>Contact</button>
            </div>
          </div>
          <div ref={heroImage} className="hero-image-stage">
            <img className="hero-person" src="/images/mustafa-hero.webp" alt="Mustafa Ahmed in a black suit" />
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="section-inner about-inner">
            <h2 className="mobile-section-word about-heading">Intro</h2>
            <div className="about-grid">
              <div className="about-portrait reveal">
                <img
                  src="/images/mustafa-about.webp"
                  alt="Mustafa Ahmed full-body portrait"
                  onError={(e) => { e.currentTarget.src = "/images/Mustafa Hero Section.jpg"; }}
                />
              </div>
              <div className="about-copy">
                <h2 className="desktop-section-word about-heading">Intro</h2>
                <div className="intro-card intro-copy">
                  <p>
                    {[
                      ["Hey,", ""], ["I'm", ""], ["Mustafa Ahmed.", "strong"], ["An", ""],
                      ["AI", ""], ["Automation", ""], ["Engineer", ""], ["and", ""],
                      ["Agentic AI", ""], ["Systems Designer", ""], ["who", ""], ["builds", ""],
                      ["production-oriented", ""], ["AI", ""], ["systems.", ""], ["My", ""],
                      ["work", ""], ["connects", ""], ["RAG,", "strong"], ["agents,", "strong"],
                      ["automation,", "strong"], ["APIs,", "strong"], ["data,", "strong"],
                      ["and", ""], ["full-stack", ""], ["engineering.", ""], ["I", ""],
                      ["also", ""], ["teach", ""], ["BCA", "strong"], ["students", "strong"],
                      ["and", ""], ["turn", ""], ["complex", ""], ["technical", ""],
                      ["ideas", ""], ["into", ""], ["clear", ""], ["systems", ""], ["and", ""],
                      ["learning", ""], ["experiences.", ""],
                    ].map(([text, variant], index) => (
                      <span key={index} className={`intro-word ${variant === "strong" ? "intro-strong" : ""}`}>{text} </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <StackMarquee />
        </section>

        <section id="service" className="service-section">
          <div className="section-heading service-heading">WHAT WE<br />CAN DO</div>
          <div className="service-list">
            {services.map((service, index) => {
              const open = activeService === index;
              return (
                <article
                  key={service.id}
                  className={`service-row ${open ? "service-open" : ""}`}
                  onMouseEnter={() => !open && setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  onClick={() => setActiveService(open ? null : index)}
                >
                  <div className="service-main">
                    <span className="service-number">{service.id}</span>
                    <div className="service-content">
                      <h3>{service.title}</h3>
                      <div className={`service-expand ${open ? "open" : ""}`}>
                        <div className="service-description">
                          <p>{service.description}</p>
                          <ul>{service.capabilities.map((item) => <li key={item}>■ {item}</li>)}</ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="service-arrow"><ArrowUpRight size={24} /></span>
                </article>
              );
            })}
          </div>
        </section>

        <section id="project" className="project-section">
          <div className="project-header">
            <h2 className="section-heading">Selected <em>work</em></h2>
            <div>
              <p className="project-intro">Systems, repositories and experiments built around practical AI engineering, automation, retrieval, agents and digital experiences.</p>
              <button className="lime-button" onClick={() => jump("contact")}>Read More <ArrowUpRight size={13} /></button>
            </div>
          </div>

          <div className="project-list">
            {primaryProjects.map((project, index) => (
              <article className={`project-row ${index % 2 ? "reverse" : ""}`} key={project.id}>
                <div className="project-image-wrap">
                  <img
                    src={project.image}
                    alt={project.name}
                    onError={(e) => { e.currentTarget.src = "/images/Mustafa Hero Section.jpg"; }}
                  />
                </div>
                <div className="project-copy">
                  <span className="project-number">{project.id}</span>
                  <h3>{project.name}</h3>
                  <span className="project-kind">{project.kind}</span>
                  <p>{project.description}</p>
                  <div className="project-actions">
                    <Link className="lime-button" href={`/work/${project.slug}`}>Explore <ArrowUpRight size={13} /></Link>
                    <a className="ghost-button" href={project.href} target="_blank" rel="noreferrer">GitHub <Github size={14} /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-bg" />
          <div className="contact-inner">
            <div className="contact-copy">
              <p className="eyebrow">GET IN TOUCH</p>
              <h2>Let's build<br /><em>something.</em></h2>
              <p className="contact-note">Open for AI engineering, automation, product engineering, research systems and technical collaborations.</p>
              <a className="contact-email" href="mailto:engrmustafa0007@gmail.com">engrmustafa0007@gmail.com</a>
              <p className="contact-phone">+91 8801 379 786</p>
              <div className="social-links">
                <a href="https://github.com/MustafaAhmed007" target="_blank" rel="noreferrer"><Github /></a>
                <a href="https://www.linkedin.com/in/mustafa-ahmed-030182173/" target="_blank" rel="noreferrer"><Linkedin /></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={submitContact}>
              <div className="form-row">
                <label>Your Name<input required name="name" placeholder="Your name" /></label>
                <label>Email address<input required type="email" name="email" placeholder="Your email address" /></label>
              </div>
              <div className="form-row">
                <label>Phone<input name="phone" placeholder="Your phone number" /></label>
                <label>Subject<input name="subject" placeholder="Subject" /></label>
              </div>
              <label>Message<textarea required name="message" placeholder="Write something...." rows={5} /></label>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="portfolio-footer">
        <div className="footer-art" />
        <div className="footer-overlay" />
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <p className="footer-muted">Connect with me</p>
              <a className="footer-email" href="mailto:engrmustafa0007@gmail.com">engrmustafa0007@gmail.com</a>
              <div className="footer-nav">
                <button onClick={() => jump("home")}>Home</button>
                <button onClick={() => jump("about")}>About</button>
                <button onClick={() => jump("service")}>Services</button>
                <button onClick={() => jump("project")}>Projects</button>
              </div>
            </div>
            <div className="footer-build">
              <h3>Let's build something</h3>
              <p>Open for AI engineering, automation and technical collaborations.</p>
              <button onClick={() => jump("contact")}>Get in touch</button>
            </div>
          </div>
          <div className="footer-social">
            <a href="https://github.com/MustafaAhmed007" target="_blank" rel="noreferrer">Github</a>
            <a href="https://www.linkedin.com/in/mustafa-ahmed-030182173/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:engrmustafa0007@gmail.com">Email</a>
            <a href="https://github.com/MustafaAhmed007" target="_blank" rel="noreferrer">Open Source</a>
          </div>
          <div className="footer-name">MUSTAFA AHMED</div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Mustafa Ahmed. All Rights Reserved.</p>
            <p>AI SYSTEMS · AUTOMATION · INTELLIGENCE</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StackMarquee() {
  const rows = [
    { items: stacks.frontend, reverse: false },
    { items: stacks.backend, reverse: true },
    { items: stacks.ai, reverse: false },
    { items: stacks.tools, reverse: true },
  ];

  return (
    <div className="stack-marquee">
      {rows.map((row, index) => (
        <div className="marquee-window" key={index}>
          <div className={`marquee-track ${row.reverse ? "reverse" : ""}`}>
            {[...row.items, ...row.items, ...row.items, ...row.items].map((item, i) => (
              <span key={`${item}-${i}`}>{item}<b>.</b></span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
