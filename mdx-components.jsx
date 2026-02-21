import Image from 'next/image'

export function useMDXComponents(components) {
  return {
    ...components,
    Image: (props) => (
      <Image sizes="(min-width: 1024px) 784px, 100vw" {...props} />
    ),
  }
}
