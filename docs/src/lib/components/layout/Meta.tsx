import { Helmet } from 'react-helmet'

const Meta = () => {
  return (
    <Helmet>
      <title>Documentation - substats</title>
      <link rel="icon" type="image/ico" href="/assets/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Helmet>
  )
}

export default Meta
