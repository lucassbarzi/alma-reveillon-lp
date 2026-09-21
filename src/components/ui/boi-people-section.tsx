import { ArrowUpRight, Waves } from 'lucide-react'
import './boi-people-section.css'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// Verified publications only. Evidence: docs/boi-people-sources.json.
const posts = [
  {
    name: 'Sasha Meneghel',
    handle: 'sashameneghel',
    image: 'sasha-boipeba',
    alt: 'Foto do álbum de Sasha Meneghel em Boipeba, com João Figueiredo no mar.',
    url: 'https://www.instagram.com/p/Cnc3jTxpZSJ/',
    date: 'Janeiro de 2023',
    dateTime: '2023-01-15',
    width: 1059,
    height: 701,
  },
  {
    name: 'Fernanda Paes Leme',
    handle: 'fepaesleme',
    image: 'fernanda-boipeba',
    alt: 'Foto publicada por Fernanda Paes Leme, com uma amiga nas águas de Boipeba.',
    url: 'https://www.instagram.com/p/B63XEsxFlIv/',
    date: 'Janeiro de 2020',
    dateTime: '2020-01-03',
    width: 1279,
    height: 1279,
  },
] as const

export default function BoiPeopleSection() {
  return (
    <section className="boi-people-section boi-people-editorial" id="boi-people" aria-labelledby="boi-people-heading">
      <div className="boi-people-header">
        <div className="boi-people-badge"><Waves size={14} /><span>BOI PEOPLE · DIAS DE ILHA</span></div>
        <h2 className="boi-people-title" id="boi-people-heading">Aqui o luxo é outro.<em>Boipeba, por quem esteve aqui.</em></h2>
        <p className="boi-people-lead">O mar, os encontros e as memórias da ilha, nos álbuns de quem passou por Boipeba.</p>
      </div>
      <div className="boi-people-photo-grid">
        {posts.map(post => (
          <figure className="boi-people-photo" key={post.handle}>
            <a className="boi-people-photo-link" href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`Ver publicação de ${post.name} no Instagram (abre em nova aba)`}>
              <img src={asset(`/media/boi-people/${post.image}.webp`)} alt={post.alt} width={post.width} height={post.height} loading="lazy" decoding="async" />
              <span className="boi-people-photo-open"><ArrowUpRight size={20} /></span>
            </a>
            <figcaption>
              <div className="boi-people-photo-heading"><h3>{post.name}</h3><time dateTime={post.dateTime}>{post.date}</time></div>
              <p>Foto: reprodução / @{post.handle}</p>
              <a className="boi-people-original" href={post.url} target="_blank" rel="noopener noreferrer">Ver publicação original <ArrowUpRight size={15} /></a>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="boi-people-footer-link"><a href="/experiencia">Conheça a ilha <ArrowUpRight size={17} /></a></div>
    </section>
  )
}
