import Link from "next/link";

const links=[["Work","/work"],["Systems","/systems"],["Thinking","/thinking"],["Lab","/lab"],["Experience","/experience"],["About","/about"],["Resume","/resume"],["Contact","/contact"]];
export default function Search(){return <main className="page"><p className="eyebrow">SEARCH / INDEX</p><h1 className="display">Find the <i>signal.</i></h1><p className="lead">Use this index to move directly to the major evidence surfaces of the portfolio.</p><div className="project-grid">{links.map(([name,href])=><Link className="project-card" href={href} key={href}><span>ROUTE</span><h2>{name}</h2><b>OPEN ↗</b></Link>)}</div></main>}
