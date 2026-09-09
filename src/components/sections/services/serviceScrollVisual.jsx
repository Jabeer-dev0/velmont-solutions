import {
  AlertCircle,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Heart,
  Mail,
  MessageCircle,
  MessageSquare,
  MoreHorizontal,
  PhoneCall,
  PhoneOff,
  Search,
  Send,
  ShoppingBag,
  Star,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react';

const SOCIAL_AVATAR = '/images/social/avatar-brand.jpg';

const SOCIAL_FEED_POSTS = [
  {
    user: 'copperroomldn',
    location: 'Shoreditch, London',
    likes: '1,284',
    comments: '48',
    caption: 'Chef\u2019s table is back, six courses, matched wines. Link in bio to book.',
    time: '2 hours ago',
    image: '/images/social/post-chefs-table.jpg',
    alt: 'Fine dining spread with wine at The Copper Room',
    liked: true,
  },
  {
    user: 'copperroomldn',
    location: 'Open kitchen',
    likes: '892',
    comments: '31',
    caption: 'Behind the pass with @chef.marcus, scallops, fire, and full focus.',
    time: '5 hours ago',
    image: '/images/social/post-kitchen.jpg',
    alt: 'Chef plating dishes in the open kitchen',
  },
  {
    user: 'copperroomldn',
    location: 'Wine cellar',
    likes: '643',
    comments: '19',
    caption: 'New natural wine list drops Friday. First pour on us for regulars.',
    time: '1 day ago',
    image: '/images/social/post-wine.jpg',
    alt: 'Natural wine bottles in the cellar',
  },
  {
    user: 'copperroomldn',
    location: 'Dining room',
    likes: '2,041',
    comments: '112',
    caption: 'Sunday roast sold out by 1pm. Extra service next weekend, watch this space.',
    time: '2 days ago',
    image: '/images/social/post-roast.jpg',
    alt: 'Roasted meat and seasonal sides on a table',
  },
];

const DESIGN_LAYERS = [
  {
    label: 'Menu spread',
    image: '/images/design/menu-spread.jpg',
    alt: 'Restaurant menu layout design',
  },
  {
    label: 'Story frame',
    image: '/images/design/story-frame.jpg',
    alt: 'Social media story design mockup',
  },
  {
    label: 'Print promo',
    image: '/images/design/print-promo.jpg',
    alt: 'Printed restaurant promotion flyer',
  },
];

function VisWrap({ children, className = '', ...props }) {
  return (
    <div className={`sd-vis-wrap ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}

/** Per-service animated visual for the detail hero (right column). */
export function ServiceScrollVisual({ slug }) {
  switch (slug) {
    case 'call-handling':
      return (
        <VisWrap className="sd-vis--calls" data-vis="calls">
          <div className="sd-vis__calls-grid">
            <div className="sd-vis__calls-metric sd-vis__calls-metric--missed">
              <span className="sd-vis__calls-icon sd-vis__calls-icon--missed" aria-hidden="true">
                <PhoneOff size={22} strokeWidth={2} />
              </span>
              <span className="sd-vis__calls-label">Missed</span>
              <span className="sd-vis__calls-num" data-missed>12</span>
            </div>
            <div className="sd-vis__calls-bridge" aria-hidden="true">
              <svg className="sd-vis__calls-line" viewBox="0 0 200 24">
                <path
                  className="sd-vis__calls-path"
                  data-call-path
                  d="M4 12 H196"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="sd-vis__calls-metric sd-vis__calls-metric--handled">
              <span className="sd-vis__calls-icon sd-vis__calls-icon--handled" aria-hidden="true">
                <PhoneCall size={22} strokeWidth={2} />
              </span>
              <span className="sd-vis__calls-label">Handled</span>
              <span className="sd-vis__calls-num" data-handled>0</span>
            </div>
          </div>
        </VisWrap>
      );

    case 'social-media-marketing':
      return (
        <VisWrap className="sd-vis--feed" data-vis="feed">
          <div className="sd-vis__phone-dock">
            <div className="sd-vis__phone" data-phone>
              <div className="sd-vis__phone-device">
                <span className="sd-vis__phone-side-btn sd-vis__phone-side-btn--action" aria-hidden="true" />
                <span className="sd-vis__phone-side-btn sd-vis__phone-side-btn--vol-up" aria-hidden="true" />
                <span className="sd-vis__phone-side-btn sd-vis__phone-side-btn--vol-down" aria-hidden="true" />
                <span className="sd-vis__phone-side-btn sd-vis__phone-side-btn--power" aria-hidden="true" />
                <div className="sd-vis__phone-bezel">
                  <div className="sd-vis__phone-display">
                    <div className="sd-vis__phone-top">
                      <div className="sd-vis__phone-notch" aria-hidden="true">
                        <span className="sd-vis__phone-speaker" />
                      </div>
                      <header className="sd-vis__phone-status">
                        <span className="sd-vis__phone-time">9:41</span>
                        <span className="sd-vis__phone-status-icons" aria-hidden="true">
                          <svg viewBox="0 0 18 12" width="17" height="11" aria-hidden="true">
                            <path fill="currentColor" d="M1 9.5h2v2H1zm4-3h2v5H5zm4-2h2v7H9zm4-4h2v11h-2z" />
                          </svg>
                          <svg viewBox="0 0 16 12" width="15" height="11" aria-hidden="true">
                            <path fill="currentColor" d="M8 9.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2Zm-3.2-1.8a4.8 4.8 0 0 1 6.4 0 .7.7 0 1 0 .9-1.1 6.2 6.2 0 0 0-8.2 0 .7.7 0 1 0 .9 1.1Zm-2.2-2.2a8.2 8.2 0 0 1 10.8 0 .7.7 0 1 0 .9-1.1 9.6 9.6 0 0 0-12.6 0 .7.7 0 1 0 .9 1.1Z" />
                          </svg>
                          <svg viewBox="0 0 27 13" width="25" height="12" aria-hidden="true">
                            <rect x="1" y="1" width="21" height="11" rx="3" fill="none" stroke="currentColor" strokeWidth="1.1" />
                            <rect x="23.5" y="4.5" width="2.2" height="4" rx="1" fill="currentColor" opacity="0.45" />
                            <rect x="2.5" y="3" width="15" height="7" rx="1.5" fill="currentColor" />
                          </svg>
                        </span>
                      </header>
                    </div>
                    <div className="sd-vis__phone-screen">
                      <div className="sd-vis__feed-track" data-feed-track>
                        {SOCIAL_FEED_POSTS.map((post, index) => (
                          <article key={`${post.user}-${post.time}`} className="sd-vis__post">
                            <header className="sd-vis__post-head">
                              <img className="sd-vis__post-avatar" src={SOCIAL_AVATAR} alt="Velmont Solutions brand avatar" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                              <span className="sd-vis__post-meta">
                                <span className="sd-vis__post-user">
                                  <strong>{post.user}</strong>
                                  <svg className="sd-vis__post-verified" viewBox="0 0 40 40" aria-hidden="true">
                                    <circle cx="20" cy="20" r="20" fill="#0095F6" />
                                    <path fill="#fff" d="M17.2 29.2 11 23l2.8-2.8 3.4 3.4 8.8-8.8L29 16l-11.8 13.2Z" />
                                  </svg>
                                </span>
                                <span>{post.location}</span>
                              </span>
                              <MoreHorizontal size={20} strokeWidth={1.75} aria-hidden="true" />
                            </header>
                            <div className="sd-vis__post-media">
                              <img
                                src={post.image}
                                alt={post.alt}
                                loading={index < 2 ? 'eager' : 'lazy'}
                                decoding="async"
                              />
                            </div>
                            <div className="sd-vis__post-actions" aria-hidden="true">
                              <span className="sd-vis__post-actions-left">
                                <Heart
                                  size={24}
                                  strokeWidth={1.75}
                                  fill={post.liked ? 'var(--sd-vis-accent, #ed4956)' : 'none'}
                                  color={post.liked ? 'var(--sd-vis-accent, #ed4956)' : 'currentColor'}
                                />
                                <MessageCircle size={24} strokeWidth={1.75} />
                                <Send size={22} strokeWidth={1.75} />
                              </span>
                              <Bookmark size={22} strokeWidth={1.75} />
                            </div>
                            <p className="sd-vis__post-likes">{post.likes} likes</p>
                            <p className="sd-vis__post-caption">
                              <strong>{post.user}</strong> {post.caption}
                            </p>
                            <button type="button" className="sd-vis__post-comments" tabIndex={-1}>
                              View all {post.comments} comments
                            </button>
                            <p className="sd-vis__post-time">{post.time}</p>
                          </article>
                        ))}
                      </div>
                    </div>
                    <div className="sd-vis__phone-home" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </VisWrap>
      );

    case 'sms-email-marketing':
      return (
        <VisWrap className="sd-vis--retention" data-vis="retention">
          <div className="sd-vis__retention-stack">
            <div className="sd-vis__channels">
              <div className="sd-vis__channel">
                <span className="sd-vis__channel-label">
                  <Mail size={16} strokeWidth={2} aria-hidden="true" />
                  Email
                </span>
                <div className="sd-vis__bar"><span data-email-bar /></div>
              </div>
              <div className="sd-vis__channel">
                <span className="sd-vis__channel-label">
                  <MessageSquare size={16} strokeWidth={2} aria-hidden="true" />
                  SMS
                </span>
                <div className="sd-vis__bar"><span data-sms-bar /></div>
              </div>
            </div>
            <div className="sd-vis__pool">
              <span className="sd-vis__metric-label">Marketable guests</span>
              <strong className="sd-vis__metric-value" data-pool>0</strong>
            </div>
          </div>
        </VisWrap>
      );

    case 'graphic-designing':
      return (
        <VisWrap className="sd-vis--layers" data-vis="layers">
          <div className="sd-vis__layers-stage">
            {DESIGN_LAYERS.map(({ label, image, alt }, i) => (
              <div key={label} className="sd-vis__layer" data-layer={i}>
                <div className="sd-vis__layer-media">
                  <img src={image} alt={alt} width={640} height={480} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                </div>
                <p className="sd-vis__layer-label">{label}</p>
              </div>
            ))}
          </div>
        </VisWrap>
      );

    case 'menu-optimization':
      return (
        <VisWrap className="sd-vis--menu" data-vis="menu">
          <div className="sd-vis-card sd-vis__menu-card">
            <header className="sd-vis-card__head sd-vis__menu-head">
              <span className="sd-vis-card__icon sd-vis-card__icon--light" aria-hidden="true">
                <BookOpen size={16} strokeWidth={2} />
              </span>
              <span className="sd-vis-card__title sd-vis__menu-brand">The Copper Room</span>
              <span className="sd-vis-card__tag sd-vis__menu-tag">Dinner menu</span>
            </header>

            <div className="sd-vis__menu-panel">
              <div className="sd-vis__menu-before" data-menu-before>
                <p className="sd-vis__menu-cat">Starters · Mains · Sides</p>
                {[
                  { name: 'Margherita', desc: 'San Marzano, basil, mozzarella', price: '£12' },
                  { name: 'Caesar salad', desc: 'Little gem, anchovy dressing', price: '£9' },
                  { name: 'Daily special', desc: 'Chef\u2019s catch of the day', price: '£18' },
                  { name: 'Ribeye 300g', desc: 'Fries, peppercorn sauce', price: '£28' },
                ].map((item) => (
                  <article key={item.name} className="sd-vis__menu-row" data-menu-item>
                    <div className="sd-vis__menu-row-main">
                      <span className="sd-vis__menu-row-name">{item.name}</span>
                      <span className="sd-vis__menu-row-dots" aria-hidden="true" />
                      <span className="sd-vis__menu-row-price">{item.price}</span>
                    </div>
                    <p className="sd-vis__menu-row-desc">{item.desc}</p>
                  </article>
                ))}
              </div>

              <div className="sd-vis__menu-after" data-menu-after>
                <article className="sd-vis__menu-featured" data-menu-featured>
                  <span className="sd-vis__menu-badge">Guest favourite</span>
                  <h4 className="sd-vis__menu-featured-title">Chef&apos;s table bundle</h4>
                  <p className="sd-vis__menu-featured-desc">Ribeye, roasted sides &amp; house wine</p>
                  <div className="sd-vis__menu-featured-foot">
                    <span className="sd-vis__menu-featured-price">£38</span>
                    <span className="sd-vis__menu-featured-save">Save vs à la carte</span>
                  </div>
                </article>
                <article className="sd-vis__menu-row sd-vis__menu-row--addon" data-menu-addon>
                  <div className="sd-vis__menu-row-main">
                    <span className="sd-vis__menu-row-name">Add dessert</span>
                    <span className="sd-vis__menu-row-dots" aria-hidden="true" />
                    <span className="sd-vis__menu-row-price">+£6</span>
                  </div>
                  <p className="sd-vis__menu-row-desc">Sticky toffee or seasonal sorbet</p>
                </article>
              </div>
            </div>

            <footer className="sd-vis-card__foot sd-vis__menu-foot">
              <span className="sd-vis__aov-label">Avg. order value</span>
              <strong className="sd-vis__aov-value" data-aov>£24</strong>
            </footer>
          </div>
        </VisWrap>
      );

    case 'third-party-platforms':
      return (
        <VisWrap className="sd-vis--platforms" data-vis="platforms">
          <div className="sd-vis__platform-list">
            {[
              { name: 'Deliveroo', icon: ShoppingBag },
              { name: 'Uber Eats', icon: Truck },
              { name: 'Just Eat', icon: ShoppingBag },
            ].map(({ name, icon: Icon }) => (
              <div key={name} className="sd-vis__platform" data-platform>
                <span className="sd-vis__platform-name">
                  <span className="sd-vis__platform-icon" aria-hidden="true">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  {name}
                </span>
                <span className="sd-vis__platform-status" data-status>
                  <AlertCircle size={14} strokeWidth={2.5} className="sd-vis__status-warn" aria-hidden="true" />
                  <CheckCircle2 size={14} strokeWidth={2.5} className="sd-vis__status-ok" aria-hidden="true" />
                  <span data-status-text>Out of sync</span>
                </span>
              </div>
            ))}
          </div>
        </VisWrap>
      );

    case 'customer-database-growth':
      return (
        <VisWrap className="sd-vis--database" data-vis="database">
          <div className="sd-vis__db-stage">
            <div className="sd-vis__db-ring-wrap">
              <svg className="sd-vis__db-ring" viewBox="0 0 120 120" aria-hidden="true">
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="8" />
                <circle
                  className="sd-vis__db-progress"
                  data-db-ring
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="var(--sd-vis-accent, var(--blue-500))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray="327"
                  strokeDashoffset="327"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="sd-vis__db-center">
                <span className="sd-vis__db-center-icon" aria-hidden="true">
                  <Users size={28} strokeWidth={1.75} />
                </span>
                <strong className="sd-vis__db-count" data-db-count>0</strong>
              </div>
            </div>
            <span className="sd-vis__db-sublabel">marketable guests</span>
          </div>
        </VisWrap>
      );

    case 'reviews-monitoring':
      return (
        <VisWrap className="sd-vis--reviews" data-vis="reviews">
          <div className="sd-vis__reviews-stack">
            <div className="sd-vis__stars" aria-hidden="true">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="sd-vis__star" data-star={n}>
                  <Star size={28} strokeWidth={2} fill="currentColor" />
                </span>
              ))}
            </div>
            <p className="sd-vis__rating" data-rating>3.8</p>
            <p className="sd-vis__review" data-review>Waiting on replies…</p>
          </div>
        </VisWrap>
      );

    case 'weekly-performance-insights':
      return (
        <VisWrap className="sd-vis--chart" data-vis="chart">
          <div className="sd-vis__chart-stack">
            <div className="sd-vis__chart-bars">
              {[35, 52, 48, 61, 58, 72, 68].map((h, i) => (
                <span key={i} className="sd-vis__chart-bar" data-bar data-h={h} />
              ))}
            </div>
            <ul className="sd-vis__actions" aria-hidden="true">
              {['Fill Tue lunch', 'Pause low ROI ad', 'Reply to 3★ review'].map((action, i) => (
                <li key={action} data-action={i}>{action}</li>
              ))}
            </ul>
            <div className="sd-vis__chart-foot">
              <TrendingUp size={16} strokeWidth={2} aria-hidden="true" />
              <span className="sd-vis__week" data-week>Week 1</span>
            </div>
          </div>
        </VisWrap>
      );

    case 'seo-optimization':
      return (
        <VisWrap className="sd-vis--seo" data-vis="seo">
          <ol className="sd-vis__serp">
            {[
              { pos: 2, name: 'Competitor A' },
              { pos: 4, name: 'Competitor B' },
              { pos: 6, name: 'Competitor C' },
              { pos: 8, name: 'Your restaurant', highlight: true },
            ].map((row) => (
              <li key={row.name} className={row.highlight ? 'is-you' : ''} data-serp-item>
                <span className="sd-vis__serp-pos">{row.pos}</span>
                <Search size={15} strokeWidth={2} aria-hidden="true" className="sd-vis__serp-search" />
                <span>{row.name}</span>
              </li>
            ))}
          </ol>
        </VisWrap>
      );

    default:
      return null;
  }
}
