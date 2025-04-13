import { FunctionComponent } from 'react'

export type TestimonialsCardProps = {
  profileImg: string
  testimonial: string
  name: string
  work: string
}

export const TestimonialsCard: FunctionComponent<TestimonialsCardProps> = ({
  profileImg,
  testimonial,
  name,
  work,
}) => {
  return (
    <div className="p-6 lg:p-8 lg:px-10 rounded-3xl border border-primary-soft gap-4 bg-white h-full">
      <div className="h-full flex flex-col justify-between flex-1 gap-4">
        <div className="text-md lg:text-lg text-test line-clamp-2">{testimonial}</div>
        <div className="flex gap-4">
          <img
            src={profileImg}
            alt={name}
            width={50}
            height={50}
            className="rounded-md max-w-20 w-full"
          />
          <div className="flex-1 flex justify-center flex-col">
            <p className="text-md font-bold">{name}</p>
            <p className="text-sm">{work}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
