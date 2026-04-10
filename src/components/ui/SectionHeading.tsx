interface SectionHeadingProps {
  id?: string
  title: string
  description?: string
}

export default function SectionHeading({
  id,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="space-y-3">
      <p className="docs-kicker">
        Section
      </p>
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-gray-900">
        {title}
      </h2>
      {description && (
        <p className="max-w-3xl text-sm leading-6 text-gray-500">
          {description}
        </p>
      )}
    </div>
  )
}
