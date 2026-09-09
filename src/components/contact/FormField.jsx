import { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';

export function FormField({
  label,
  optional = false,
  type = 'text',
  as = 'input',
  value,
  onChange,
  onBlur,
  error,
  valid,
  autoComplete,
  inputMode,
  rows = 5,
  id,
  required = false,
}) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const errorId = `${fieldId}-error`;
  const Tag = as;

  return (
    <div
      className={[
        'ctc-input',
        error ? 'is-error' : '',
        valid ? 'is-valid' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <label className="ctc-input__label" htmlFor={fieldId}>
        {label}
        {optional ? (
          <span className="ctc-input__optional">Optional</span>
        ) : required ? (
          <span className="ctc-input__required" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      <div className="ctc-input__wrap">
        <Tag
          id={fieldId}
          className="ctc-input__control"
          type={as === 'input' ? type : undefined}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          autoComplete={autoComplete}
          inputMode={inputMode}
          rows={as === 'textarea' ? rows : undefined}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? errorId : undefined}
          required={required && as === 'input' ? true : undefined}
        />
        <AnimatePresence>
          {valid && (
            <motion.span
              className="ctc-input__status ctc-input__status--ok"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              aria-hidden="true"
            >
              <Check size={14} strokeWidth={2.5} />
            </motion.span>
          )}
          {error && (
            <motion.span
              className="ctc-input__status ctc-input__status--err"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              aria-hidden="true"
            >
              <AlertCircle size={14} strokeWidth={2.5} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            id={errorId}
            className="ctc-input__error"
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
