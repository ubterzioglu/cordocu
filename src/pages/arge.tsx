import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/links?section=arge',
    permanent: false,
  },
})

export default function ArgePage() {
  return null
}
