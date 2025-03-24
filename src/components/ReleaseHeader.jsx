import { useRef } from 'react'

export default function ReleaseHeader ({ frontmatter }) {
  const release = frontmatter.data

  const img = 'https://i.scdn.co/image/ab67616d0000b273b1dbf375b392d50ed12e5a0b'
  const dateRelease = new Date(release.releaseDate).toLocaleDateString(
    'en-US',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  )
  const imgElement = document.querySelector('img')
  const header = document.getElementById('header')
  

  function getDominantColor (imageObject) {
    const ctx = document.createElement('canvas').getContext('2d')

    //draw the image to one pixel and let the browser find the dominant color
    ctx.drawImage(imageObject, 0, 0, 1, 1)

    //get pixel color
    const i = ctx.getImageData(0, 0, 1, 1).data

    console.log(`rgba(${i[0]},${i[1]},${i[2]},${i[3]})`)

    return (
      '#' +
      ((1 << 24) + (i[0] << 16) + (i[1] << 8) + i[2]).toString(16).slice(1)
    )
  }
  console.log(header)
  let colorDominant = getDominantColor(imgElement);
  header.style.background = colorDominant;

  return (
    <header id='header'
      className='flex flex-col items-start justify-end w-full relative'
      ref={header}
    >
      <h1></h1>
      <div className='z-1 px-16 md:pt-24 flex flex-col md:flex-row justify-end items-center md:items-star'>
        <img
          id='img'
          className='w-96 order-2 md:order-1 transition transform'
          src={img}
          draggable='false'
          transition:name={`image-${frontmatter.id}`}
        />
        <div className='flex flex-col md:pl-8 py-8 pt-24 order-1 md:order-2 w-full'>
          <h1
            transition:name={`title-${frontmatter.id}`}
            className='font-bold text-6xl text-wrap md:text-7xl pb-4 break-words break-all md:break-normal'
          >
            {release.title}
          </h1>
          <h3
            transition:name={`artists-${frontmatter.id}`}
            className='text-2xl md:text-4xl text-wrap font-thin break-words break-all md:break-normal'
          >
            {release.artists.join(', ')}
          </h3>

          <div
            transition:name={`releaseType-${frontmatter.id}`}
            className='flex flex-row gap-4 py-4'
          >
            <h4 className='text-2xl capitalize'>{release.type}</h4>
            <span>·</span>
            <h4
              transition:name={`dateRelease-${frontmatter.id}`}
              className='text-2xl'
            >
              {dateRelease}
            </h4>
          </div>
          <h4 className='text-3xl'>{release.rate}⭐</h4>
        </div>
      </div>
    </header>
  )
}
