"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./evidence.module.css";

type Repo = { name:string; html_url:string; description:string|null; language:string|null; stargazers_count:number; forks_count:number; updated_at:string };
type HubItem = { id:string; likes?:number; downloads?:number; pipeline_tag?:string; sdk?:string };

const ecosystem = [
  ["LangGraph","Stateful agent orchestration","https://github.com/langchain-ai/langgraph"],
  ["LlamaIndex","Context and knowledge applications","https://github.com/run-llama/llama_index"],
  ["Qdrant","Vector search and retrieval","https://github.com/qdrant/qdrant"],
  ["Docling","Document understanding and parsing","https://github.com/docling-project/docling"],
  ["Model Context Protocol","Tool and context interoperability","https://github.com/modelcontextprotocol"],
  ["n8n","Workflow automation and integrations","https://github.com/n8n-io/n8n"],
  ["FastAPI","Python API infrastructure","https://github.com/fastapi/fastapi"],
  ["Playwright","Browser automation and testing","https://github.com/microsoft/playwright"],
];

const featured = new Set(["AdaptiveRag-X","Self-Healing-DevOps-Agent","Agent-Authority","RepoForge-Omega","Mustafa-Portfolio"]);

export default function EvidencePage(){
  const [repos,setRepos]=useState<Repo[]>([]);
  const [models,setModels]=useState<HubItem[]>([]);
  const [spaces,setSpaces]=useState<HubItem[]>([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    Promise.all([
      fetch("https://api.github.com/users/MustafaAhmed007/repos?per_page=100&sort=updated").then(r=>r.ok?r.json():[]).catch(()=>[]),
      fetch("https://huggingface.co/api/models?author=MustafaAhmed007&limit=8&sort=lastModified&direction=-1").then(r=>r.ok?r.json():[]).catch(()=>[]),
      fetch("https://huggingface.co/api/spaces?author=MustafaAhmed007&limit=8&sort=lastModified&direction=-1").then(r=>r.ok?r.json():[]).catch(()=>[])
    ]).then(([github,hfModels,hfSpaces])=>{
      setRepos(github.filter((r:Repo)=>!r.name.startsWith(".")));
      setModels(hfModels);
      setSpaces(hfSpaces);
      setLoading(false);
    });
  },[]);

  const visibleRepos=repos.filter(r=>featured.has(r.name)||r.stargazers_count>0);

  return <main className={styles.page}>
    <nav className={styles.nav}>
      <Link href="/" className={styles.brand}>MUSTAFA AHMED</Link>
      <div>
        <Link href="/">Portfolio</Link>
        <a href="https://github.com/MustafaAhmed007" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://huggingface.co/MustafaAhmed007" target="_blank" rel="noreferrer">Hugging Face</a>
        <a href="https://www.linkedin.com/in/mustafa-ahmed-engineer" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </nav>

    <header className={styles.hero}>
      <p className={styles.eyebrow}>05 / EVIDENCE GRAPH</p>
      <h1>Proof over <em>promises.</em></h1>
      <p>A live engineering index connecting my portfolio to public repositories, AI experiments, models, demos and the open-source ecosystem behind the systems I build.</p>
      <div className={styles.actions}>
        <a className={styles.primary} href="https://github.com/MustafaAhmed007" target="_blank" rel="noreferrer">Open GitHub ↗</a>
        <a className={styles.secondary} href="https://huggingface.co/MustafaAhmed007" target="_blank" rel="noreferrer">Open Hugging Face ↗</a>
      </div>
    </header>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div><p className={styles.eyebrow}>01 / GITHUB</p><h2>Repository <em>evidence.</em></h2></div>
        <p>Public repository metadata is pulled from GitHub, so the portfolio does not become stale every time a project changes.</p>
      </div>
      <div className={styles.repoGrid}>
        {visibleRepos.map(repo=><a className={styles.repoCard} href={repo.html_url} target="_blank" rel="noreferrer" key={repo.name}>
          <span className={styles.repoMeta}>{repo.language||"SYSTEM"} · ★ {repo.stargazers_count} · FORK {repo.forks_count}</span>
          <h3>{repo.name}</h3><p>{repo.description||"Repository-backed engineering work."}</p><span className={styles.link}>VIEW REPOSITORY ↗</span>
        </a>)}
      </div>
      {!loading&&visibleRepos.length===0&&<p className={styles.empty}>Public repository data is temporarily unavailable. The GitHub profile remains the canonical source.</p>}
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div><p className={styles.eyebrow}>02 / HUGGING FACE</p><h2>Model <em>lab.</em></h2></div>
        <p>Models and Spaces are shown only when they actually exist on my Hugging Face account. No fabricated model claims.</p>
      </div>
      <div className={styles.hfGrid}>
        {models.length>0?models.map(item=><a className={styles.hfCard} href={"https://huggingface.co/"+item.id} target="_blank" rel="noreferrer" key={item.id}>
          <span>MODEL</span><h3>{item.id}</h3><p>{item.pipeline_tag||"Machine learning model"}</p><small>♥ {item.likes||0} · ↓ {item.downloads||0}</small>
        </a>):<div className={styles.emptyCard}><span>MODEL LAB</span><h3>No public models yet.</h3><p>The account is connected to Hugging Face. When a public model is published, this section will surface it automatically.</p></div>}
        {spaces.length>0?spaces.map(item=><a className={styles.hfCard} href={"https://huggingface.co/spaces/"+item.id} target="_blank" rel="noreferrer" key={item.id}>
          <span>SPACE</span><h3>{item.id}</h3><p>{item.sdk||"Interactive AI demo"}</p><small>♥ {item.likes||0}</small>
        </a>):<a className={styles.emptyCard} href="https://huggingface.co/MustafaAhmed007" target="_blank" rel="noreferrer">
          <span>HUGGING FACE</span><h3>Build the demo layer.</h3><p>Spaces can host interactive AI demonstrations and become live evidence attached to project case studies.</p>
        </a>}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.sectionHead}>
        <div><p className={styles.eyebrow}>03 / ENGINEERING ECOSYSTEM</p><h2>The systems <em>around</em> the systems.</h2></div>
        <p>These are external open-source projects I can build with or around. They are explicitly separated from my own work.</p>
      </div>
      <div className={styles.ecoGrid}>{ecosystem.map(([name,description,url])=><a href={url} target="_blank" rel="noreferrer" className={styles.ecoCard} key={name}><strong>{name}</strong><span>{description}</span><b>OFFICIAL REPOSITORY ↗</b></a>)}</div>
    </section>

    <section className={styles.architecture}>
      <p className={styles.eyebrow}>04 / ENGINEERING MODEL</p>
      <h2>Research → Architect → Build → Verify → Deploy → <em>Improve.</em></h2>
      <div className={styles.pipeline}>{["Research","Architecture","Implementation","Verification","Deployment","Feedback"].map((step,index)=><div key={step}><span>0{index+1}</span><strong>{step}</strong></div>)}</div>
    </section>

    <footer className={styles.footer}>
      <div><p className={styles.eyebrow}>OPEN FOR THE RIGHT PROBLEMS</p><h2>Let's build something<br/><em>useful.</em></h2></div>
      <div className={styles.footerLinks}>
        <a href="mailto:engrmustafa0007@gmail.com">engrmustafa0007@gmail.com</a>
        <a href="https://github.com/MustafaAhmed007" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/mustafa-ahmed-engineer" target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  </main>;
}
