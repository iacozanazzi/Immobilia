/** Processo in passi, su una linea che si illumina scorrendo (solo CSS). */
export function ProcessSteps({ steps }: { steps: Array<{ title: string; text: string; time: string }> }) {
  return (
    <ol className="relative grid gap-12 md:grid-cols-5 md:gap-8">
      <span aria-hidden className="absolute left-[5px] top-0 h-full w-px bg-peltro-300/20 md:left-0 md:top-[5px] md:h-px md:w-full" />
      <span
        aria-hidden
        className="process-line absolute left-[5px] top-0 h-full w-px origin-top bg-luce md:left-0 md:top-[5px] md:h-px md:w-full md:origin-left"
      />
      {steps.map((step, i) => (
        <li key={step.title} className="relative pl-10 md:pl-0 md:pt-12">
          <span aria-hidden className="absolute left-0 top-1 size-[11px] border border-peltro-300/60 bg-notte-900 md:top-0" />
          <p className="type-num font-serif text-sm italic text-peltro-400">0{i + 1}</p>
          <h3 className="type-h3 mt-2 text-[1.4rem]!">{step.title}</h3>
          <p className="mt-3 text-peltro-300">{step.text}</p>
          <p className="type-eyebrow mt-4 text-peltro-400">{step.time}</p>
        </li>
      ))}
    </ol>
  )
}
