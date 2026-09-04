import { useState } from 'react'
import {
  Bell,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Clock3,
  Flame,
  Home,
  Inbox,
  LayoutGrid,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Plus,
  Search,
  Share2,
  Sparkles,
  TrendingUp,
  X,
} from 'lucide-react'

const posts = [
  {
    id: 1,
    community: 'r/InternetIsBeautiful',
    author: 'u/quietlycurious',
    time: '4 hr. ago',
    title: 'I made a tiny website that turns any photo into a color palette',
    text: 'A little weekend project for the color-obsessed. Drop in an image and save the palette as CSS variables.',
    category: 'design',
    votes: '12.8k',
    comments: 428,
    accent: 'coral',
    visual: 'palette',
  },
  {
    id: 2,
    community: 'r/Books',
    author: 'u/midnightreader',
    time: '2 hr. ago',
    title: 'What book completely changed the way you see an ordinary thing?',
    text: 'Looking for the kind of recommendation that makes you pause on a walk and look at the world differently.',
    category: 'books',
    votes: '8.4k',
    comments: 1.2e3,
    accent: 'blue',
    visual: 'book',
  },
  {
    id: 3,
    community: 'r/MealPrepSunday',
    author: 'u/weekdaychef',
    time: '7 hr. ago',
    title: 'My 5-ingredient lunches for the week (and the sauce that makes them work)',
    text: 'Everything takes under 30 minutes and keeps well. The roasted lemon tahini sauce is doing most of the heavy lifting.',
    category: 'food',
    votes: '6.1k',
    comments: 286,
    accent: 'mustard',
    visual: 'food',
  },
]

const communities = [
  ['r/InternetIsBeautiful', 'IB', 'coral'],
  ['r/Books', 'B', 'blue'],
  ['r/MealPrepSunday', 'M', 'mustard'],
  ['r/Design', 'D', 'lavender'],
]

function formatComments(value) {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value
}

