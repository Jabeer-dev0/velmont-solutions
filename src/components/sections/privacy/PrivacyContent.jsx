import { motion } from 'framer-motion';
import { privacySections } from '../../../data/privacy';
import { site } from '../../../data/site';
import { fadeUp, fadeUpSm, staggerVisible, viewOnce } from '../../../lib/aboutMotion';

function PrivacyBlock({ section }) {
  return (
    <article className="leg-block" id={section.id}>
      <span className="leg-block__num">{section.num}</span>
      <div className="leg-block__body">
        <h2 className="leg-block__title">{section.title}</h2>
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
        ))}
        {section.bullets && (
          <ul className="leg-block__list">
            {section.bullets.map((item) => (
              <li key={item.slice(0, 48)}>{item}</li>
            ))}
          </ul>
        )}
        {section.table && (
          <div className="leg-block__table-wrap">
            <table className="leg-block__table">
              <caption className="sr-only">{section.title}: purposes and lawful bases</caption>
              <thead>
                <tr>
                  <th scope="col">Purpose</th>
                  <th scope="col">Lawful basis</th>
                </tr>
              </thead>
              <tbody>
                {section.table.map((row) => (
                  <tr key={row.purpose}>
                    <th scope="row">{row.purpose}</th>
                    <td>{row.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {section.footnote && <p className="leg-block__note">{section.footnote}</p>}
      </div>
    </article>
  );
}

export function PrivacyContent() {
  return (
    <section className="leg-content" id="details">
      <motion.div
        className="leg-content__layout"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={staggerVisible(0.06)}
      >
        <motion.aside className="leg-content__nav" variants={fadeUpSm} custom={0}>
          <p className="leg-content__nav-label">On this page</p>
          <nav aria-label="Privacy policy sections">
            <ol className="leg-content__toc">
              {privacySections.map(({ id, num, title }) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>{num}</span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </motion.aside>

        <motion.div
          className="leg-content__sections"
          variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } } }}
        >
          {privacySections.map((section, index) => (
            <motion.div key={section.id} variants={fadeUp} custom={index}>
              <PrivacyBlock section={section} />
            </motion.div>
          ))}
          <motion.p className="leg-content__contact" variants={fadeUpSm}>
            Questions about this policy? Email{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
