import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

export function FloatingField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  valid,
  autoComplete,
  inputMode,
  as = 'input',
  rows = 4,
  ...props
}) {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const filled = String(value ?? '').length > 0;
  const Tag = as;

  return (
    <div
      className={[
        'ctc-field',
        filled ? 'is-filled' : '',
        focused ? 'is-focused' : '',
        error ? 'is-error' : '',
        valid ? 'is-valid' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Tag
        id={id}
        className="ctc-field__input"
        type={as === 'input' ? type : undefined}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete={autoComplete}
        inputMode={inputMode}
        rows={as === 'textarea' ? rows : undefined}
        placeholder=" "
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
      <label className="ctc-field__label" htmlFor={id}>
        {label}
      </label>
      <AnimatePresence>
        {valid && (
          <motion.span
            className="ctc-field__status ctc-field__status--ok"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            aria-hidden="true"
          >
            <Check size={14} strokeWidth={2.5} />
          </motion.span>
        )}
        {error && (
          <motion.span
            className="ctc-field__status ctc-field__status--err"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            aria-hidden="true"
          >
            <AlertCircle size={14} strokeWidth={2.5} />
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && (
          <motion.p
            className="ctc-field__error"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
