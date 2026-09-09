import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { contactForm, topicOptions } from '../../../data/contact';
import { FormField } from '../../contact/FormField';
import { SuccessState } from '../../contact/SuccessState';
import { PillButton } from '../../ui/PillButton';
import { SectionLabel } from '../../ui/SectionLabel';
import { fadeUp, fadeUpSm, staggerVisible, viewOnce } from '../../../lib/aboutMotion';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(form, touched = {}) {
  const errors = {};
  if (touched.name !== false && !form.name.trim()) errors.name = 'Please enter your name';
  if (touched.email !== false) {
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address';
  }
  if (touched.topic !== false && !form.topic) errors.topic = 'Select a topic so we route your message';
  if (touched.message !== false && !form.message.trim()) {
    errors.message = 'A brief message helps us prepare a useful reply';
  }
  return errors;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
  });

  const set = (key) => (event) => {
    const value = event.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => {
      const next = { ...prev, [key]: undefined };
      if (key === 'email' && value && !EMAIL_RE.test(value)) {
        next.email = 'Enter a valid email address';
      }
      return next;
    });
  };

  const blur = (key) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors((prev) => ({
      ...prev,
      ...validateForm(form, { ...touched, [key]: true }),
    }));
  };

  const submit = (event) => {
    event.preventDefault();
    const allTouched = { name: true, email: true, topic: true, message: true };
    setTouched(allTouched);
    const nextErrors = validateForm(form, allTouched);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setSent(true);
  };

  const reset = useCallback(() => {
    setSent(false);
    setErrors({});
    setTouched({});
    setForm({ name: '', company: '', email: '', phone: '', topic: '', message: '' });
  }, []);

  const emailValid = form.email.length > 0 && EMAIL_RE.test(form.email);

  return (
    <section className="ctc-form-section" id="form">
      <motion.div
        className="ctc-form-section__intro"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.div className="ctc-form-section__intro-copy" variants={fadeUp} custom={0}>
          <SectionLabel>{contactForm.eyebrow}</SectionLabel>
          <h2 className="serif-display ctc-form-section__title">
            {contactForm.title} <em>{contactForm.titleEm}</em>
          </h2>
          <p className="ctc-form-section__subtitle">{contactForm.subtitle}</p>
        </motion.div>

        <motion.ul
          className="ctc-form-section__trust"
          variants={staggerVisible(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewOnce}
        >
          {contactForm.trust.map(({ value, label }, index) => (
            <motion.li key={label} variants={fadeUpSm} custom={index}>
              <strong className="serif-display">{value}</strong>
              <span>{label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="ctc-form-section__card"
        initial="hidden"
        whileInView="visible"
        viewport={viewOnce}
        variants={fadeUp}
        custom={0}
      >
        <div className="ctc-form-section__card-glow" aria-hidden="true" />

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            >
              <SuccessState name={form.name.split(' ')[0]} onReset={reset} dark />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            >
            <header className="ctc-form-section__card-head">
              <h3>{contactForm.cardTitle}</h3>
              <p>{contactForm.cardLead}</p>
            </header>

            <form className="ctc-form ctc-form--horizontal" onSubmit={submit} noValidate>
              <div className="ctc-form__primary">
                <div className="ctc-form__grid">
                  <FormField
                    label="Full name"
                    value={form.name}
                    onChange={set('name')}
                    onBlur={blur('name')}
                    error={touched.name ? errors.name : undefined}
                    valid={form.name.trim().length > 1 && !errors.name}
                    autoComplete="name"
                    required
                  />
                  <FormField
                    label="Work email"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    onBlur={blur('email')}
                    error={touched.email ? errors.email : undefined}
                    valid={emailValid && !errors.email}
                    autoComplete="email"
                    inputMode="email"
                    required
                  />
                  <FormField
                    label="Company"
                    optional
                    value={form.company}
                    onChange={set('company')}
                    autoComplete="organization"
                  />
                  <FormField
                    label="Phone"
                    optional
                    type="tel"
                    value={form.phone}
                    onChange={set('phone')}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </div>

                <div className={`ctc-topics${errors.topic && touched.topic ? ' is-error' : ''}`}>
                  <p className="ctc-topics__label" id="topic-label">
                    How can we help?
                    <span className="ctc-input__required" aria-hidden="true">
                      *
                    </span>
                  </p>
                  <div className="ctc-topics__grid" role="group" aria-labelledby="topic-label">
                    {topicOptions.map((topic) => {
                      const selected = form.topic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          className={`ctc-topics__chip${selected ? ' is-selected' : ''}`}
                          onClick={() => {
                            setForm((prev) => ({ ...prev, topic }));
                            setTouched((prev) => ({ ...prev, topic: true }));
                            setErrors((prev) => ({ ...prev, topic: undefined }));
                          }}
                          aria-pressed={selected}
                        >
                          {selected && (
                            <Check size={14} strokeWidth={2.5} aria-hidden="true" />
                          )}
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                  {errors.topic && touched.topic && (
                    <motion.p
                      className="ctc-topics__error"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                    >
                      {errors.topic}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="ctc-form__secondary">
                <FormField
                  as="textarea"
                  label="Message"
                  value={form.message}
                  onChange={set('message')}
                  onBlur={blur('message')}
                  error={touched.message ? errors.message : undefined}
                  valid={form.message.trim().length > 8 && !errors.message}
                  rows={4}
                  required
                />

                <div className="ctc-form__footer">
                  <div className="ctc-form__send-wrap">
                    <PillButton variant="light" type="submit" icon={ArrowUpRight}>
                      {contactForm.cta}
                    </PillButton>
                  </div>
                  <p className="ctc-form-section__privacy">
                    Your details are only used to respond to this inquiry. See our{' '}
                    <Link to="/privacy">privacy policy</Link> for how we handle personal data.
                  </p>
                </div>
              </div>
            </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
