import styled from 'styled-components'
import { H2 } from '../Typography'
import Image from 'next/image'
import { useModal } from '@/components/hooks/useModal'
import { ImageBrowserModal } from './ImageBrowserModal'
import { TempImage, resolveImageUrl } from '@/lib/image'
import { forwardRef } from 'react'

interface ImageGalleryProps {
  id?: string
  title: string
  images: TempImage[]
  className?: string
}

export const ImageGallery = forwardRef<HTMLDivElement, ImageGalleryProps>(
  ({ id, title, images = [], className }: ImageGalleryProps, forwardedRef) => {
    const { showModal } = useModal()
    const filteredImages = images.filter(
      (image) => image.url || image.ipfsHash || image.imageIpfsHash
    )

    const handleImageOnClick = (imageIndex: number) => {
      showModal(() => (
        <ImageBrowserModal images={images} initialImageIndex={imageIndex} />
      ))
    }

    if (filteredImages.length === 0) {
      return null
    }

    return (
      <Container className={className} id={id} ref={forwardedRef}>
        {title && <H2>{title}</H2>}
        <ImageList>
          {filteredImages.slice(0, 4).map((image, index) => {
            const imageUrl = resolveImageUrl(image)
            return imageUrl ? (
              <ImageSizeContainer
                key={image.name || image.ipfsHash || image.imageIpfsHash}
              >
                <StyledImage
                  onClick={() => handleImageOnClick(index)}
                  alt={image.name}
                  src={imageUrl}
                  width={415}
                  height={300}
                />
              </ImageSizeContainer>
            ) : null
          })}
        </ImageList>
      </Container>
    )
  }
)

ImageGallery.displayName = 'ImageGallery'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2.4rem;
  width: 100%;
`

const ImageList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.2rem;
  width: 100%;

  ${({ theme }) => theme.bp.md_max} {
    grid-template-columns: repeat(1, 1fr);
    width: 100%;
    gap: 0.8rem;
  }
`

const ImageSizeContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 36.14% 0;
`

const StyledImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;
  width: 100%;
  height: auto;
`
