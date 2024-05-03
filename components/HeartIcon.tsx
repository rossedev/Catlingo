import Image from 'next/image'

export type THeartIconProps = {
  src?: string
  description?: string
  width?: number
  height?: number
  className?: string
}

export const HeartIcon = ({
  src,
  description,
  width,
  height,
  className,
}: THeartIconProps) => {
  return (
    <Image
      src={src || '/heart.svg'}
      alt={description || 'Hearts'}
      width={width || 22}
      height={height || 22}
      className={`${className} mr-2`}
    />
  )
}