function PostVisual({ type }) {
  if (type === 'palette') {
    return <div className="visual visual-palette"><div /><div /><div /><div /><div /><span>make something<br /><strong>beautiful</strong></span></div>
  }
  if (type === 'book') {
    return <div className="visual visual-book"><div className="book-shape"><span>THE<br />LITTLE<br />THINGS</span></div><div className="book-shadow" /></div>
  }
  return <div className="visual visual-food"><div className="plate"><i /><i /><i /><i /><i /><i /></div><span>lunch<br /><strong>rituals</strong></span></div>
}

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [sort, setSort] = useState('Best')
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState([])
  const [votes, setVotes] = useState({})
  const [search, setSearch] = useState('')
  const [showComposer, setShowComposer] = useState(false)

  const filteredPosts = posts.filter((post) => {
    const query = search.toLowerCase()
    return !query || post.title.toLowerCase().includes(query) || post.community.toLowerCase().includes(query)
  })

  const toggleVote = (id, direction) => {
    setVotes((current) => ({ ...current, [id]: current[id] === direction ? null : direction }))
  }

  const toggleSave = (id) => {
    setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button>
        <a className="brand" href="#top" onClick={() => setActiveTab('Home')}><span className="brand-mark">r</span><span>reddish</span></a>
        <div className="search-wrap">
          <Search size={18} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search Reddit" aria-label="Search Reddit" />
          {search && <button className="clear-search" onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}
          <kbd>⌘ K</kbd>
        </div>
        <div className="top-actions">
          <button className="icon-btn" aria-label="Notifications"><Bell size={19} /></button>
          <button className="icon-btn" aria-label="Messages"><Inbox size={19} /></button>
          <button className="profile" aria-label="Open profile"><span>MC</span><ChevronDown size={14} /></button>
        </div>
      </header>

      <div className="layout" id="top">
        <aside className="sidebar">
          <nav className="primary-nav" aria-label="Primary navigation">
            {[['Home', Home], ['Popular', Flame], ['Explore', LayoutGrid], ['Latest', Clock3]].map(([label, Icon]) => (
              <button key={label} className={activeTab === label ? 'nav-item active' : 'nav-item'} onClick={() => setActiveTab(label)}><Icon size={18} /><span>{label}</span>{label === 'Home' && <span className="active-dot" />}</button>
            ))}
          </nav>
          <div className="side-section">
            <div className="side-label"><span>Your communities</span><button aria-label="Add community"><Plus size={15} /></button></div>
            {communities.map(([name, initials, color]) => <button className="community-item" key={name} onClick={() => setSearch(name)}><span className={`community-avatar ${color}`}>{initials}</span><span>{name}</span></button>)}
            <button className="see-all">See all <span>→</span></button>
          </div>
          <div className="sidebar-footer"><button><Sparkles size={15} /> Get premium</button><p>© 2024 Reddish<br />A calmer way to browse.</p></div>
        </aside>

        <main className="main-content">
          <section className="welcome-row">
            <div><p className="eyebrow">{activeTab === 'Home' ? 'Friday, October 18' : activeTab}</p><h1>{activeTab === 'Home' ? 'Good afternoon, Maya.' : `${activeTab} feed`}</h1><p className="subheading">Here’s what’s happening in your corner of the internet.</p></div>
            <button className="compose-btn" onClick={() => setShowComposer(true)}><Plus size={17} /> Create post</button>
          </section>

          <div className="feed-controls">
            <div className="tabs"><button className="tab active">For you</button><button className="tab">Following</button></div>
            <div className="sort-wrap"><TrendingUp size={15} /><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort posts"><option>Best</option><option>Hot</option><option>New</option><option>Top</option></select><ChevronDown size={14} /></div>
          </div>

          <section className="feed" aria-label="Reddit feed">
            {filteredPosts.length ? filteredPosts.map((post) => <article className="post-card" key={post.id}>
              <div className="post-vote"><button className={votes[post.id] === 'up' ? 'vote active-up' : 'vote'} onClick={() => toggleVote(post.id, 'up')} aria-label="Upvote"><ChevronUp size={19} /></button><strong>{post.votes}</strong><button className={votes[post.id] === 'down' ? 'vote active-down' : 'vote'} onClick={() => toggleVote(post.id, 'down')} aria-label="Downvote"><ChevronDown size={19} /></button></div>
              <div className="post-body"><div className="post-meta"><span className={`community-avatar mini ${post.accent}`}>{post.community.slice(2, 3).toUpperCase()}</span><strong>{post.community}</strong><span>·</span><span>Posted by {post.author}</span><span>·</span><span>{post.time}</span></div><h2>{post.title}</h2><p>{post.text}</p><div className="post-actions"><button><MessageCircle size={16} /> {formatComments(post.comments)} comments</button><button onClick={() => toggleSave(post.id)} className={saved.includes(post.id) ? 'saved' : ''}><Bookmark size={16} fill={saved.includes(post.id) ? 'currentColor' : 'none'} /> {saved.includes(post.id) ? 'Saved' : 'Save'}</button><button><Share2 size={16} /> Share</button><button className="more-btn" aria-label="More options"><MoreHorizontal size={17} /></button></div></div><PostVisual type={post.visual} /></article>) : <div className="empty-state"><Search size={25} /><h2>No posts found</h2><p>Try a different search term.</p></div>}
          </section>
          <div className="feed-end"><span>✦</span><p>You’re all caught up</p><span>✦</span></div>
        </main>

        <aside className="right-rail">
          <section className="trend-panel"><div className="panel-heading"><h3>Trending today</h3><button onClick={() => setMenuOpen(!menuOpen)} aria-label="More trending options"><MoreHorizontal size={18} /></button></div>{menuOpen && <div className="floating-menu"><button>Mute trends</button><button>Customize feed</button></div>}<div className="trend-item"><span>01</span><div><strong>r/AskReddit</strong><p>What small luxury is worth every penny?</p><small><TrendingUp size={12} /> 18.2k upvotes</small></div></div><div className="trend-item"><span>02</span><div><strong>r/technology</strong><p>The future of personal computing feels very close</p><small><TrendingUp size={12} /> 9.8k upvotes</small></div></div><div className="trend-item"><span>03</span><div><strong>r/CozyPlaces</strong><p>My reading nook after 3 years of collecting things</p><small><TrendingUp size={12} /> 7.4k upvotes</small></div></div><button className="view-trends">View all trends <span>→</span></button></section>
          <section className="join-panel"><div className="join-art"><div className="sun" /><div className="hill hill-one" /><div className="hill hill-two" /><div className="tiny-house" /></div><div className="join-copy"><p className="eyebrow">Make it yours</p><h3>Find your people.</h3><p>Join communities that make the internet feel a little more like home.</p><button onClick={() => setActiveTab('Explore')}>Explore communities <span>→</span></button></div></section>
        </aside>
      </div>

      {showComposer && <div className="modal-backdrop" onClick={() => setShowComposer(false)}><div className="composer-modal" onClick={(event) => event.stopPropagation()}><div className="modal-header"><h2>Create a post</h2><button onClick={() => setShowComposer(false)} aria-label="Close"><X size={19} /></button></div><label>Community<select><option>r/InternetIsBeautiful</option><option>r/Books</option><option>r/Design</option></select></label><label>Title<input placeholder="Give your post a title" autoFocus /></label><label>Body<textarea placeholder="What's on your mind?" rows="5" /></label><div className="modal-actions"><button className="cancel-btn" onClick={() => setShowComposer(false)}>Cancel</button><button className="publish-btn" onClick={() => setShowComposer(false)}>Publish post</button></div></div></div>}
    </div>
  )
}

export default App
