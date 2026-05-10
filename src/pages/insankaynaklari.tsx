import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/links?section=insankaynaklari',
    permanent: false,
  },
})

export default function InsanKaynaklariPage() {
  return null
}
