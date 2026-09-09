import { aboutProblem } from '../../../data/about';
import { ProblemSection } from '../ProblemSection';

export function AboutProblem() {
  return (
    <ProblemSection
      id="problem"
      eyebrow={aboutProblem.eyebrow}
      title={aboutProblem.title}
      titleEm={aboutProblem.titleEm}
      lead={aboutProblem.lead}
      counter={aboutProblem.counter}
      pains={aboutProblem.pains}
    />
  );
}
