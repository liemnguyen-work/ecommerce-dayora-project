import { motion, useReducedMotion } from 'motion/react';

type StaggeredTextProps = { text: string; offset?: number; step?: number };

export default function StaggeredText({ text, offset = 0, step = 0.1 }: StaggeredTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  return (
    <span aria-hidden="true">
      {words.map((word, index) => (
        <span key={`${index}-${word}`}>
          <motion.span
            className="hero-word"
            initial={reduced ? false : { opacity: 0, x: -18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: reduced ? 0 : 1, delay: reduced ? 0 : offset + index * step }}
          >{word}</motion.span>{index < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}
